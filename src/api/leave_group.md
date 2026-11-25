# leave_group

主动退出指定群聊。仅执行退群操作，不会解散群聊。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "leave_group",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `group_id` | number | 是 | 群聊 ID，必须为大于 `0` 的整数 |

该接口仅支持主动退群，不用于解散群聊。若当前账号不在目标群内、为群主或受 QQ 服务端限制，是否允许退群及具体错误原因以服务端返回为准。

## 返回值

成功时外层为 `ok: true`，`data` 为：

```json
{
  "success": true
}
```

参数无效、Bot 未在线或服务端拒绝时，返回 `ok: false`，`error` 包含原因。
