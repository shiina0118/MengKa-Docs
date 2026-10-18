# submit_identity_phone

验证绑定手机号，并获取需要由该密保手机发送的短信内容与目标号码。

## 前置条件

已调用 [`submit_identity_captcha`](/api/submit_identity_captcha) 且成功，账号处于身份验证的「填手机号」阶段。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.submit_identity_phone(self_id, platform, mobile, area_code)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/submit_identity_phone' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "mobile": "13800000000",
  "area_code": "+86"
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在登录的 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `mobile` | string | 是 | 绑定密保手机号（完整号码，用于校验） |
| `area_code` | string | 是 | 区号，如 `+86` |

## 返回值

成功时返回短信内容 `sms` 与目标号码 `sendTo`。请将这两个字段展示给用户，引导其用密保手机发送短信。

拿到短信内容与号码后，引导用户**用该密保手机**把内容原样发送到目标号码，发送完成后再调用 [`confirm_identity_sms`](/api/confirm_identity_sms)。

完整流程见[Bot 登录流程](/guide/login-flow)。
