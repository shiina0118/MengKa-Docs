# 成员退出

以事件帧推送，`post_type` 为 `group_notice`，`sub_type` 为 `decrease`。需要在认证时声明 `group_event` 权限。

所有事件都包含 `self_id`、`protocol_id` 和 `post_type`，详见[事件概述](/events/#公共字段)。

## 事件内容

成员主动退群或被移出群时推送。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | Bot QQ 号 |
| `protocol_id` | number | 接收账号的协议 ID，允许为 `0` |
| `post_type` | string | 固定为 `group_notice` |
| `sub_type` | string | 固定为 `decrease` |
| `group_id` | number | 群聊 ID |
| `group_name` | string | 群聊名称，可能省略 |
| `user_id` | number | 离群成员的 QQ 号 |
| `nickname` | string | 离群成员的昵称 |
| `operator_id` | number | 操作者 QQ 号，主动退群或无可用数据时可能省略 |
| `operator_nickname` | string | 操作者昵称，主动退群或无可用数据时可能省略 |
| `request_id` | number | 对应请求 ID |
| `request_type` | number | 对应请求类型 |
