# send_friend_msg

发送好友消息。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "send_friend_msg",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890,
    "message": [
      {
        "type": "text",
        "data": {
          "text": "你好"
        }
      }
    ]
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `user_id` | number | 是 | 好友 QQ 号 |
| `message` | [Segment[]](/guide/message-segments#发送消息段) | 是 | 消息段数组，支持 `text`、`image` 和 `ark` |

## 发送 ARK 卡片

使用同一个 `send_friend_msg` 接口，将消息段类型设为 `ark`。`data` 支持完整 ARK JSON 对象，也支持服务端返回的 ARK JSON 字符串：

```js
{
  self_id: 123456789,
  protocol_id: 0,
  user_id: 234567890,
  message: [{ type: "ark", data: arkJson }]
}
```

`arkJson` 是完整卡片内容，必须包含非空字符串 `app`、`view`。请优先传入对应业务接口返回的完整卡片字符串，保留签名和其他字段，不要删减或重新拼装。

此接口只提供卡片发送功能。需要业务签名的卡片，应先取得对应业务返回的有效卡片；发送成功不保证卡片有效或能在 QQ 客户端正常展示。

## 返回值

```js
{ success: true, msg_seq: 123, msg_random: 456, client_seq: 789, msg_time: 1700000000 }
```

`user_id` 必须使用 QQ 号，不接受 UID。

保存同一次发送返回的 `msg_seq`、`msg_random`、`client_seq` 和 `msg_time`，可用于 [`recall_friend_msg`](/api/recall_friend_msg)。`msg_time` 是服务端返回的原消息 Unix 秒时间戳；返回 `0` 表示响应未提供时间，不能用当前时间替代后调用撤回。
