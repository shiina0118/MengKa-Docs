# ntlogin_get_sms

请求 NT 账号（`nt: 1`）的短信安全验证。WT 账号调用会返回 `ok: false` 和模式不匹配提示，应使用 [`wtlogin_get_sms`](/api/wtlogin_get_sms)。

短信验证有两种类型，由 `verify_type` 指定，两者共用 `ntlogin_get_sms` / `ntlogin_check_sms`：

| `verify_type` | 名称 | 说明 |
| --- | --- | --- |
| `4` | 接收短信 | 服务端向密保手机下发验证码，用户把收到的验证码交回 |
| `3` | 发送短信 | 用户用密保手机把指定内容发送到指定号码，服务端回查是否收到 |

可用类型由 [`ntlogin_get_security_verify_methods`](/api/ntlogin_get_security_verify_methods) 的 `methods.verify_list` 决定，不要写死。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "ntlogin_get_sms",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "verify_type": 4,
    "sign": "SIGN_FROM_VERIFY_RESPONSE"
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在登录的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `verify_type` | number | 是 | 短信验证类型，`4` 接收短信，`3` 发送短信 |
| `sign` | string | 是 | [`ntlogin_get_security_verify_methods`](/api/ntlogin_get_security_verify_methods) 返回的 `methods.sms_phone.sign` |

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
  next: 'security',
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
  next: 'security',
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

`verify_type` 为 `3` 时，需要引导用户**用 `masked_phone` 对应的密保手机**把 `sms` 的内容原样发送到 `send_to`，发送后再调用 [`ntlogin_check_sms`](/api/ntlogin_check_sms) 回查。

`verify_type` 为 `4` 时，提示用户查看密保手机，再调用 [`ntlogin_check_sms`](/api/ntlogin_check_sms)，传入本次新返回的 `sign`、`verify_type: 4` 和用户收到的 `code`。

仅在 `result.state` 为 `1` 时进入上述后续步骤；其他值应展示 `result.prompt`。短信请求成功后 `next` 仍为 `security`，不代表验证通过或登录成功。

完整流程见[Bot 登录流程](/guide/login-flow)。
