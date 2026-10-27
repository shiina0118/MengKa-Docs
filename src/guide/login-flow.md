# Bot 登录流程

登录 API 只能操作插件绑定节点下的账号。带 `self_id` 的接口必须同时传入 `protocol_id`。

本页只列出各步骤请求的 `action` 和 `params`，请求帧的完整格式见 [WebSocket API 格式](/guide/protocol)。示例中的 `self_id` 是要登录的 Bot QQ 号，`protocol_id` 是该账号的协议 ID，可取自 [`get_protocol_list`](/api/get_protocol_list) 返回的 `id`，也可取自 [`get_bot_list`](/api/get_bot_list) 返回项的 `protocol.id`。

同一 QQ 可同时存在手机、平板等不同协议账号，查找时要用 `self_id` + `protocol_id`。

## 登录结果的 next 字段 {#next}

发起登录、提交验证、查询验证方式和查询登录二维码的结果在 `ok: true` 时带有 `next`，表示接下来该做什么。NT 登录使用 `ntlogin_*`，WT 登录使用 `wtlogin_*`；Linux 扫码登录使用独立的 `get_login_qr` / `query_login_qr`。三步身份验证由两种模式共用，不带模式前缀，见[身份验证](#插件通道身份验证)。

`check_cache` 只查询本地缓存，没有 `next`。它与 `cache_login` 都由 NT、WT 账号共用。

插件按 `next` 分支即可，不需要记忆 `code` 对照表：

| `next` | 含义 | 后续操作 |
| --- | --- | --- |
| `done` | 已登录成功 | 开始使用该 Bot |
| `slider` | 需要滑块验证 | 见[滑块验证](#滑块验证) |
| `security` | NT 需要安全验证；WT 等待短信验证码 | 分别使用当前模式的验证接口，见[安全验证](#安全验证) |
| `identity` | 需要身份验证，或身份验证尚未完成 | 见[插件通道身份验证](#插件通道身份验证) |
| `qr` | 扫码登录进行中 | 继续轮询 `query_login_qr`，二维码失效时再次调用 `get_login_qr` |
| `failed` | 本次登录已结束且未成功 | 根据 `message` 处理后重新登录 |

注意区分两层结果：外层 `ok: false` 表示请求本身无效（参数错误、账号状态不对等）；`ok: true` 只表示请求被处理，登录是否成功要看 `next`。

账号上线时还会推送 [`bot_online`](/events/bot_online) 事件，无论通过哪种方式登录。

## 登录前检查

调用 [`get_bot_list`](/api/get_bot_list)，找到 `self_id` 与 `protocol.id` 都匹配的账号。如果它的 `status` 不为 `0`，先调用 [`offline_account`](/api/offline_account)：

```json
{ "self_id": 123456789, "protocol_id": 0 }
```

## 添加账号

所有账号都先用 [`add_account`](/api/add_account) 添加。Android 账号必须提供密码；PC（Linux）账号可以提供密码，也可以省略密码改用扫码登录：

```json
{ "self_id": 123456789, "protocol_id": 0, "password": "YOUR_ACCOUNT_PASSWORD", "device_profile_id": 1, "nt": 1 }
```

## 发起登录

先选择登录方式：

| 登录方式 | 发起接口 | 适用范围 |
| --- | --- | --- |
| NT 密码登录 | [`ntlogin_login_account`](/api/ntlogin_login_account) | `nt: 1`、已设置密码的 Android 或 Linux 账号 |
| WT 密码登录 | [`wtlogin_login_account`](/api/wtlogin_login_account) | `nt: 0`、已设置密码的 Android 账号 |
| 扫码登录 | [`get_login_qr`](/api/get_login_qr) | Linux 账号，与是否保存密码无关，见[扫码登录](#扫码登录) |

密码登录接口不会自动返回登录二维码。添加账号时省略 `nt` 默认使用 NT（`1`），更新时省略则保留原模式。密码登录的后续验证接口如下：

| 动作 | NT（`nt: 1`） | WT（`nt: 0`） |
| --- | --- | --- |
| 发起登录 | [`ntlogin_login_account`](/api/ntlogin_login_account) | [`wtlogin_login_account`](/api/wtlogin_login_account) |
| 提交滑块 | [`ntlogin_submit_slider`](/api/ntlogin_submit_slider) | [`wtlogin_submit_slider`](/api/wtlogin_submit_slider) |
| 下发短信 | [`ntlogin_get_sms`](/api/ntlogin_get_sms) | [`wtlogin_get_sms`](/api/wtlogin_get_sms) |
| 提交短信 | [`ntlogin_check_sms`](/api/ntlogin_check_sms) | [`wtlogin_check_sms`](/api/wtlogin_check_sms) |
| 查询验证提示 | [`ntlogin_get_security_verify_methods`](/api/ntlogin_get_security_verify_methods) | [`wtlogin_get_security_verify_methods`](/api/wtlogin_get_security_verify_methods) |

账号模式与登录接口前缀不匹配时返回 `ok: false` 和错误提示，不会开始或继续登录。缓存与身份验证三步使用共用接口，按原账号模式处理。

WT 密码登录目前支持 Android：`next: "slider"` 时提交滑块，`next: "security"` 时直接下发并提交短信验证码，`next: "identity"` 时走[身份验证流程](#插件通道身份验证)。WT 短信接口只需账号标识和验证码，无需 `verify_type` 或 `sign`。`wtlogin_get_sms` 成功下发后仍为 `next: "security"`，账号尚未上线。

两种模式的响应字段分别见 [NT 登录结果](/api/ntlogin_login_account#login-result)和 [WT 登录结果](/api/wtlogin_login_account#wtlogin-result)。`login_method`、`wtlogin_code` 和 WT 短信提示字段属于 WT 响应。NT 的验证方式通过 `ntlogin_get_security_verify_methods` 查询；WT 的短信提示通过 `wtlogin_get_security_verify_methods` 查询。

以下密码登录、滑块和短信示例以 NT 为例。调用 `ntlogin_login_account`，传入：

```json
{ "self_id": 123456789, "protocol_id": 0 }
```

结果 `data` 的基础结构：

```json
{ "code": 0, "message": "登录成功", "next": "done" }
```

NT 密码登录的常见状态：

| `code` | `next` | 含义 | 后续操作 |
| --- | --- | --- | --- |
| `0` | `done` | 登录成功 | 开始使用该 Bot |
| `140022008` | `slider` | 需要滑块验证 | 展示 `slider_url`，完成后调用 `ntlogin_submit_slider` |
| `140022007` | `identity` | 需要身份验证 | 用插件通道的身份验证动作完成，见下方[插件通道身份验证](#插件通道身份验证) |
| `140022010` | `security` | 需要安全验证 | 查询<a class="security-method-link" href="../api/ntlogin_get_security_verify_methods">安全验证方式</a>，按可用方式继续 |
| `140022013` | `failed` | 账号或密码错误 | 检查账号配置 |

`security_url` 仅在响应实际包含地址时出现，不应假定该字段始终存在。

## 滑块验证

`slider_url` 是原始验证地址。若使用萌卡提供的验证页面：

1. 调用 [`register_captcha`](/api/register_captcha)，传入 `self_id`、`protocol_id` 和 `slider_url`。
2. 展示返回的 `captcha_url`，让用户完成验证。
3. 每隔 1～2 秒调用 [`captcha_heartbeat`](/api/captcha_heartbeat)，传入返回的 `uuid`。
4. 状态为 `ready` 时，用返回的 `ticket`、`randstr` 提交；状态为 `expired` 时停止查询，重新获取验证页面。

调用 [`ntlogin_submit_slider`](/api/ntlogin_submit_slider)：

```json
{ "self_id": 123456789, "protocol_id": 0, "ticket": "TICKET", "randstr": "RANDSTR" }
```

| 参数 | 说明 |
| --- | --- |
| `self_id` | QQ 号 |
| `protocol_id` | 当前账号的协议 ID |
| `ticket` | 滑块完成后返回的 ticket |
| `randstr` | 滑块完成后返回的 randstr |

返回结构与对应模式的登录接口一致。如果返回另一种验证状态，继续按新的 `next` 处理。WT 账号在本步骤调用 `wtlogin_submit_slider`，参数相同。

## 安全验证

NT 登录结果为 `next: "security"` 时，调用 [`ntlogin_get_security_verify_methods`](/api/ntlogin_get_security_verify_methods#security-verify) 查询当前可用方式，根据返回的 `methods` 选择扫码、短信或其他验证方式。以下扫码和两种短信方式适用于 NT。

WT 的 `security` 分支使用 [`wtlogin_get_sms`](/api/wtlogin_get_sms) 下发、[`wtlogin_check_sms`](/api/wtlogin_check_sms) 提交验证码；如需查询当前验证提示，调用 [`wtlogin_get_security_verify_methods`](/api/wtlogin_get_security_verify_methods)。

WT 短信验证码输错后，若响应仍为 `next: "security"`，展示错误提示并保留输入界面，允许用户更正后再次提交。不要仅因 `code` 非零就取消登录或重新下发短信；返回 `next: "failed"` 才表示本次登录已结束。

这是密码登录过程中的安全验证，不是[扫码登录](#扫码登录)。PC（Linux）账号也走同一组接口，差异由服务端处理；其中 PC 账号始终可以扫码验证，`verify_list` 总会包含 `10`，二维码可能被用户取消（`status` 为 `canceled`）。

### 扫码安全验证

当登录结果为 `next: "security"` 时，先调用 [`ntlogin_get_security_verify_methods`](/api/ntlogin_get_security_verify_methods) 查询当前验证原因和可用方式。

当 `methods` 包含扫码方式时，调用 [`ntlogin_get_security_verify_qr`](/api/ntlogin_get_security_verify_qr)（参数为 `self_id`、`protocol_id`），把返回的 `qr_url` 渲染为二维码。

随后使用返回的 `guarantee_token` 每秒调用一次 [`ntlogin_query_security_verify_qr`](/api/ntlogin_query_security_verify_qr)：

```json
{ "self_id": 123456789, "protocol_id": 0, "guarantee_token": "GUARANTEE_TOKEN" }
```

`status` 依次可能为 `waiting`、`scanned`、`confirmed` 或 `expired`。当状态为 `confirmed` 时会自动继续登录，应停止轮询，再按当前响应的 `code` 与 `message` 处理登录结果。

### 短信安全验证

当 [`ntlogin_get_security_verify_methods`](/api/ntlogin_get_security_verify_methods) 返回的 `methods.verify_list` 包含短信方式时，用 `methods.sms_phone.sign` 请求短信验证。短信验证有两种类型，由 `verify_type` 指定，必填：

| `verify_type` | 名称 | 说明 |
| --- | --- | --- |
| `4` | 接收短信 | 服务端向密保手机下发验证码 |
| `3` | 发送短信 | 用户用密保手机把指定内容发送到指定号码 |

#### 接收短信（verify_type 4）

调用 [`ntlogin_get_sms`](/api/ntlogin_get_sms)：

```json
{ "self_id": 123456789, "protocol_id": 0, "verify_type": 4, "sign": "SMS_SIGN" }
```

返回短信验证信息：

```json
{ "result": { "state": 1, "code": 1 }, "sign": "NEW_SMS_SIGN", "masked_phone": "166******00", "country_code": "86" }
```

调用 [`ntlogin_check_sms`](/api/ntlogin_check_sms) 提交验证码，必须使用这里**新返回**的 `sign`：

```json
{ "self_id": 123456789, "protocol_id": 0, "verify_type": 4, "sign": "NEW_SMS_SIGN", "code": "123456" }
```

#### 发送短信（verify_type 3）

调用 [`ntlogin_get_sms`](/api/ntlogin_get_sms)：

```json
{ "self_id": 123456789, "protocol_id": 0, "verify_type": 3, "sign": "SMS_SIGN" }
```

返回里多出 `sms`（短信内容）和 `send_to`（接收号码）：

```json
{ "result": { "state": 1, "code": 1 }, "sign": "NEW_SMS_SIGN", "sms": "验证QQ",
  "send_to": "10690700511", "masked_phone": "166******00", "country_code": "86" }
```

引导用户用密保手机把 `sms` 的内容原样发送到 `send_to`，发送后调用 [`ntlogin_check_sms`](/api/ntlogin_check_sms) 回查，不需要传 `code`：

```json
{ "self_id": 123456789, "protocol_id": 0, "verify_type": 3, "sign": "NEW_SMS_SIGN" }
```

#### 结果处理

两种类型一致：校验通过后自动继续登录，返回结构与 `ntlogin_login_account` 一致；校验未通过时，`result.prompt` 是原因，登录会话保留，可以用同一个 `sign` 重试。

## 扫码登录

PC（Linux）账号调用 [`get_login_qr`](/api/get_login_qr) 获取登录二维码（`next` 为 `qr`），把返回的 `url` 渲染为二维码，用手机 QQ 或已登录的 Android Bot（[`scan_qr`](/api/scan_qr) + [`auth_qr`](/api/auth_qr)）扫描。无论是否保存密码，都显式调用取码接口。

之后以 `self_id`、`protocol_id` 轮询 [`query_login_qr`](/api/query_login_qr)。二维码失效时再次调用 `get_login_qr`，会在当前扫码登录会话内换一张新二维码。

`state` 可能为 `waiting_for_scan`、`waiting_for_confirm`、`confirmed`、`code_expired`、`canceled` 或 `invalid`。当 `login_complete` 为 `true` 或 `state` 为终态时停止轮询。

## 应用登录二维码

已登录的 Android Bot 可以扫描应用登录二维码（链接中的 `k=`），先调用 [`scan_qr`](/api/scan_qr)：

```json
{ "self_id": 123456789, "protocol_id": 0, "k": "QR_K" }
```

扫码 `code=0` 后展示安全提示，根据 `auto_login` 展示自动登录选项。用户确认后，调用 [`auth_qr`](/api/auth_qr)，将本次扫码返回的 `need_a1` 原样传入。例如扫码返回 `need_a1=false` 时：

```json
{ "self_id": 123456789, "protocol_id": 0, "k": "QR_K", "need_a1": false }
```

`skip_phone_confirm` 不传表示使用默认自动登录设置，传 `true` 开启、传 `false` 关闭。调用方需保存本次扫码结果，确认时传入同一 `k` 和返回的 `need_a1`。

[`scan_qr`](/api/scan_qr) 只完成扫码，[`auth_qr`](/api/auth_qr) 才确认登录。确认 Linux 码后继续 [`query_login_qr`](/api/query_login_qr)。这两条不能代替 `get_login_qr` 发起扫码登录。

## 插件通道身份验证

`next: "identity"` 时，NT 和 WT 账号共用以下三步：

1. [`submit_identity_captcha`](/api/submit_identity_captcha)：提交验证码结果，获取绑定手机提示。
2. [`submit_identity_phone`](/api/submit_identity_phone)：提交密保手机号，获取短信内容和接收号码。
3. [`confirm_identity_sms`](/api/confirm_identity_sms)：用户用密保手机发送短信后，查询确认结果并继续登录。

前两步失败，以及第三步的短信确认未通过（通常是短信尚未被收到）时，`next` 仍为 `identity`，账号保持等待验证状态，可修正参数后重试。

短信确认通过后会继续对应模式的登录，分别返回 [NT 登录结果](/api/ntlogin_login_account#login-result)或 [WT 登录结果](/api/wtlogin_login_account#wtlogin-result)。若 `next` 为 `failed`，本次登录会话已结束，需要重新调用对应模式的密码登录接口；若仍为验证状态，按新的 `next` 继续处理。

## 缓存登录

NT 和 WT 账号共用缓存接口，参数均为 `self_id`、`protocol_id`：先调用 [`check_cache`](/api/check_cache)，有缓存时调用 [`cache_login`](/api/cache_login)。

检查结果为 `{ "has_cache": true }` 或 `{ "has_cache": false }`，只表示本地是否存有缓存。有缓存时再尝试缓存登录，以登录结果为准。

成功：

```json
{ "code": 0, "message": "登录成功", "next": "done" }
```

失败时可能返回：

```json
{ "code": 1, "message": "...", "cache_invalid": true, "next": "failed" }
```

缓存登录失败或 `has_cache` 为 `false` 时，重新选择上方的登录方式：密码登录按账号模式调用 `ntlogin_login_account` 或 `wtlogin_login_account`，Linux 扫码登录调用 `get_login_qr`。缓存登录的失败结果可能没有 `cache_invalid`，应检查 `code` 和 `message`；仅 `code` 为 `0` 表示成功。
