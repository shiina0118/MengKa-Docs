## original（OriginalMessage） {#original}

撤回事件中的原消息结构。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `message_id` | string | 原消息 UID 的十进制字符串，有值时出现 |
| `user_id` | number | 原消息发送者 QQ 号，无法解析时可能省略 |
| `user_name` | string | 原消息发送者的真实网名；未知时省略，不填备注或群名片 |
| `remark` | string | 好友撤回事件中，当前 Bot 为原消息发送者设置的备注；为空时省略 |
| `card` | string | 群撤回事件中，原消息发送者在当前群的名片；为空时省略 |
| `message` | [Segment[]](#segment) | 原消息的结构化消息段，有可用数据时出现；缓存未命中时可能包含“消息已过期”文本段 |
| `alt_message` | string | 原消息的文本摘要，有值时出现 |

`user_name` 沿用原字段名，含义与事件参与人的 `nickname` 一致。好友原消息展示使用 `remark → user_name`，群原消息使用 `card → user_name`。
