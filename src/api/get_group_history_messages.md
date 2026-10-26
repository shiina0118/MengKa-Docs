# get_group_history_messages

获取当前账号可以读取的普通群历史消息。群开启“加群用户默认可见聊天记录”后，可通过本接口请求入群前的历史；实际返回范围仍由服务端决定，不保证覆盖全部历史。

原 `get_group_share_messages` API 已移除，请改用本接口。新接口支持消息序号范围，返回值不再包含 `failed_seqs`。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "get_group_history_messages",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 1058655525
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 与 `self_id` 共同定位账号实例，允许为 `0` |
| `group_id` | number | 是 | 群号，必须大于 `0` |
| `begin_seq` | number | 否 | 起始消息序号，包含该序号；默认 `0` |
| `end_seq` | number | 否 | 结束消息序号，包含该序号；默认 `0` |

不传 `begin_seq`、`end_seq`，或两者都为 `0` 时，请求最近一页。指定范围时必须同时传入正整数，且 `begin_seq <= end_seq`。每次返回的数量由服务端决定。

消息序号可从实时群消息的 `msg.seq` 或本接口返回的记录中取得。以下参数查询序号 `12300` 到 `12345`，使用时替换为目标群的实际序号：

```json
{
  "self_id": 123456789,
  "protocol_id": 0,
  "group_id": 1058655525,
  "begin_seq": 12300,
  "end_seq": 12345
}
```

## 返回值

成功响应中的 `data`：

```json
{
  "group_id": 1058655525,
  "begin_seq": 12345,
  "end_seq": 12345,
  "all_msg_filtered": 0,
  "share_history_msg_flag": 0,
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
  ]
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `group_id` | number | 查询的群号 |
| `begin_seq` | number | 服务端返回的起始序号；未提供时为 `0` |
| `end_seq` | number | 服务端返回的结束序号；未提供时为 `0` |
| `all_msg_filtered` | number | 服务端返回的“消息全部被过滤”标记，原样返回 |
| `share_history_msg_flag` | number | 服务端返回的共享历史状态标记；与普通历史消息条数无关 |
| `messages` | [HistoryMessage[]](#history-message) | 按 `msg.seq` 升序排列；无记录时为 `[]` |

### messages[]（HistoryMessage） {#history-message}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `msg` | [Msg](#msg) | 消息 UID、序号、随机数和发送时间 |
| `sender` | [Sender](#sender) | 发送者；字段结构与实时群消息一致 |
| `message` | [Segment[]](#segment) | 消息段，与实时群消息使用相同解析方式；无可识别消息段时为 `[]` |
| `alt_message` | string | 文本摘要，无摘要时为 `""` |

`sender.nickname` 返回已知的发送者网名，未知时为 `""`。`sender.card` 使用历史消息明确携带的群名片；消息未提供名片字段时，使用当前已知的该群名片。名片为空时省略，不使用网名补齐。客户端展示时可依次取 `card`、`nickname`、`user_id`。

无法取得发送者 QQ 号时，`sender.user_id` 为 `0`。

文字、图片、语音、视频、表情、回复和 ARK 等复用现有消息段。图片会尝试补齐下载 URL，图片段始终包含 `file_id` 和 `url`，地址暂不可用时 `url` 为空字符串。语音、视频段只包含 `file_id`，拉取历史消息时不查询其 URL。需要群语音或群视频及封面的地址时，分别调用 [`get_group_voice_url`](/api/get_group_voice_url) 或 [`get_group_video_url`](/api/get_group_video_url)。

只有成功解析到目标群的有效响应，才返回 `ok: true`。有效响应可以包含空的 `messages`；服务端返回空响应、查询被拒绝、不是群成员、没有更多可取历史、响应解析失败或请求超时，都通过统一的 `ok: false`、`error` 返回，不能把这些错误当作空列表成功。

继续向前读取时，可将下一次 `end_seq` 设为本次返回的 `begin_seq - 1`，并指定更小的正数 `begin_seq`。只有返回的 `begin_seq > 1` 时才能这样翻页；遇到无更多历史的错误、返回范围不再前移或空记录时停止，避免反复请求同一区间。序号不保证连续，不要将范围宽度视为消息条数。

本接口获取普通群历史，不额外合并邀请入群时单独指定的共享记录。历史记录仅通过 API 返回，不触发 `group_message` 事件、不增加接收消息计数。重复调用可能返回相同记录，可按群号和 `msg.seq` 去重。

<!--@include: ../../snippets/events/msg.md-->

<!--@include: ../../snippets/events/sender.md-->

<!--@include: ../../snippets/events/segments.md-->
