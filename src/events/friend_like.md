# 好友点赞

以事件帧推送，`post_type` 为 `friend_notice`，`sub_type` 为 `like`。需要在认证时声明 `friend_event` 权限。

所有事件都包含 `self_id`、`protocol_id` 和 `post_type`，详见[事件概述](/events/#公共字段)。

## 事件内容

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | Bot QQ 号 |
| `protocol_id` | number | 接收账号的协议 ID，允许为 `0` |
| `post_type` | string | 固定为 `friend_notice` |
| `sub_type` | string | 固定为 `like` |
| `operator` | [EventUser](#event-user) | 点赞者 |
| `body` | [FriendEventBody](#body) | 点赞内容，见下表 |

### body（FriendEventBody） {#body}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `text` | string | 点赞内容 |
| `count` | number | 点赞次数 |

<!--@include: ../../snippets/events/event-user.md-->
