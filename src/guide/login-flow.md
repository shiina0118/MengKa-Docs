# Bot 登录流程

登录 API 只能操作插件绑定节点下的账号。带 `self_id` 的接口必须同时传入 `protocol_id`。

本页只列出各步骤请求的 `action` 和 `params`，请求帧的完整格式见 [WebSocket API 格式](/guide/protocol)，HTTP 调用见[正向 HTTP](/guide/forward-http)。示例中的 `self_id` 是要登录的 Bot QQ 号，`protocol_id` 是该账号的协议 ID，可取自 [`get_protocol_list`](/api/get_protocol_list) 返回的 `id`，也可取自 [`get_bot_list`](/api/get_bot_list) 返回项的 `protocol.id`。

同一 QQ 可同时存在手机、平板等不同协议账号，查找时要用 `self_id` + `protocol_id`。

## 登录结果的 next 字段 {#next}

以下接口在 `ok: true` 时，结果都带有 `next`，表示接下来该做什么：`login_account`、`cache_login`、`query_login_qr`、`submit_slider`、`get_security_verify_methods`、`get_sms`、`check_sms`、`get_security_verify_qr`、`query_security_verify_qr`、`submit_identity_captcha`、`submit_identity_phone`、`confirm_identity_sms`。`check_cache` 只查询本地缓存，不属于登录步骤，没有 `next`。

插件按 `next` 分支即可，不需要记忆 `code` 对照表：

