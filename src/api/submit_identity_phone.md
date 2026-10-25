# submit_identity_phone

验证绑定手机号，并获取需要由该密保手机发送的短信内容与目标号码。

## 前置条件

已调用 [`submit_identity_captcha`](/api/submit_identity_captcha) 且成功，账号处于身份验证的「填手机号」阶段。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "submit_identity_phone",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "mobile": "13800000000",
    "area_code": "+86"
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在登录的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `mobile` | string | 是 | 绑定密保手机号（完整号码，用于校验） |
| `area_code` | string | 是 | 区号，如 `+86` |

## 返回值

成功时返回短信内容 `sms` 与目标号码 `sendTo`。请将这两个字段展示给用户，引导其用密保手机发送短信。结果中的 `next` 为 `identity`。

拿到短信内容与号码后，引导用户**用该密保手机**把内容原样发送到目标号码，发送完成后再调用 [`confirm_identity_sms`](/api/confirm_identity_sms)。

完整流程见[Bot 登录流程](/guide/login-flow)。
