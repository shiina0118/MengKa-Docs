# 消息事件

## 群聊消息

```js
api.on('group_message', event => {
  console.log(event.group_name, event.sender.nickname)
  console.log(event.message)
})
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | Bot QQ 号 |
| `post_type` | string | 固定为 `group_message` |
| `group_id` | number | 群聊 ID |
| `group_name` | string | 群聊名称，可能省略 |
| `msg` | object | 消息标识 |
| `sender` | object | 发送者 |
| `message` | Segment[] | 结构化消息段 |
| `alt_message` | string | 消息文本摘要 |
| `source` | string | 消息来源，可能省略 |

## 好友消息

```js
api.on('friend_message', event => {
  console.log(event.sender.user_id, event.alt_message)
})
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | Bot QQ 号 |
| `post_type` | string | 固定为 `friend_message` |
| `msg` | object | 消息标识 |
| `sender` | object | 发送者 |
| `receiver` | object | 接收者 |
| `message` | Segment[] | 结构化消息段 |
| `alt_message` | string | 消息文本摘要 |
| `source` | string | 消息来源，可能省略 |

## msg

```js
{
  uid: 0,
  seq: 123,
  random: 456,
  time: 1710000000,
}
```

| 字段 | 说明 |
| --- | --- |
| `uid` | 消息 UID |
| `seq` | 消息序列号 |
| `random` | 消息随机数 |
| `time` | Unix 秒时间戳 |

群聊消息的 `seq` 与 `random` 可用于撤回。

## sender

```js
{
  user_id: 123456789,
  nickname: '昵称',
  card: '群名片',
  role: 0,
  title: '头衔',
  level: 1,
}
```

`card`、`role`、`title` 和 `level` 按消息类型与可用数据决定是否出现。

## 消息段

消息段统一使用：

```js
{ type: 'text', data: { text: '你好' } }
```

完整类型与字段见[消息段](/guide/message-segments#接收消息段)。
