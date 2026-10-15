# send_friend_msg

发送好友消息。

## 调用

```js
const result = await api.send_friend_msg(self_id, platform, user_id, message)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `user_id` | number | 是 | 好友 QQ 号 |
| `message` | Segment[] | 是 | 消息段数组，当前支持 `text` 和 `image` |

## 返回值

```js
{ success: true, msg_seq: 123, msg_random: 456 }
```

## 示例

```js
await api.send_friend_msg(123456789, 'android', 112233445, [
  { type: 'text', data: { text: '你好' } },
])
```

`user_id` 必须使用 QQ 号，不接受 UID。