| `next` | 含义 | 后续操作 |
| --- | --- | --- |
| `done` | 已登录成功 | 开始使用该 Bot |
| `slider` | 需要滑块验证 | 见[滑块验证](#滑块验证) |
| `security` | 需要安全验证，或安全验证尚未完成 | 见[安全验证](#安全验证) |
| `identity` | 需要身份验证，或身份验证尚未完成 | 见[插件通道身份验证](#插件通道身份验证) |
| `qr` | 扫码登录进行中 | 继续轮询 `query_login_qr`，二维码失效时再次调用 `login_account` |
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
{ "self_id": 123456789, "protocol_id": 0, "password": "YOUR_ACCOUNT_PASSWORD", "device_profile_id": 1 }
```

## 发起登录

统一调用 [`login_account`](/api/login_account)。与管理后台一致，有密码的账号走密码登录（Android 和 PC 都支持），无密码的 PC 账号走[扫码登录](#扫码登录)：

```json
{ "self_id": 123456789, "protocol_id": 0 }
```

结果 `data` 的基础结构：

```json
{ "code": 0, "message": "登录成功", "next": "done" }
```

常见状态：

| `code` | `next` | 含义 | 后续操作 |
| --- | --- | --- | --- |
| `0` | `done` | 登录成功 | 开始使用该 Bot |
| `140022008` | `slider` | 需要滑块验证 | 展示 `slider_url`，完成后调用 `submit_slider` |
| `140022007` | `identity` | 需要身份验证 | 用插件通道的身份验证动作完成，见下方[插件通道身份验证](#插件通道身份验证) |
| `140022010` | `security` | 需要安全验证 | 查询<a class="security-method-link" href="../api/get_security_verify_methods">安全验证方式</a>，按可用方式继续 |
| `140022013` | `failed` | 账号或密码错误 | 检查账号配置 |

`security_url` 仅在响应实际包含地址时出现，不应假定该字段始终存在。

## 滑块验证

调用 [`submit_slider`](/api/submit_slider)：

```json
{ "self_id": 123456789, "protocol_id": 0, "ticket": "TICKET", "randstr": "RANDSTR" }
```

| 参数 | 说明 |
| --- | --- |
| `self_id` | QQ 号 |
| `protocol_id` | 当前账号的协议 ID |
| `ticket` | 滑块完成后返回的 ticket |
| `randstr` | 滑块完成后返回的 randstr |

返回结构与 `login_account` 一致。如果返回另一种验证状态，继续按新的 `next` 处理。

## 安全验证

安全验证可通过 `security_verify` 判断当前可用方式，也可以调用 `get_security_verify_methods` 重新查询。根据返回的 `methods` 选择扫码、短信或其他验证方式。

这是密码登录过程中的安全验证，不是[扫码登录](#扫码登录)。PC（Linux）账号也走同一组接口，差异由服务端处理；其中 PC 账号始终可以扫码验证，`verify_list` 总会包含 `10`，二维码可能被用户取消（`status` 为 `canceled`）。

### 扫码安全验证

当结果为 `140022010` 时，可使用响应中的 `security_verify`，也可以调用 [`get_security_verify_methods`](/api/get_security_verify_methods) 重新查询当前验证原因和可用方式。

当 `methods` 包含扫码方式时，调用 [`get_security_verify_qr`](/api/get_security_verify_qr)（参数为 `self_id`、`protocol_id`），把返回的 `qr_url` 渲染为二维码。

随后使用返回的 `guarantee_token` 每秒调用一次 [`query_security_verify_qr`](/api/query_security_verify_qr)：

```json
{ "self_id": 123456789, "protocol_id": 0, "guarantee_token": "GUARANTEE_TOKEN" }
```

`status` 依次可能为 `waiting`、`scanned`、`confirmed` 或 `expired`。当状态为 `confirmed` 时会自动继续登录，应停止轮询，再按当前响应的 `code` 与 `message` 处理登录结果。

### 短信安全验证

当结果为 `140022010` 且 `security_verify.methods.verify_list` 包含短信方式时，用该方式的 `sign` 请求短信验证。短信验证有两种类型，由 `verify_type` 指定，必填：

| `verify_type` | 名称 | 说明 |
| --- | --- | --- |
| `4` | 接收短信 | 服务端向密保手机下发验证码 |
| `3` | 发送短信 | 用户用密保手机把指定内容发送到指定号码 |

#### 接收短信（verify_type 4）

调用 [`get_sms`](/api/get_sms)：

```json
{ "self_id": 123456789, "protocol_id": 0, "verify_type": 4, "sign": "SMS_SIGN" }
```

返回短信验证信息：

```json
{ "result": { "state": 1, "code": 1 }, "sign": "NEW_SMS_SIGN", "masked_phone": "166******00", "country_code": "86" }
```

调用 [`check_sms`](/api/check_sms) 提交验证码，必须使用这里**新返回**的 `sign`：

```json
{ "self_id": 123456789, "protocol_id": 0, "verify_type": 4, "sign": "NEW_SMS_SIGN", "code": "123456" }
```

#### 发送短信（verify_type 3）

调用 [`get_sms`](/api/get_sms)：

```json
{ "self_id": 123456789, "protocol_id": 0, "verify_type": 3, "sign": "SMS_SIGN" }
```

返回里多出 `sms`（短信内容）和 `send_to`（接收号码）：

```json
{ "result": { "state": 1, "code": 1 }, "sign": "NEW_SMS_SIGN", "sms": "验证QQ",
  "send_to": "10690700511", "masked_phone": "166******00", "country_code": "86" }
```

引导用户用密保手机把 `sms` 的内容原样发送到 `send_to`，发送后调用 [`check_sms`](/api/check_sms) 回查，不需要传 `code`：

```json
{ "self_id": 123456789, "protocol_id": 0, "verify_type": 3, "sign": "NEW_SMS_SIGN" }
```

#### 结果处理

两种类型一致：校验通过后自动继续登录，返回结构与 `login_account` 一致；校验未通过时，`result.prompt` 是原因，登录会话保留，可以用同一个 `sign` 重试。

## 扫码登录

未设置密码的 PC（Linux）账号调用 `login_account` 时返回登录二维码（`next` 为 `qr`），把返回的 `url` 渲染为二维码，用手机 QQ 或已登录的 Android Bot（[`scan_qr`](/api/scan_qr) + [`auth_qr`](/api/auth_qr)）扫描。

之后以 `self_id`、`protocol_id` 轮询 [`query_login_qr`](/api/query_login_qr)。二维码失效时再次调用 `login_account`，会在当前登录会话内换一张新二维码。

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

`skip_phone_confirm` 不传表示使用默认自动登录设置，传 `true` 开启、传 `false` 关闭。后端不缓存扫码状态。

[`scan_qr`](/api/scan_qr) 只完成扫码，[`auth_qr`](/api/auth_qr) 才确认登录。确认 Linux 码后继续 [`query_login_qr`](/api/query_login_qr)。这两条不能代替 `login_account` 发起扫码登录。

## 插件通道身份验证

`140022007`（需要身份验证）之后的插件通道身份验证共三步：

1. [`submit_identity_captcha`](/api/submit_identity_captcha)：提交验证码结果（`ticket`、`randstr`），获取绑定手机提示；
2. [`submit_identity_phone`](/api/submit_identity_phone)：填密保手机号，返回需要由该手机**照发的短信内容与目标号码**；
3. [`confirm_identity_sms`](/api/confirm_identity_sms)：用密保手机发送完成后回查，通过后自动继续登录，返回与 `login_account` 相同的结果。

前两步失败，以及第三步的短信确认未通过（通常是短信尚未被收到）时，`next` 仍为 `identity`，账号保持等待验证状态，可修正参数后重试。

短信确认通过后，`confirm_identity_sms` 会接着登录，此时按登录结果的 `next` 处理：如果登录本身失败，`next` 为 `failed`，本次登录会话已结束，不能再重试短信确认，需要重新调用 `login_account`。

## 缓存登录

先以 `self_id`、`protocol_id` 调用 [`check_cache`](/api/check_cache)，返回 `{ "has_cache": true }` 或 `{ "has_cache": false }`，只表示本地是否存有缓存。

缓存能否使用只有服务端知道。`has_cache` 为 `true` 时调用 [`cache_login`](/api/cache_login)，以登录结果为准。

成功：

```json
{ "code": 0, "message": "登录成功", "next": "done" }
```

失败时可能返回：

```json
{ "code": 1, "message": "...", "cache_invalid": true, "next": "failed" }
```

缓存登录失败或 `has_cache` 为 `false` 时，调用 `login_account` 重新登录。缓存登录的失败结果可能没有 `cache_invalid`，应检查 `code` 和 `message`；仅 `code` 为 `0` 表示成功。详细说明见 [`cache_login`](/api/cache_login)。
