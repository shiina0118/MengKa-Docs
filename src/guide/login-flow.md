# Bot 登录流程

登录 API 只能操作插件绑定节点下的账号。带 `self_id` 的接口必须同时传入 `platform`，顺序为 `self_id, platform, …`。

以下示例中的 `self_id` 是要登录的 Bot QQ 号，`platform` 是该账号的端：

```js
const self_id = 123456789
const platform = 'android' // 或 'linux'
```

也可以从 `get_bot_list()` 返回项取得：

```js
const bots = await api.get_bot_list()
const self_id = bots[0].self_id
const platform = bots[0].platform
```

同一 QQ 可同时存在 android 与 linux 账号，查找时要用 `self_id` + `platform`。

## 登录前检查

```js
const bots = await api.get_bot_list()
const bot = bots.find(item => item.self_id === self_id && item.platform === platform)

if (bot && bot.status !== 0) {
  await api.offline_account(self_id, platform)
}
```

## 添加账号

Android 账号用 `add_account`。`add_account` 不支持 `linux`。

```js
await api.add_account(self_id, 'android', password, client_profile_id, device_profile_id)
```

扫码登录账号在首次 [`get_login_qr`](/api/get_login_qr) 时创建，见下方「扫码登录」。

## 密码登录

Android 账号使用密码登录：

```js
const result = await api.login_account(self_id, platform)
```

返回基础结构：

```js
{ code: Number, message: String }
```

常见状态：

