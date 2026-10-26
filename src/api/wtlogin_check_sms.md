# wtlogin_check_sms

提交 WT 登录的短信验证码，通过后自动继续登录并上线。账号须为 `nt: 0` 且正在等待短信验证；NT 账号调用会返回 `ok: false` 和模式不匹配提示。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "wtlogin_check_sms",
  "params": { "self_id": 123456789, "protocol_id": 0, "code": "123456" }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在登录的账号 QQ 号 |
| `protocol_id` | number | 是 | 与 `self_id` 共同定位账号，允许为 `0` |
| `code` | string | 是 | 用户收到的短信验证码 |

先调用 [`wtlogin_get_sms`](/api/wtlogin_get_sms) 下发验证码。无需传入 `verify_type` 或 `sign`。

## 返回值

返回 [WT 登录结果](/api/wtlogin_login_account#wtlogin-result)。`next` 为 `done` 表示已上线；若仍为 `security`，展示 `message`，按提示处理后继续提交。返回其他验证要求时，按新的 `next` 处理。

`next` 为 `failed` 时，当前登录已结束，不能沿用原会话提交验证码，应根据 `message` 处理后重新发起 WT 登录。
