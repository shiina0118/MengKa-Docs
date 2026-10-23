# 好友消息撤回

以事件帧推送，`post_type` 为 `friend_notice`，`sub_type` 为 `recall`。需要在认证时声明 `friend_event` 权限。

所有事件都包含 `self_id`、`protocol_id` 和 `post_type`，详见[事件概述](/events/#公共字段)。

## 事件内容

好友私聊消息撤回，包括当前账号在其他客户端撤回自己发送的消息。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | Bot QQ 号 |
| `protocol_id` | number | 接收账号的协议 ID，允许为 `0` |
| `post_type` | string | 固定为 `friend_notice` |
| `sub_type` | string | 固定为 `recall` |
| `user_id` | number | 私聊会话中好友的 QQ 号，无法解析时省略 |
| `user_uid` | string | 私聊会话中好友的 UID |
| `operator` | [EventUser](#event-user) | 原消息发送者；自己在其他客户端撤回时为当前 Bot |
| `body` | [FriendRecallBody](#body) | 撤回内容，见下表 |

### body（FriendRecallBody） {#body}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `msg_seq` | number | 原消息的服务端序号 |
| `client_seq` | number | 原消息的客户端序号，与 `msg_seq` 不能混用 |
| `msg_uid` | string | 原消息 UID 的十进制字符串，保留完整精度，与原消息事件的 `msg.uid` 相同 |
| `msg_time` | number | 原消息的 Unix 秒时间戳 |
| `msg_random` | number | 原消息随机数 |
| `prompt_text` | string | 撤回提示文案，通知提供且非空时出现 |
| `traceless` | boolean | 无痕撤回时为 `true`，否则省略 |
| `original` | [OriginalMessage](#original) | 原消息 |

与群消息使用相同的十分钟原消息缓存。缓存未命中或已经过期时，撤回事件仍会推送，`body.original.message` 包含一个 `text` 消息段，其 `data.text` 为“消息已过期”。

此事件不会通过服务器补查被撤回的原文。

主动撤回好友消息使用 [`recall_friend_msg`](/api/recall_friend_msg)。

<!--@include: ../../snippets/events/event-user.md-->

<!--@include: ../../snippets/events/original.md-->

<!--@include: ../../snippets/events/segments.md-->
