# upload_group_forward_msg

上传文本合并转发消息，返回可通过 `send_group_msg` 发送的消息段。

## 调用

```js
const result = await api.upload_group_forward_msg(
  self_id,
  platform,
  group_id,
  messages,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
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

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 上传成功时为 `true`，调用失败时 Promise 拒绝 |
| `res_id` | string | 合并转发资源 ID |
| `message` | Segment[] | 包含转发卡片的消息段数组，可原样传给 `send_group_msg` |
| `uploaded_messages` | number | 实际上传的文本节点数量 |
| `discarded_messages` | number | 因没有文本内容而忽略的节点数量 |
| `discarded_segments` | number | 被忽略的非 `text` 消息段数量 |

节点的 `user_id` 必填；所有节点都没有可上传的文本时会报错。本接口只上传内容，仍须调用 `send_group_msg` 才会在群内发出转发卡片。

## 示例

```js
const forward = await api.upload_group_forward_msg(self_id, platform, group_id, messages)
await api.send_group_msg(self_id, platform, group_id, forward.message)
```
