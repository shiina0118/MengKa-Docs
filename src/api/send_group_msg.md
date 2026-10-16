# send_group_msg

发送群聊消息。

## 调用

```js
const result = await api.send_group_msg(self_id, platform, group_id, message)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `group_id` | number | 是 | 目标群聊 ID |
| `message` | Segment[] | 是 | 消息段数组 |

支持 `text`、`at`、`image`、`voice`、`video` 和 `face` 等群聊消息段，详见[消息段](/guide/message-segments)。

`video` 必须作为消息数组中的唯一消息段单独发送。

## 返回值

```js
{
  success: true,
  msg_seq: 123,
  msg_random: 456,
  client_seq: 789,
}
```

`msg_seq` 与 `msg_random` 可用于 [`recall_group_msg`](/api/recall_group_msg)。

领取文字口令红包时，将本次发送结果的 `client_seq` 填入 [`grab_red_packet`](/api/grab_red_packet) 的 `red_packet.client_seq`，同时传入 `msg_random`。

## 示例

```js
await api.send_group_msg(123456789, 'android', 987654321, [
  { type: 'text', data: { text: '你好' } },
  { type: 'at', data: { user_id: 112233445 } },
])
```
