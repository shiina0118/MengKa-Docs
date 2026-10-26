# wtlogin_get_security_verify_methods

查询正在等待短信验证的 WT 账号（`nt: 0`）的验证提示和手机号提示。NT 账号调用返回 `ok: false` 和模式不匹配提示。

WT 账号正在等待滑块或身份验证等其他步骤时，也返回 `ok: false`，不会把原验证步骤改为短信验证。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "wtlogin_get_security_verify_methods",
  "params": { "self_id": 123456789, "protocol_id": 0 }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在等待 WT 短信验证的账号 QQ 号 |
| `protocol_id` | number | 是 | 与 `self_id` 共同定位账号，允许为 `0` |

## 返回值

示例中的手机号提示仅用于展示，实际以响应为准：

```json
{
  "reason": { "prompt": "当前账号需要短信验证" },
  "methods": { "verify_list": [4], "mobile": "138****0000", "country_code": "86" },
  "next": "security"
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `reason` | object | 当前需要验证的原因 |
| `reason.prompt` | string | 验证提示，可能为空 |
| `methods` | object | WT 短信验证方式 |
| `methods.verify_list` | number[] | 固定为 `[4]`，表示接收短信验证码 |
| `methods.mobile` | string | 手机号提示，可能为空 |
| `methods.country_code` | string | 国家或地区代码，可能为空 |
| `next` | string | 固定为 `security`，仍在等待短信验证 |

账号仍在等待短信、但查询提示失败时，返回 `{ code, message, next: "security" }`，不会结束当前验证会话，可修正问题后重试。

本接口只查询提示。下发短信调用 [`wtlogin_get_sms`](/api/wtlogin_get_sms)，提交验证码调用 [`wtlogin_check_sms`](/api/wtlogin_check_sms)，无需 `verify_type` 或 `sign`。
