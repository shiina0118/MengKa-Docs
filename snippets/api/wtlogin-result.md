## WT 登录结果（WTLoginResult） {#wtlogin-result}

WT 账号发起登录，以及滑块、短信或身份验证通过后继续 WT 登录时，先按 `next` 判断当前步骤。

### 基础字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `code` | number | 本次操作的结果码；登录是否完成以 `next` 为准 |
| `message` | string | 结果说明，可展示给用户 |
| `next` | string | `done` 已上线；`slider` 等待滑块；`security` 等待 WT 短信验证；`identity` 等待身份验证；`failed` 本次登录结束 |
| `login_method` | string | 收到 WT 登录结果时为 `wtlogin` |
| `wtlogin_code` | number | WT 请求的结果码，用于排查；与 `code` 是不同字段，按 `next` 选择后续动作 |
| `verification_supported` | boolean | 收到 WT 登录结果时为 `true`，表示支持按验证状态继续处理 |
| `status` | number | 验证续登仍在等待时可能返回 `2`；验证续登终止失败时可能返回 `0`，不保证每次都有此字段 |

### 验证字段（按状态出现）

| 字段 | 类型 | 出现条件与用途 |
| --- | --- | --- |
| `slider_url` | string | `next: "slider"` 且服务端提供地址时出现，用于完成当前滑块验证 |
| `identity_url` | string | `next: "identity"` 且服务端提供地址时出现，用于 WT 身份验证流程 |
| `security_url` | string | WT 短信验证时服务端可能附带的验证提示链接，不保证存在；短信续登仍使用 `wtlogin_get_sms` / `wtlogin_check_sms` |
| `mobile` | string | 短信验证的手机号提示，有值时展示给用户 |
| `country_code` | string | 短信验证的国家或地区代码 |
| `time_limit` | number | 短信请求的时间限制，单位为秒 |
| `available_msg_count` | number | 当前可用的短信请求次数 |

`mobile`、`country_code`、`time_limit` 和 `available_msg_count` 在需要短信验证或有手机号提示时出现；[`wtlogin_get_sms`](/api/wtlogin_get_sms) 正常返回短信请求结果时也包含这些字段。网络等异常导致登录结束时，响应可能只有 `code`、`message` 和 `next: "failed"`，不能要求 WT 扩展字段始终存在。

WT 短信验证无需 `sign` 或 `verify_type`，也无需获取安全验证二维码。

WT 的短信下发成功只表示请求已处理，`code: 0` 时仍可能是 `next: "security"`；验证码提交未通过且会话仍可继续时，`code` 可以非零而 `next` 仍为验证状态。只有 `next: "done"` 才表示账号已上线。
