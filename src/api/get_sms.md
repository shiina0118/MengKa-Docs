# get_sms

请求短信安全验证。

短信验证有两种类型，由 `verify_type` 指定，两者共用 `get_sms` / `check_sms`：

| `verify_type` | 名称 | 说明 |
| --- | --- | --- |
| `4` | 接收短信 | 服务端向密保手机下发验证码，用户把收到的验证码交回 |
| `3` | 发送短信 | 用户用密保手机把指定内容发送到指定号码，服务端回查是否收到 |

可用类型由 [`get_security_verify_methods`](/api/get_security_verify_methods) 的 `methods.verify_list` 决定，不要写死。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "get_sms",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "verify_type": 4,
    "sign": "SIGN_FROM_VERIFY_RESPONSE"
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_sms' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "verify_type": 4,
  "sign": "SIGN_FROM_VERIFY_RESPONSE"
}'
```

发送短信验证时，将 `verify_type` 改为 `3`；`sign` 使用安全验证方式查询返回的值。

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在登录的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `verify_type` | number | 是 | 短信验证类型，`4` 接收短信，`3` 发送短信 |
| `sign` | string | 是 | `security_verify.methods.sms_phone.sign` |

`verify_type` 必填，且只接受 `3` 或 `4`，缺失或取值不合法会直接报错。

## 返回值

返回短信验证信息，根据 `verify_type` 引导用户完成对应操作。

`verify_type` 为 `4`：

```js
{
  result: { state: 1, code: 1 },
  sign: 'NEW_SMS_SIGN',
  masked_phone: '166******00',
  country_code: '86',
}
```

`verify_type` 为 `3`：

```js
{
  result: { state: 1, code: 1 },
  sign: 'NEW_SMS_SIGN',
  sms: '验证QQ',
  send_to: '10690700511',
  masked_phone: '166******00',
  country_code: '86',
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `result` | [SMSResult](#result) | 请求结果 |
| `sign` | string | 新的 sign，提交时必须用这个，不能沿用请求时传入的那个 |
| `sms` | string | 仅 `verify_type` 为 `3`：需要用户发送的短信内容 |
| `send_to` | string | 仅 `verify_type` 为 `3`：短信的接收号码 |
| `masked_phone` | string | 打码后的密保手机号，用于提示用户 |
| `country_code` | string | 密保手机号的国家或地区代码 |
| `next` | string | 固定为 `security`，表示仍处于安全验证 |

除 `next` 外，其余字段原样转发服务端返回的对象，上表只列出常用字段。

### result（SMSResult） {#result}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `state` | number | `1` 为成功，其他值为失败 |
| `prompt` | string | 失败原因，失败时出现 |

`verify_type` 为 `3` 时，需要引导用户**用 `masked_phone` 对应的密保手机**把 `sms` 的内容原样发送到 `send_to`，发送后再调用 [`check_sms`](/api/check_sms) 回查。

完整流程见[Bot 登录流程](/guide/login-flow)。
