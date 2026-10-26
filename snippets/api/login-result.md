## NT 登录结果（LoginResult） {#login-result}

NT 账号的密码登录返回以下字段。滑块、身份验证、短信或安全验证扫码通过后继续 NT 登录时，也使用此结构；验证地址仅在相应状态下出现。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `code` | number | 结果码，`0` 表示登录成功，常见取值见下表；用于展示和排查 |
| `message` | string | 结果说明 |
| `next` | string | 下一步，取值见[登录结果的 next 字段](/guide/login-flow#next)；按 `next` 分支即可 |
| `slider_url` | string | 滑块验证原始地址，需要滑块验证时出现；可传给 `register_captcha` 获取验证页面 |
| `identity_url` | string | 身份验证地址，需要身份验证且有值时出现 |
| `security_url` | string | 安全验证地址，需要安全验证且有值时出现 |

| `code` | `next` | 含义 |
| --- | --- | --- |
| `0` | `done` | 登录成功 |
| `140022008` | `slider` | 需要滑块验证 |
| `140022007` | `identity` | 需要身份验证 |
| `140022010` | `security` | 需要安全验证，查询[安全验证方式](/api/ntlogin_get_security_verify_methods) |
| `140022013` | `failed` | 账号或密码错误 |
