# reject_group_apply

拒绝入群申请。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "reject_group_apply",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "request_id": 123456,
    "request_type": 1,
    "reason": "暂不接受入群申请",
    "request_extra": 0
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `group_id` | number | 是 | 群聊 ID |
| `request_id` | number | 是 | 请求 ID |
| `request_type` | number | 是 | 请求类型 |
| `reason` | string | 否 | 拒绝理由 |
| `request_extra` | number | 否 | 附加请求标识 |

实时 `group_notice/apply` 事件使用事件中的同名字段。通过 [`get_group_system_notifications`](/api/get_group_system_notifications#处理入群申请) 取得的通知则使用 `request_key.group_id`、`request_key.request_id`、`request_key.type`、`request_key.extra`。`reason` 仍由调用方填写。

## 返回值

成功返回：

```js
{ success: true, error_code: 0 }
```

处理失败时返回 `ok: false`，`error` 包含原因。
