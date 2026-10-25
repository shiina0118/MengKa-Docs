# qmate_hatch

执行聊天精灵孵化。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "qmate_hatch",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号协议 ID，与 self_id 共同定位实例；允许为 0 |
| `user_id` | number | 是 | 另一位合养用户的 QQ 号，必须大于 0，不接受 UID |

## 返回值

以下为响应 `data` 字段。`ok: true` 表示已取得并解析服务端响应，还需检查 `data.success`。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 请求成功时为 true；有额外业务结果的接口还需检查相应字段 |
| `error_code` | number | 请求结果码，成功时为 0 |
| `error_message` | string | 失败说明，空字符串时省略 |

服务端拒绝请求时，外层为 `ok: true`，`data.success` 为 `false`。参数无效、Bot 未在线、请求失败、响应损坏时，返回 `ok: false`。


先通过 [`qmate_get_info`](/api/qmate_get_info) 查询精灵与孵化状态，在满足服务端孵化条件后调用。成功后重新查询信息获取最新状态。
