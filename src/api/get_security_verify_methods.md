# get_security_verify_methods

查询正在登录的 Bot 当前安全验证原因和可用验证方式。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "get_security_verify_methods",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_security_verify_methods' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在等待安全验证的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

## 返回值

```js
{
  reason: {
    prompt: '当前账号需要安全验证',
  },
  methods: {
    prompt: '请选择验证方式',
    verify_list: [4, 10],
    sms_phone: {
      sign: 'SMS_SIGN',
    },
  },
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `reason` | [VerifyReason](#verify-reason) | 当前需要验证的原因 |
| `methods` | [VerifyMethods](#verify-methods) | 当前可用的短信、扫码或其他验证方式 |
| `next` | string | 固定为 `security` |

`reason.prompt` 或 `methods.prompt` 是可展示给用户的验证原因或提示文案。

成功结果还带有 `next: "security"`。查询失败时返回 `{ code, message, next: "security" }`，账号仍在等待安全验证，可以重新查询。

完整流程见[Bot 登录流程](/guide/login-flow)。

<!--@include: ../../snippets/api/security-verify.md-->
