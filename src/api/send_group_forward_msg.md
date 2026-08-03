# send_group_forward_msg

上传文本合并转发消息，返回可通过 `send_group_msg` 发送的消息段。

## 调用

```js
const result = await api.send_group_forward_msg(
  self_id,
  group_id,
  messages,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 目标群聊 ID |
| `messages` | object[] | 是 | 合并转发节点数组 |

节点结构：

```js
{
  user_id: 123456789,
  nickname: '示例用户',
  time: 1710000000,
  message: [{ type: 'text', data: { text: '内容' } }],
}
```

`time` 使用 Unix 秒。非 `text` 消息段会被忽略。

## 返回值

```js
{
  success: true,
  res_id: 'RESOURCE_ID',
  message: [],
  uploaded_messages: 1,
  discarded_messages: 0,
  discarded_segments: 0,
}
```

## 示例

```js
const forward = await api.send_group_forward_msg(self_id, group_id, messages)
await api.send_group_msg(self_id, group_id, forward.message)
```
