# ntlogin_get_security_verify_methods

查询 NT 账号（`nt: 1`）当前安全验证原因和可用验证方式。WT 账号的短信提示查询见 [`wtlogin_get_security_verify_methods`](/api/wtlogin_get_security_verify_methods)，模式不匹配时返回 `ok: false`。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "ntlogin_get_security_verify_methods",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在等待安全验证的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

## 返回值

成功结果包含以下字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `reason` | object | 当前需要验证的原因，`reason.prompt` 可展示给用户 |
| `methods` | object | 当前可用的验证方式，结构见下方 SecurityVerify |
| `next` | string | 固定为 `security`，账号仍在等待安全验证 |

查询失败时返回 `{ code, message, next: "security" }`，账号仍在等待安全验证，可以重新查询。

### NT 响应示例

```js
{
  reason: {
    prompt: '当前账号需要安全验证',
  },
  methods: {
    prompt: '请选择验证方式',
    verify_list: [4, 10],
    sms_phone: {
      sign: 'SMS_SIGN',
    },
  },
  next: 'security',
}
```

<!--@include: ../../snippets/api/security-verify.md-->

完整流程见[Bot 登录流程](/guide/login-flow)。
