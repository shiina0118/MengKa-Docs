# wtlogin_submit_slider

提交 WT 登录的滑块验证结果，并继续当前登录。账号须为 `nt: 0` 且正在等待滑块验证；NT 账号调用会返回 `ok: false` 和模式不匹配提示。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "wtlogin_submit_slider",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "ticket": "TICKET_FROM_CAPTCHA",
    "randstr": "RANDSTR_FROM_CAPTCHA"
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在登录的账号 QQ 号 |
| `protocol_id` | number | 是 | 与 `self_id` 共同定位账号，允许为 `0` |
| `ticket` | string | 是 | 当前滑块验证完成后返回的 ticket |
| `randstr` | string | 是 | 同一次验证返回的 randstr |

可将登录响应的 `slider_url` 交给 [`register_captcha`](/api/register_captcha)，再用 [`captcha_heartbeat`](/api/captcha_heartbeat) 获取验证结果。

## 返回值

返回 [WT 登录结果](/api/wtlogin_login_account#wtlogin-result)。`next` 为 `done` 表示已上线；返回新的验证要求时，按新的 `next` 继续。短信分支使用 [`wtlogin_get_sms`](/api/wtlogin_get_sms) / [`wtlogin_check_sms`](/api/wtlogin_check_sms)，身份验证使用 `submit_identity_captcha`、`submit_identity_phone`、`confirm_identity_sms`。
