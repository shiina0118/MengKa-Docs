# 群聊消息

以事件帧推送，`post_type` 为 `group_message`。需要在认证时声明 `group_message` 权限。

所有事件都包含 `self_id`、`protocol_id` 和 `post_type`，详见[事件概述](/events/#公共字段)。

## 事件内容

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | Bot QQ 号 |
| `protocol_id` | number | 接收账号的协议 ID，允许为 `0` |
| `post_type` | string | 固定为 `group_message` |
| `group_id` | number | 群聊 ID |
| `group_name` | string | 群聊名称，可能省略 |
| `msg` | [Msg](#msg) | 消息标识 |
| `sender` | [Sender](#sender) | 发送者 |
| `message` | [Segment[]](#segment) | 结构化消息段 |
| `alt_message` | string | 消息文本摘要 |
| `source` | string | 消息来源，可能省略 |

点击类型列可查看本页对应的嵌套字段表。

图片段的 `data` 包含 `file_id` 和 `url`；语音、视频段的 `data` 只包含 `file_id`。收到群语音、群视频时不会立即查询下载地址，需要地址时分别调用 [`get_group_voice_url`](/api/get_group_voice_url) 或 [`get_group_video_url`](/api/get_group_video_url)。

例如，群语音事件中的 `message` 为：

```json
[{ "type": "voice", "data": { "file_id": "VOICE_FILE_ID" } }]
```

群视频事件中的 `message` 为：

```json
[{ "type": "video", "data": { "file_id": "VIDEO_FILE_ID" } }]
```

## 名称示例

事件 `data.sender` 的示例：

```json
{
  "user_id": 234567890,
  "nickname": "小明",
  "card": "技术组小明"
}
```

客户端可显示“技术组小明”。没有群名片时省略 `card`，展示使用“小明”。群消息不会把好友备注放入 `nickname` 或 `card`。

<!--@include: ../../snippets/events/msg.md-->

<!--@include: ../../snippets/events/sender.md-->

<!--@include: ../../snippets/events/segments.md-->
