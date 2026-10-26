# wtlogin_get_sms

为正在等待短信验证的 WT 账号下发短信验证码。账号须为 `nt: 0`；NT 账号调用会返回 `ok: false` 和模式不匹配提示。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "wtlogin_get_sms",
  "params": { "self_id": 123456789, "protocol_id": 0 }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在登录的账号 QQ 号 |
| `protocol_id` | number | 是 | 与 `self_id` 共同定位账号，允许为 `0` |

无需传入 `verify_type` 或 `sign`。

## 返回值

返回本次短信请求的结果及短信提示字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `code` | number | `0` 表示短信请求成功，不表示账号已上线 |
| `message` | string | 结果说明 |
| `next` | string | 下发成功时为 `security`，继续等待短信验证码 |
| `status` | number | 当前账号状态：`0` 离线、`1` 在线、`2` 登录中；本次短信请求是否还能继续以 `next` 为准 |
| `mobile` | string | 手机号提示，可能为空 |
| `country_code` | string | 国家或地区代码 |
| `time_limit` | number | 短信请求的时间限制，单位为秒 |
| `available_msg_count` | number | 当前可用的短信请求次数 |
| `login_method` | string | `wtlogin` |
| `wtlogin_code` | number | 此次请求的原始结果码 |
| `verification_supported` | boolean | 收到 WT 短信请求结果时为 `true` |

`code: 0` 表示短信请求成功，账号仍在等待验证，不能据此判断已上线。验证要求发生变化时，还可能带有对应的验证地址，见 [WT 登录结果](/api/wtlogin_login_account#wtlogin-result)。网络等异常导致登录结束时，响应可能只有 `code`、`message` 和 `next: "failed"`。

用户收到验证码后，用 [`wtlogin_check_sms`](/api/wtlogin_check_sms) 提交。若返回 `slider` 或 `identity`，先按[WT 登录流程](/api/wtlogin_login_account#返回值)完成对应验证。

`next` 为 `failed` 时，本次请求所属的登录会话已结束。若 `message` 提示会话已变化，先调用 [`get_bot_info`](/api/get_bot_info) 查询账号当前状态，避免中断或重复发起后来开始的登录；确认账号离线后，再根据提示重新发起 WT 登录。
