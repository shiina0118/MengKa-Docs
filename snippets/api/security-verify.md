## NT 安全验证方式（SecurityVerify） {#security-verify}

以下结构适用于 NT 账号（`nt: 1`）。`reason` 和 `methods` 原样转发服务端返回的对象，下表只列出常用字段。PC（Linux）账号的两者为同一对象。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `reason` | [VerifyReason](#verify-reason) | 当前需要验证的原因 |
| `methods` | [VerifyMethods](#verify-methods) | 当前可用的短信、扫码或其他验证方式 |

### reason（VerifyReason） {#verify-reason}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `prompt` | string | 可展示给用户的验证原因 |

### methods（VerifyMethods） {#verify-methods}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `prompt` | string | 可展示给用户的验证提示 |
| `verify_list` | number[] | 可用验证方式，取值见下表 |
| `sms_phone` | [SMSPhone](#verify-sms-phone) | 短信验证信息，支持短信验证时出现 |

| `verify_list` 包含值 | 含义 | 后续操作 |
| --- | --- | --- |
| `4` | 支持接收短信（服务端下发验证码） | 用 `methods.sms_phone.sign` 调用 `ntlogin_get_sms`，`verify_type` 传 `4` |
| `3` | 支持发送短信（用户用密保手机发送） | 用 `methods.sms_phone.sign` 调用 `ntlogin_get_sms`，`verify_type` 传 `3` |
| `10` | 支持扫码验证 | 调用 `ntlogin_get_security_verify_qr` 获取安全验证二维码，再调用 `ntlogin_query_security_verify_qr` 查询状态 |
| 包含多个值 | 同时支持多种验证方式 | 选择任意一种可用方式 |
| 不包含 `3`、`4`、`10` | 需要其他验证方式 | 打开登录结果中的 `security_url`，用户完成后调用 [`ntlogin_retry_security_verify`](/api/ntlogin_retry_security_verify) 继续登录，见[其他方式](/guide/login-flow#other-security) |

PC（Linux）账号始终支持扫码验证，`verify_list` 总会包含 `10`。

`3` 和 `4` 共用 `methods.sms_phone.sign`，区别只在调用 `ntlogin_get_sms` / `ntlogin_check_sms` 时传的 `verify_type`。可用类型以 `verify_list` 为准，不要写死。

### methods.sms_phone（SMSPhone） {#verify-sms-phone}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `sign` | string | 调用 `ntlogin_get_sms` 时传入的 `sign` |
