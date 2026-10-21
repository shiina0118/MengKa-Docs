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

- `reason` 包含当前需要验证的原因。
- `methods` 包含当前可用的短信、扫码或其他验证方式。

常见状态：

| `methods.verify_list` 包含值 | 含义 | 后续操作 |
| --- | --- | --- |
| `4` | 支持接收短信（服务端下发验证码） | 用 `methods.sms_phone.sign` 调用 `get_sms`，`verify_type` 传 `4` |
| `3` | 支持发送短信（用户用密保手机发送） | 用 `methods.sms_phone.sign` 调用 `get_sms`，`verify_type` 传 `3` |
| `10` | 支持扫码验证 | 调用 `get_security_verify_qr` 获取安全验证二维码，再调用 `query_security_verify_qr` 查询状态 |
| 包含多个值 | 同时支持多种验证方式 | 选择任意一种可用方式 |
| 不包含 `3`、`4`、`10` | 需要其他验证方式 | 使用 `login_account` 返回的 `security_url` 完成验证 |

`3` 和 `4` 共用 `methods.sms_phone.sign`，区别只在调用 `get_sms` / `check_sms` 时传的 `verify_type`。可用类型以 `verify_list` 为准，不要写死。

`reason.prompt` 或 `methods.prompt` 是可展示给用户的验证原因或提示文案。

返回结构与 [`login_account`](/api/login_account) 的 `security_verify` 字段一致。

完整流程见[Bot 登录流程](/guide/login-flow)。
