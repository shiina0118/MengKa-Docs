# submit_slider

提交滑块验证结果。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "submit_slider",
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
| `self_id` | number | 是 | 正在登录的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `ticket` | string | 是 | 滑块完成后返回的 ticket |
| `randstr` | string | 是 | 滑块完成后返回的 randstr |

## 返回值

返回 [LoginResult](#login-result)。若返回另一种验证状态，继续按新的 `next` 处理。

<!--@include: ../../snippets/api/login-result.md-->

<!--@include: ../../snippets/api/security-verify.md-->
