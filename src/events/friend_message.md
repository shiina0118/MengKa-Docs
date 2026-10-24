# 好友消息

以事件帧推送，`post_type` 为 `friend_message`。需要在认证时声明 `friend_message` 权限。

所有事件都包含 `self_id`、`protocol_id` 和 `post_type`，详见[事件概述](/events/#公共字段)。

## 事件内容

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | Bot QQ 号 |
| `protocol_id` | number | 接收账号的协议 ID，允许为 `0` |
| `post_type` | string | 固定为 `friend_message` |
| `msg` | [Msg](#msg) | 消息标识 |
| `sender` | [Sender](#sender) | 发送者 |
| `receiver` | [Sender](#sender) | 接收者 |
| `message` | [Segment[]](#segment) | 结构化消息段 |
| `alt_message` | string | 消息文本摘要 |
| `source` | string | 消息来源，可能省略 |

好友发来的群聊邀请会作为 `ark` 消息段出现，处理方式见
[`approve_group_invite`](/api/approve_group_invite)。

点击类型列可查看本页对应的嵌套字段表。

好友消息中的图片段包含 `file_id` 和 `url`；收到的语音、视频段只包含 `file_id`。需要下载地址时分别调用 [`get_friend_voice_url`](/api/get_friend_voice_url) 或 [`get_friend_video_url`](/api/get_friend_video_url)，视频接口同时返回视频和封面的 URL。

例如语音消息的 `message` 为：

```json
[{ "type": "voice", "data": { "file_id": "VOICE_FILE_ID" } }]
```

视频消息的 `message` 为：

```json
[{ "type": "video", "data": { "file_id": "VIDEO_FILE_ID" } }]
```

查询下载地址只需传入 `self_id`、`protocol_id` 和 `file_id`。当前 `send_friend_msg` 尚不支持发送语音、视频段。

## 名称示例

事件 `data` 中的发送者和接收者字段：

```json
{
  "sender": { "user_id": 234567890, "nickname": "小明", "remark": "项目同事" },
  "receiver": { "user_id": 123456789, "nickname": "我的账号" }
}
```

收到这条消息时可显示“项目同事”。如果该备注被清空，后续事件省略 `remark`，展示改用“小明”；`nickname` 始终保留真实网名。自己发送的消息中，对方信息位于 `receiver`，同样按此规则展示。

<!--@include: ../../snippets/events/msg.md-->

<!--@include: ../../snippets/events/sender.md-->

<!--@include: ../../snippets/events/segments.md-->
