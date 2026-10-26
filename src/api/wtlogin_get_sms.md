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

返回登录结果及短信提示字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `code` | number | `0` 表示短信请求成功，不表示账号已上线 |
| `message` | string | 结果说明 |
| `next` | string | 下发成功时为 `security`，继续等待短信验证码 |
| `status` | number | `2` 表示仍在登录中；终止失败后为 `0`（离线） |
| `mobile` | string | 手机号提示，可能为空 |
| `country_code` | string | 国家或地区代码 |
| `time_limit` | number | 短信请求的时间限制，单位为秒 |
| `available_msg_count` | number | 当前可用的短信请求次数 |
| `login_method` | string | `wtlogin` |
| `wtlogin_code` | number | 此次请求的原始结果码 |

用户收到验证码后，用 [`wtlogin_check_sms`](/api/wtlogin_check_sms) 提交。若返回 `slider` 或 `identity`，先按[WT 登录流程](/api/wtlogin_login_account#返回值)完成对应验证。

`next` 为 `failed` 时，当前登录已结束，应根据 `message` 处理原因后重新发起 WT 登录。
