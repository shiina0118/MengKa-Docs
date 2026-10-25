# delete_account

删除当前插件所属节点下的离线账号。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "delete_account",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 当前节点下的账号 QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

## 返回值

成功时 `data` 为 `null`：

```json
{ "type": "action_result", "id": "1", "ok": true, "data": null }
```

失败时 `action_result` 为 `ok: false`，`error` 为错误原因。
