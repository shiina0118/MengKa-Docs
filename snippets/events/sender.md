## sender（Sender） {#sender}

好友消息中的 `receiver` 也使用此结构。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_id` | number | 用户 QQ 号 |
| `nickname` | string | 用户昵称 |
| `card` | string | 群名片，可能省略 |
| `role` | number | 群角色，可能省略 |
| `title` | string | 群头衔，可能省略 |
| `level` | number | 群等级，可能省略 |

`card`、`role`、`title` 和 `level` 按消息类型与可用数据决定是否出现。
