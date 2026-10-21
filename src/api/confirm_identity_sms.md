# confirm_identity_sms

确认已用密保手机发送短信，完成身份验证并继续登录。

## 前置条件

已调用 [`submit_identity_phone`](/api/submit_identity_phone) 拿到短信内容与目标号码，用户用密保手机按内容发送完成后调用本动作回查。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "confirm_identity_sms",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "mobile": "13800000000",
    "area_code": "+86"
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/confirm_identity_sms' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
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
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `mobile` | string | 是 | 同提交时使用的密保手机号 |
| `area_code` | string | 是 | 同提交时使用的区号 |

## 返回值

身份验证通过后，会在同一登录会话内自动继续登录，返回结构与 [`login_account`](/api/login_account) 一致：`next` 为 `done` 表示已上线；也可能返回新的验证状态（如 `slider`、`security`），按 `next` 继续处理。

短信确认未通过（如短信尚未送达、发送内容不符）时返回 `{ code, message, next: "identity" }`，账号仍处登录挂起，可以用相同参数重试；发送后到腾讯侧确认可能有几秒到几十秒延迟。

短信确认已通过、但后续登录失败时返回 `next: "failed"`，本次登录会话已结束，不能再用本接口重试，需要重新调用 [`login_account`](/api/login_account)。

完整流程见[Bot 登录流程](/guide/login-flow)。
