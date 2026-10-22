# recall_friend_msg

撤回当前 Bot 自己发送给好友的私聊消息。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "recall_friend_msg",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890,
    "msg_seq": 123,
    "msg_random": 456,
    "client_seq": 789,
    "msg_time": 1700000000
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/recall_friend_msg' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "user_id": 234567890,
  "msg_seq": 123,
  "msg_random": 456,
  "client_seq": 789,
  "msg_time": 1700000000
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `user_id` | number | 是 | 接收原消息的好友 QQ 号，不接受 UID |
| `msg_seq` | number | 是 | 原消息的服务端序号 |
| `msg_random` | number | 是 | 原消息随机数 |
| `client_seq` | number | 是 | 原消息的客户端序号，与 `msg_seq` 不同 |
| `msg_time` | number | 是 | 原消息的 Unix 秒时间戳，必须大于 `0` |

四个消息字段均使用同一次 [`send_friend_msg`](/api/send_friend_msg) 成功返回的值，不能重新生成或将 `msg_time` 替换为当前时间。`msg_seq`、`msg_random`、`client_seq` 即使为 `0` 也必须显式传入；四个消息字段均为 uint32 范围内的整数。

## 返回值

```js
{ success: true }
```

服务端返回的撤回失败原因会作为接口错误返回。超出撤回时限等情况由服务端判定。
