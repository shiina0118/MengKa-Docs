# submit_identity_captcha

提交身份验证所需的腾讯验证结果，开始身份验证流程。NT 和 WT 账号共用本接口。

## 前置条件

[`ntlogin_login_account`](/api/ntlogin_login_account) 或 [`wtlogin_login_account`](/api/wtlogin_login_account) 返回 `next: "identity"` 且带 `identity_url`，账号处于登录挂起状态。

先引导用户完成腾讯验证码页面，取得 `ticket` 与 `randstr`，再将这两个值传给本接口。插件需自行提供验证码页面的交互入口。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "submit_identity_captcha",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "ticket": "TICKET_FROM_CAPTCHA",
    "randstr": "RANDSTR_FROM_CAPTCHA"
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在登录的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `ticket` | string | 是 | 腾讯验证完成后返回的 ticket |
| `randstr` | string | 是 | 腾讯验证完成后返回的 randstr |

## 返回值

成功时返回绑定手机信息，包括掩码手机号 `phoneNum`、区号 `areaCode` 等，可用于提示用户进入下一步。失败返回 `{ code, message }`，账号仍处于等待验证状态，可修正后重试。成功和可重试的失败都返回 `next: "identity"`。

成功后调用 [`submit_identity_phone`](/api/submit_identity_phone)。

完整流程见[Bot 登录流程](/guide/login-flow)。
