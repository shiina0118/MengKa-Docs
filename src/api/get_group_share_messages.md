# get_group_share_messages

获取服务端向当前账号开放的群共享历史消息，适用于刚加入群后读取允许查看的历史记录。可获取的范围由服务端决定，不保证能读取全部入群前消息。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "get_group_share_messages",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 1058655525
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_group_share_messages' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{"self_id":123456789,"protocol_id":0,"group_id":1058655525}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 与 `self_id` 共同定位账号实例，允许为 `0` |
| `group_id` | number | 是 | 群号，必须大于 `0` |

## 返回值

成功响应中的 `data`：

```json
{
  "group_id": 1058655525,
  "messages": [
    {
      "msg": {
        "uid": "72057594037927936",
        "seq": 12345,
        "random": 123456789,
        "time": 1792684800
      },
      "sender": {
        "user_id": 234567890,
        "nickname": "小明",
        "card": "技术组小明"
      },
      "message": [
        { "type": "text", "data": { "text": "大家好" } }
      ],
      "alt_message": "大家好"
    }
  ],
  "failed_seqs": []
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `group_id` | number | 查询的群号 |
| `messages` | [HistoryMessage[]](#history-message) | 按 `msg.seq` 升序排列；无记录时为 `[]` |
| `failed_seqs` | number[] | 服务端报告的获取失败消息序号；没有时为 `[]` |

### messages[]（HistoryMessage） {#history-message}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `msg` | [Msg](#msg) | 消息 UID、序号、随机数和发送时间 |
| `sender` | [Sender](#sender) | 发送者；字段结构与实时群消息一致 |
| `message` | [Segment[]](#segment) | 消息段，与实时群消息使用相同解析方式；无可识别消息段时为 `[]` |
| `alt_message` | string | 文本摘要，无摘要时为 `""` |

`sender.nickname` 只返回共享记录中的真实网名，未知时为 `""`。`sender.card` 使用历史消息明确携带的群名片；消息未提供名片字段时，读取当前 Bot、当前群的名片记录。名片为空时省略，不使用网名补齐。客户端展示时可依次取 `card`、`nickname`、`user_id`。

不会逐条请求群成员资料；缺少 QQ 号且本地无对应缓存时，`sender.user_id` 为 `0`。

文字、图片、语音、视频、表情、回复和 ARK 等复用现有消息段。媒体 URL 会尽可能补齐，获取失败时仍保留消息段，URL 字段可能省略。

部分消息拉取失败时，仍返回成功响应，已获取记录在 `messages` 中，失败序号在 `failed_seqs` 中。SSO 整体失败、响应解析失败或请求超时，沿用统一的 `ok: false`、`error` 响应。

本接口不提供分页游标，也不接受消息序号范围。历史记录仅通过 API 返回，不触发 `group_message` 事件、不增加接收消息计数。重复调用可能返回相同记录，可按群号和 `msg.seq` 去重。

<!--@include: ../../snippets/events/msg.md-->

<!--@include: ../../snippets/events/sender.md-->

<!--@include: ../../snippets/events/segments.md-->
