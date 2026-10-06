# submit_identity_captcha

提交身份验证所需的腾讯验证结果，开始身份验证流程。

## 前置条件

[`login_account`](/api/login_account) 返回 `140022007`（需要身份验证）且带 `identity_url`，账号处于登录挂起状态。

身份验证第一步会先弹一个腾讯验证码页（与登录滑块同属账号风控验证），完成后得到 `ticket` 与 `randstr`。本动作接收并提交这两个值，核心用账号级设备指纹完成后续查询，插件无需也无法自行构造设备信息。`ticket`/`randstr` 的获取方式（打码、人工渲染腾讯验证页等）由插件环境自行解决。

## 调用

```js
const result = await api.submit_identity_captcha(self_id, platform, ticket, randstr)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在登录的 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `ticket` | string | 是 | 腾讯验证完成后返回的 ticket |
| `randstr` | string | 是 | 腾讯验证完成后返回的 randstr |

## 返回值

调用成功即完成 chkcaptcha、chkrisk、查询验证方式与查询绑定手机，可进入下一步。返回该次查询的服务端原始响应（含掩码手机号 `phoneNum`、区号 `areaCode` 等），其他字段按原始结构保留。失败返回 `{ code, message }`，账号仍处登录挂起，可修正后重试。

成功后调用 [`submit_identity_phone`](/api/submit_identity_phone)。

完整流程见[Bot 登录流程](/guide/login-flow)。