| `code` | 含义 | 后续操作 |
| --- | --- | --- |
| `0` | 登录成功 | 开始使用该 Bot |
| `140022008` | 需要滑块验证 | 展示 `slider_url`，完成后调用 `submit_slider` |
| `140022007` | 需要身份验证 | 用插件通道的身份验证动作完成，见下方[插件通道身份验证](#插件通道身份验证) |
| `140022010` | 需要安全验证 | 查询<a class="security-method-link" href="../api/get_security_verify_methods">安全验证方式</a>，按可用方式继续 |
| `140022013` | 账号或密码错误 | 检查账号配置 |

`security_url` 仅在响应实际包含地址时出现，不应假定该字段始终存在。

## 滑块验证

```js
const result = await api.submit_slider(self_id, platform, ticket, randstr)
```

| 参数 | 说明 |
| --- | --- |
| `self_id` | QQ 号 |
| `platform` | 账号平台 |
| `ticket` | 滑块完成后返回的 ticket |
| `randstr` | 滑块完成后返回的 randstr |

返回结构与 `login_account` 一致。如果返回另一种验证状态，继续按新的 `code` 处理。

## 安全验证

安全验证可通过 `security_verify` 判断当前可用方式，也可以调用 `get_security_verify_methods` 重新查询。根据返回的 `methods` 选择扫码、短信或其他验证方式。

这是 Android 密码登录过程中的安全验证，不是 [`get_login_qr`](/api/get_login_qr) 的扫码登录。

### 扫码安全验证

当结果为 `140022010` 时，可使用响应中的 `security_verify`，也可以重新查询当前验证原因和可用方式：

```js
const securityVerify = await api.get_security_verify_methods(self_id, platform)
```

当 `securityVerify.methods` 包含扫码方式时，获取安全验证二维码：

```js
const qr = await api.get_security_verify_qr(self_id, platform)
// 将 qr.qr_url 渲染为二维码
```

使用返回的 `guarantee_token` 每秒查询一次状态：

```js
const result = await api.query_security_verify_qr(
  self_id,
  platform,
  qr.guarantee_token,
)
```

`status` 依次可能为 `waiting`、`scanned`、`confirmed` 或 `expired`。当状态为 `confirmed` 时会自动继续登录，应停止轮询，再按当前响应的 `code` 与 `message` 处理登录结果。

### 短信安全验证

当结果为 `140022010` 且 `security_verify.methods.verify_list` 包含短信方式时，用该方式的 `sign` 请求短信验证。短信验证有两种类型，由 `verify_type` 指定，必填：

| `verify_type` | 名称 | 说明 |
| --- | --- | --- |
| `4` | 接收短信 | 服务端向密保手机下发验证码 |
| `3` | 发送短信 | 用户用密保手机把指定内容发送到指定号码 |

#### 接收短信（verify_type 4）

```js
const sms = await api.get_sms(self_id, platform, 4, sign)
```

返回短信验证信息：

```js
{ result: { state: 1, code: 1 }, sign: 'NEW_SMS_SIGN', masked_phone: '166******00', country_code: '86' }
```

提交时必须使用这里**新返回**的 `sign`：

```js
const result = await api.check_sms(self_id, platform, 4, sms.sign, code)
```

#### 发送短信（verify_type 3）

```js
const sms = await api.get_sms(self_id, platform, 3, sign)
```

返回里多出 `sms`（短信内容）和 `send_to`（接收号码）：

```js
{ result: { state: 1, code: 1 }, sign: 'NEW_SMS_SIGN', sms: '验证QQ',
  send_to: '10690700511', masked_phone: '166******00', country_code: '86' }
```

引导用户用密保手机把 `sms` 的内容原样发送到 `send_to`，发送后回查，不需要传 `code`：

```js
const result = await api.check_sms(self_id, platform, 3, sms.sign)
```

#### 结果处理

两种类型一致：校验通过后自动继续登录，返回结构与 `login_account` 一致；校验未通过时，`result.prompt` 是原因，登录会话保留，可以用同一个 `sign` 重试。

## 扫码登录

用手机 QQ 或已登录的 Android Bot（[`scan_qr`](/api/scan_qr) + [`auth_qr`](/api/auth_qr)）扫描 `get_login_qr` 返回的二维码。`platform` 指定要登录的端，当前实现了 `linux`，`windows` 暂未支持。

```js
const qr = await api.get_login_qr(self_id, platform, client_profile_id, device_profile_id)
// 将 qr.url 渲染为二维码
```

账号不存在时会按传入的客户端配置和设备配置创建。之后轮询：

```js
const result = await api.query_login_qr(self_id, platform)
```

`state` 可能为 `waiting_for_scan`、`waiting_for_confirm`、`confirmed`、`code_expired`、`canceled` 或 `invalid`。当 `login_complete` 为 `true` 或 `state` 为终态时停止轮询。

## 应用登录二维码

已登录的 Android Bot 可以扫描应用登录二维码（链接中的 `k=`）：

```js
await api.scan_qr(self_id, 'android', k)
await api.auth_qr(self_id, 'android', k)
```

[`scan_qr`](/api/scan_qr) 只完成扫码，[`auth_qr`](/api/auth_qr) 才确认登录。确认 Linux 码后继续 [`query_login_qr`](/api/query_login_qr)。不能单独用这两条代替 [`get_login_qr`](/api/get_login_qr) 创建扫码登录账号。

## 插件通道身份验证

`140022007`（需要身份验证）之后的插件通道身份验证共三步：

1. [`submit_identity_captcha`](/api/submit_identity_captcha)：提交验证码结果（`ticket`、`randstr`），获取绑定手机提示；
2. [`submit_identity_phone`](/api/submit_identity_phone)：填密保手机号，返回需要由该手机**照发的短信内容与目标号码**；
3. [`confirm_identity_sms`](/api/confirm_identity_sms)：用密保手机发送完成后回查，通过即身份验证完成。

前两步各自失败时账号仍处于等待验证状态，可修正参数后重试；`confirm_identity_sms` 失败通常表示短信尚未被收到，稍后可重试。身份验证通过后账号仍未上线，当前需要在管理后台继续完成登录；此时直接调用插件的 `login_account` 会因账号仍处于登录中而失败。

## 缓存登录

先检查缓存：

```js
const cache = await api.check_cache(self_id, platform)
// { valid: true | false }
```

`cache.valid === true` 表示可以尝试缓存登录，不保证登录成功：

```js
const result = await api.cache_login(self_id, platform)
```

成功：

```js
{ code: 0, message: '登录成功' }
```

失败时可能返回：

```js
{ code: 1, message: '...', cache_invalid: true }
```

`cache_invalid` 为 `true` 时，密码登录账号改用 `login_account`，扫码登录账号改用 `get_login_qr`。

`cache.valid === false` 时也按账号的登录方式重新登录。缓存登录的失败结果可能没有 `cache_invalid`，应检查 `code` 和 `message`；仅 `code === 0` 表示成功。详细说明见 [`cache_login`](/api/cache_login)。
