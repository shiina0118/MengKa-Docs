# send_group_msg

发送群聊消息。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "send_group_msg",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
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

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/send_group_msg' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "group_id": 987654321,
  "message": [
    {
      "type": "text",
      "data": {
        "text": "你好"
      }
    }
  ]
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `group_id` | number | 是 | 目标群聊 ID |
| `message` | [Segment[]](/guide/message-segments#发送消息段) | 是 | 消息段数组 |

支持 `text`、`at`、`image`、`voice`、`video` 和 `face` 等群聊消息段，详见[消息段](/guide/message-segments)。

`video` 必须作为消息数组中的唯一消息段单独发送。

## 返回值

```js
{
  success: true,
  msg_seq: 123,
  msg_random: 456,
  client_seq: 789,
  msg_time: 1700000000,
}
```

`msg_seq` 与 `msg_random` 可用于 [`recall_group_msg`](/api/recall_group_msg)。

领取文字口令红包时，将本次发送结果的 `client_seq` 填入 [`grab_red_packet`](/api/grab_red_packet) 的 `red_packet.client_seq`，同时传入 `msg_random`。
