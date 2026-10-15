# get_group_forward_msg

获取群聊合并转发消息的完整内容。

## 调用

```js
const result = await api.get_group_forward_msg(
  self_id,
  platform,
  sender_id,
  res_id,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `sender_id` | number | 是 | 合并转发消息发送者 QQ 号 |
| `res_id` | string | 是 | 合并转发资源 ID |

## 返回值

```js
{
  res_id: 'RESOURCE_ID',
  messages: [{
    sender: { nickname: '示例用户', avatar: 'https://example.com/avatar.png' },
    time: 1710000000,
    message: [{ type: 'text', data: { text: '转发内容' } }],
  }],
}
```

`res_id` 通常来自收到的合并转发卡片消息段。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `res_id` | string | 返回的合并转发资源 ID |
| `messages` | object[] / null | 解析出的消息数组；未取得消息时可能为 `null`，读取时可用 `result.messages ?? []` |
| `messages[].sender.nickname` | string | 发送者昵称 |
| `messages[].sender.avatar` | string | 发送者头像地址 |
| `messages[].time` | number | 消息时间，Unix 秒 |
| `messages[].message` | Segment[] | 接收消息段数组，见[消息段](/guide/message-segments#接收消息段) |

返回的 `sender` 不包含发送者 QQ 号。返回节点与 `upload_group_forward_msg` 的输入格式不同，重新创建转发时需自行提供 `user_id` 等必填参数。
