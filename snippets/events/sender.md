## sender（Sender） {#sender}

好友消息中的 `receiver` 也使用此结构。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_id` | number | 用户 QQ 号 |
| `nickname` | string | 用户真实网名；未知时为 `""`，不使用备注、群名片、QQ 号或 UID 替代 |
| `remark` | string | 当前 Bot 为该用户设置的好友备注；好友消息中有值时出现，为空时省略 |
| `card` | string | 当前 Bot 所在群内该用户的群名片；群消息中有值时出现，为空时省略 |
| `role` | number | 群角色，可能省略 |
| `title` | string | 群头衔，可能省略 |
| `level` | number | 群等级，可能省略 |

好友消息展示时优先使用 `remark`，其次使用 `nickname`；群消息优先使用 `card`，其次使用 `nickname`。两者都为空时，客户端可显示 `user_id`。这些展示规则不会改变推送字段的原始含义。

`remark` 按 `self_id + user_id` 区分，`card` 按 `self_id + group_id + user_id` 区分。`role`、`title` 和 `level` 按消息类型与可用数据决定是否出现。
