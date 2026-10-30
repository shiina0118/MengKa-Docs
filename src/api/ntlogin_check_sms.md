# ntlogin_check_sms

提交 NT 账号（`nt: 1`）的短信安全验证，并继续登录。WT 账号调用会返回 `ok: false` 和模式不匹配提示，应使用 [`wtlogin_check_sms`](/api/wtlogin_check_sms)。

`verify_type` 需要与 [`ntlogin_get_sms`](/api/ntlogin_get_sms) 时一致：

| `verify_type` | 名称 | 提交内容 |
| --- | --- | --- |
| `4` | 接收短信 | 提交用户收到的验证码 `code` |
| `3` | 发送短信 | 不提交 `code`，回查服务端是否已收到用户发出的短信 |

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "ntlogin_check_sms",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "verify_type": 4,
    "sign": "NEW_SIGN_FROM_GET_SMS",
    "code": "123456"
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在登录的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `verify_type` | number | 是 | 短信验证类型，`4` 接收短信，`3` 发送短信 |
| `sign` | string | 是 | `ntlogin_get_sms` **新返回**的 sign |
| `code` | string | 视类型 | `verify_type` 为 `4` 时必填；为 `3` 时不需要传 |

`verify_type` 必填，且只接受 `3` 或 `4`，缺失或取值不合法会直接报错。

## 返回值

**校验通过**：自动继续登录，返回 [NT 登录结果](/api/ntlogin_login_account#login-result)。

校验通过并登录成功时：

```json
{ "code": 0, "message": "登录成功", "next": "done" }
```

无需另调“安全验证成功”接口。若继续登录仍返回 `slider`、`identity` 或 `security`，按新的验证步骤处理；`failed` 表示本次登录已结束，展示 `message` 后处理失败原因。完整说明见[安全验证成功后继续登录](/guide/login-flow#security-success)。

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

先检查外层 `ok`，再按 `next` 判断后续操作。`next: "security"` 且返回 `result` 时，表示短信验证未通过，可展示 `result.prompt`；结果可能只有 `result.code` 而没有 `result.state`，不能因缺少 `state` 就判定通过。仅 `next: "done"` 表示登录成功；`failed` 时停止重试并处理 `message`。

::: warning verify_type 为 3 时需要留出发送时间
用户发出短信后，服务端可能要几秒才能收到。此时 `result.state` 为 `2`、`result.code` 为 `3`，含义是「尚未收到」而非「验证失败」，属于可重试状态，应提示用户确认已用密保手机发送后再调用一次。
:::

完整流程见[Bot 登录流程](/guide/login-flow)。
