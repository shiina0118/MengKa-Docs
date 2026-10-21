# send_friend_msg

发送好友消息。

## 调用

<ApiCallTabs>
<template #websocket>

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

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/send_friend_msg' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
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
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `user_id` | number | 是 | 好友 QQ 号 |
| `message` | Segment[] | 是 | 消息段数组，当前支持 `text` 和 `image` |

## 返回值

```js
{ success: true, msg_seq: 123, msg_random: 456 }
```

`user_id` 必须使用 QQ 号，不接受 UID。
