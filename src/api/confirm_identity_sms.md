# confirm_identity_sms

确认已用密保手机发送短信，完成身份验证。

## 前置条件

已调用 [`submit_identity_phone`](/api/submit_identity_phone) 拿到短信内容与目标号码，用户用密保手机按内容发送完成后调用本动作回查。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.confirm_identity_sms(self_id, platform, mobile, area_code)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/confirm_identity_sms' \
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
| `mobile` | string | 是 | 同提交时使用的密保手机号 |
| `area_code` | string | 是 | 同提交时使用的区号 |

## 返回值

返回身份验证结果。成功表示已确认收到短信，并通过身份验证。

调用失败返回 `{ code, message }`（如短信尚未送达、发送内容不符），账号仍处登录挂起，可以用相同参数重试；发送后到腾讯侧确认可能有几秒到几十秒延迟。

验证通过不代表账号已上线。当前插件 API 尚不支持直接续接这一步登录，请在管理后台继续完成登录。账号仍处于登录中时，调用 `login_account` 会失败。

完整流程见[Bot 登录流程](/guide/login-flow)。
