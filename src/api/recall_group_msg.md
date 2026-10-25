# recall_group_msg

撤回群聊消息。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "recall_group_msg",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "msg_seq": 123,
    "msg_random": 456
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `group_id` | number | 是 | 群聊 ID |
| `msg_seq` | number | 是 | 消息序列号 |
| `msg_random` | number | 是 | 消息随机数 |

消息标识可来自 `send_group_msg` 返回值、群聊消息事件或撤回事件。

## 返回值

```js
{ success: true }
```
