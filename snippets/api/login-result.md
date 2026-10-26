## 登录结果（LoginResult） {#login-result}

密码登录，以及滑块、身份验证、短信和安全验证扫码通过后自动继续的登录，都返回此结构。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `code` | number | 结果码，`0` 表示登录成功，常见取值见下表；用于展示和排查 |
| `message` | string | 结果说明 |
| `next` | string | 下一步，取值见[登录结果的 next 字段](/guide/login-flow#next)；按 `next` 分支即可 |
| `slider_url` | string | 滑块验证原始地址，需要滑块验证时出现；可传给 `register_captcha` 获取验证页面 |
| `identity_url` | string | 身份验证地址，需要身份验证且有值时出现 |
| `security_url` | string | 安全验证地址，需要安全验证且有值时出现 |
| `security_verify` | [SecurityVerify](#security-verify) | 可用的安全验证方式，需要安全验证且查询成功时出现 |
| `security_verify_error` | string | 查询安全验证方式失败的原因，需要安全验证但查询失败时出现；可调用 `get_security_verify_methods` 重新查询 |
| `login_method` | string | WT 登录结果中为 `wtlogin` |
| `wtlogin_code` | number | WT 登录请求的原始结果码，按 `next` 选择后续动作 |
| `verification_supported` | boolean | WT 登录结果中的验证支持标记 |
| `status` | number | WT 登录仍在等待验证时为 `2` |
| `mobile` | string | WT 短信验证的手机号提示，有值时展示给用户 |
| `country_code` | string | WT 短信验证的国家或地区代码 |
| `time_limit` | number | WT 短信请求的时间限制，单位为秒 |
| `available_msg_count` | number | WT 当前可用的短信请求次数 |

| `code` | `next` | 含义 |
| --- | --- | --- |
| `0` | `done` | 登录成功 |
| `140022008` | `slider` | 需要滑块验证 |
| `140022007` | `identity` | 需要身份验证 |
| `140022010` | `security` | 需要安全验证，查询<a class="security-method-link" href="../api/get_security_verify_methods">安全验证方式</a> |
| `140022013` | `failed` | 账号或密码错误 |
