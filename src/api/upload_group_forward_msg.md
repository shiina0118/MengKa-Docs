# upload_group_forward_msg

上传文本合并转发消息，返回可通过 `send_group_msg` 发送的消息段。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "upload_group_forward_msg",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "messages": [
      {
        "user_id": 234567890,
        "nickname": "示例用户",
        "time": 1710000000,
        "message": [
          {
            "type": "text",
            "data": {
              "text": "你好"
            }
          }
        ]
      }
    ]
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/upload_group_forward_msg' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "group_id": 987654321,
  "messages": [
    {
      "user_id": 234567890,
      "nickname": "示例用户",
      "time": 1710000000,
      "message": [
        {
          "type": "text",
          "data": {
            "text": "你好"
          }
        }
      ]
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
| `messages` | [ForwardNode[]](#messages) | 是 | 合并转发节点数组 |

### messages[]（ForwardNode） {#messages}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `user_id` | number | 是 | 节点显示的发送者 QQ 号 |
| `nickname` | string | 否 | 节点显示的发送者昵称 |
| `time` | number | 否 | 消息时间，Unix 秒；省略或为 `0` 时使用当前时间 |
| `message` | [Segment[]](/guide/message-segments#发送消息段) | 是 | 节点内容，只上传 `text` 消息段 |

节点示例：

```js
{
  user_id: 123456789,
  nickname: '示例用户',
  time: 1710000000,
  message: [{ type: 'text', data: { text: '内容' } }],
}
```

非 `text` 消息段会被忽略，没有文本内容的节点也会被忽略。

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 上传成功时为 `true`，调用失败时返回 `ok: false` |
| `res_id` | string | 合并转发资源 ID |
| `message` | [Segment[]](/guide/message-segments#合并转发) | 包含转发卡片的消息段数组，可原样传给 `send_group_msg` |
| `uploaded_messages` | number | 实际上传的文本节点数量 |
| `discarded_messages` | number | 因没有文本内容而忽略的节点数量 |
| `discarded_segments` | number | 被忽略的非 `text` 消息段数量 |

节点的 `user_id` 必填；所有节点都没有可上传的文本时会报错。本接口只上传内容，仍须调用 `send_group_msg` 才会在群内发出转发卡片。

## 发送

把返回的 `message` 原样作为 [`send_group_msg`](/api/send_group_msg) 的 `message` 参数：

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
        "type": "forward",
        "data": {
          "res_id": "RES_ID"
        }
      }
    ]
  }
}
```

上例中的消息段仅示意结构，请以实际返回的 `message` 为准。
