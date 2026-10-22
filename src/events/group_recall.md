# 群聊消息撤回

以事件帧推送，`post_type` 为 `group_notice`，`sub_type` 为 `recall`。需要在认证时声明 `group_event` 权限。

所有事件都包含 `self_id`、`protocol_id` 和 `post_type`，详见[事件概述](/events/#公共字段)。

## 事件内容

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | Bot QQ 号 |
| `protocol_id` | number | 接收账号的协议 ID，允许为 `0` |
| `post_type` | string | 固定为 `group_notice` |
| `sub_type` | string | 固定为 `recall` |
| `group_id` | number | 群聊 ID |
| `group_name` | string | 群聊名称，可能省略 |
| `operator` | [EventUser](#event-user) | 撤回操作者 |
| `target` | [EventUser](#event-user) | 被撤回消息的发送者 |
| `body` | [RecallBody](#body) | 撤回内容，见下表 |

### body（RecallBody） {#body}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `msg_seq` | number | 被撤回消息的序列号 |
| `msg_time` | number | 被撤回消息的 Unix 秒时间戳 |
| `msg_random` | number | 被撤回消息的随机数 |
| `prompt_text` | string | 撤回提示文案，有值时出现 |
| `original` | [OriginalMessage](#original) | 原消息；有可用数据时出现 |
| `operator_level` | number | 操作者群等级，为 `0` 时省略 |
| `operator_role` | number | 操作者群角色，为 `0` 时省略 |
| `operator_title` | string | 操作者群头衔，为空时省略 |

原消息使用两分钟缓存；缓存未命中或过期时，`body.original.message` 返回文本消息段“消息已过期”。

主动撤回群消息使用 [`recall_group_msg`](/api/recall_group_msg)。

<!--@include: ../../snippets/events/event-user.md-->

<!--@include: ../../snippets/events/original.md-->

<!--@include: ../../snippets/events/segments.md-->
