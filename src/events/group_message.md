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

<!--@include: ../../snippets/events/msg.md-->

<!--@include: ../../snippets/events/sender.md-->

<!--@include: ../../snippets/events/segments.md-->
