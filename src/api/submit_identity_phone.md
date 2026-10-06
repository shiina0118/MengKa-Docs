# submit_identity_phone

验证绑定手机号，并获取需要由该密保手机发送的短信内容与目标号码。

## 前置条件

已调用 [`submit_identity_captcha`](/api/submit_identity_captcha) 且成功，账号处于身份验证的「填手机号」阶段。

## 调用

```js
const result = await api.submit_identity_phone(self_id, platform, mobile, area_code)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在登录的 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `mobile` | string | 是 | 绑定密保手机号（完整号码，用于校验） |
| `area_code` | string | 是 | 区号，如 `+86` |

## 返回值

调用成功即完成手机号校验（verifymbphone）并取得短信指令（getsms）。返回服务端原始响应，其中包含**需要密保手机照发的短信内容与目标号码**（管理面板按 `sendTo` / `sms` 解析），其他字段按原始结构保留。

拿到短信内容与号码后，引导用户**用该密保手机**把内容原样发送到目标号码，发送完成后再调用 [`confirm_identity_sms`](/api/confirm_identity_sms)。

完整流程见[Bot 登录流程](/guide/login-flow)。
