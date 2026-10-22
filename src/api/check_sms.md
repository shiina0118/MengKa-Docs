# check_sms

提交短信安全验证，并继续登录。

`verify_type` 需要与 [`get_sms`](/api/get_sms) 时一致：

| `verify_type` | 名称 | 提交内容 |
| --- | --- | --- |
| `4` | 接收短信 | 提交用户收到的验证码 `code` |
| `3` | 发送短信 | 不提交 `code`，回查服务端是否已收到用户发出的短信 |

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "check_sms",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "verify_type": 4,
    "sign": "SIGN_FROM_VERIFY_RESPONSE",
    "code": "123456"
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/check_sms' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "verify_type": 4,
  "sign": "SIGN_FROM_VERIFY_RESPONSE",
  "code": "123456"
}'
```

发送短信验证时，将 `verify_type` 改为 `3` 并省略 `code`；`sign` 使用 `get_sms` 下发的新值。

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在登录的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `verify_type` | number | 是 | 短信验证类型，`4` 接收短信，`3` 发送短信 |
| `sign` | string | 是 | `get_sms` **新返回**的 sign |
| `code` | string | 视类型 | `verify_type` 为 `4` 时必填；为 `3` 时不需要传 |

`verify_type` 必填，且只接受 `3` 或 `4`，缺失或取值不合法会直接报错。

## 返回值

**校验通过**：自动继续登录，返回 [LoginResult](#login-result)。

**校验未通过**：返回验证结果，`result.prompt` 是失败原因，`next` 为 `security`。登录会话保留，可以用同一个 `sign` 重试。

```js
{
  result: {
    state: 2,
    code: 3,
    prompt: '未收到短信，原因可能是：未使用密保手机发送；短信内容不正确；运营商不稳定。',
  },
  next: 'security',
}
```

判断方式：出现 `result.state` 字段即为未通过，`result.prompt` 是可直接展示给用户的原因。

::: warning verify_type 为 3 时需要留出发送时间
用户发出短信后，服务端可能要几秒才能收到。此时 `result.state` 为 `2`、`result.code` 为 `3`，含义是「尚未收到」而非「验证失败」，属于可重试状态，应提示用户确认已用密保手机发送后再调用一次。
:::

完整流程见[Bot 登录流程](/guide/login-flow)。

<!--@include: ../../snippets/api/login-result.md-->

<!--@include: ../../snippets/api/security-verify.md-->
