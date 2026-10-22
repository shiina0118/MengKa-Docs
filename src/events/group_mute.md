# 成员禁言

以事件帧推送，`post_type` 为 `group_notice`，`sub_type` 为 `mute`。需要在认证时声明 `group_event` 权限。

所有事件都包含 `self_id`、`protocol_id` 和 `post_type`，详见[事件概述](/events/#公共字段)。

## 事件内容

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | Bot QQ 号 |
| `protocol_id` | number | 接收账号的协议 ID，允许为 `0` |
| `post_type` | string | 固定为 `group_notice` |
| `sub_type` | string | 固定为 `mute` |
| `group_id` | number | 群聊 ID |
| `group_name` | string | 群聊名称，可能省略 |
| `operator` | [EventUser](#event-user) | 操作者 |
| `target` | [EventUser](#event-user) | 被禁言或解除禁言的成员 |
| `body` | [GroupMuteBody](#body) | 禁言状态，见下表 |

### body（GroupMuteBody） {#body}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `duration` | number | 禁言时长，单位为秒；为 `0` 表示解除禁言 |
| `status` | boolean | 当前是否处于禁言状态；`true` 为禁言，`false` 为解除禁言 |
| `op_suffix` | string | 操作补充文案，有值时出现 |
| `xml_tip` | string | 原始 XML 提示，有值时出现 |

<!--@include: ../../snippets/events/event-user.md-->
