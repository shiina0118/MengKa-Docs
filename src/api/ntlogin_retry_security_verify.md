# ntlogin_retry_security_verify

NT 密码登录选择“其他方式”后，用户在 `security_url` 页面完成安全验证，点击“我已完成”时调用此接口，在当前登录会话中继续登录。

仅支持 NT 账号（`nt: 1`），适用于 Android 和 PC（Linux）。账号须属于当前插件节点，并仍处于登录中 / 等待验证状态。WT 账号调用会返回 `ok: false` 和模式不匹配提示。

无需先调用 `offline_account`，也无需重新调用 `ntlogin_login_account`。本接口保留当前登录会话，不要求传入验证码或验证凭据。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "ntlogin_retry_security_verify",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 当前正在验证的 Bot QQ 号 |
| `protocol_id` | number | 是 | 同一次登录使用的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

## 返回值

返回 [NT 登录结果](/api/ntlogin_login_account#login-result)。登录成功时：

```json
{ "code": 0, "message": "登录成功", "next": "done" }
```

用户点击“我已完成”不代表验证已经通过，调用方必须按返回的 `next` 处理：

| `next` | 后续操作 |
| --- | --- |
| `done` | 登录成功，关闭验证界面，开始使用该 Bot |
| `security` | 仍需安全验证，会话保留；查询当前验证方式，完成验证后可再次调用本接口 |
| `slider` / `identity` | 会话保留，转入相应验证步骤 |
| `failed` | 本次登录已结束，展示 `message`，处理失败原因后重新发起登录 |

## 错误处理

参数不合法、账号不属于当前插件节点、模式不符，或账号已离线 / 在线时，返回外层 `ok: false`，读取 `error` 处理。例如：

```json
{
  "type": "action_result",
  "id": "1",
  "ok": false,
  "error": "账号当前不在登录/等待验证状态"
}
```

登录会话从发起时起最多等待 5 分钟，提交验证不会重新计时。超时后账号变为离线，再调用本接口通常返回上述 `ok: false`，应重新发起密码登录。

如果会话在请求处理期间失效，或继续登录的请求出错、上线失败，则返回 `next: "failed"` 的登录结果。外层 `ok: true` 只表示请求已处理，不表示登录成功。

短信验证和安全验证扫码通过后，对应接口会自动继续登录，无需再调用本接口。完整操作顺序见[其他方式：完成验证后继续登录](/guide/login-flow#other-security)。
