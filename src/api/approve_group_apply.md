# approve_group_apply

同意入群申请。

## 调用

```js
const result = await api.approve_group_apply(
  self_id,
  platform,
  group_id,
  request_id,
  request_type,
  request_extra,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `group_id` | number | 是 | 群聊 ID |
| `request_id` | number | 是 | 请求 ID |
| `request_type` | number | 是 | 请求类型 |
| `request_extra` | number | 否 | 附加请求标识 |

实时 `group_notice/apply` 事件使用事件中的同名字段。通过 [`get_group_system_notifications`](/api/get_group_system_notifications#处理入群申请) 取得的通知则使用 `request_key.group_id`、`request_key.request_id`、`request_key.type`、`request_key.extra`，依次对应这四个参数。

## 返回值

成功返回：

```js
{ success: true, error_code: 0 }
```

处理失败时 Promise 拒绝，错误信息包含原因。
