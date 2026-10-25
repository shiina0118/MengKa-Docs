# qmate_accept_invite

接受另一位用户发起的聊天精灵合养邀请。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "qmate_accept_invite",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890,
    "qmate_type": 1
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号协议 ID，与 self_id 共同定位实例；允许为 0 |
| `user_id` | number | 是 | 邀请方 QQ 号；self_id 应为接受邀请的 Bot，双方不能颠倒 |
| `qmate_type` | number | 否 | 默认 1，必须与收到的邀请一致；正 int32 整数 |

## 返回值

以下为响应 `data` 字段。`ok: true` 表示已取得并解析服务端响应，还需检查 `data.success`。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 请求成功时为 true；有额外业务结果的接口还需检查相应字段 |
| `error_code` | number | 请求结果码，成功时为 0 |
| `error_message` | string | 失败说明，空字符串时省略 |

服务端拒绝请求时，外层为 `ok: true`，`data.success` 为 `false`。参数无效、Bot 未在线、请求失败、响应损坏时，返回 `ok: false`。


## 使用流程

邀请方先获取 ARK、发送卡片并调用 [`qmate_confirm_invite`](/api/qmate_confirm_invite)。接受方可先通过 [`qmate_get_adoption_info`](/api/qmate_get_adoption_info) 查询待接受邀请，再调用本接口。

接受邀请后，可通过 [`qmate_get_info`](/api/qmate_get_info) 获取最新精灵状态。后续孵化是否可进行由服务端状态决定。
