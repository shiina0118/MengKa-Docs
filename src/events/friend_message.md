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

<!--@include: ../../snippets/events/msg.md-->

<!--@include: ../../snippets/events/sender.md-->

<!--@include: ../../snippets/events/segments.md-->
