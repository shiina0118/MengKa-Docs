## original（OriginalMessage） {#original}

撤回事件中的原消息结构。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `message_id` | string | 原消息 UID 的十进制字符串，有值时出现 |
| `user_id` | number | 原消息发送者 QQ 号，无法解析时可能省略 |
| `user_name` | string | 原消息发送者名称，有值时出现 |
| `message` | [Segment[]](#segment) | 原消息的结构化消息段，有可用数据时出现；缓存未命中时可能包含“消息已过期”文本段 |
| `alt_message` | string | 原消息的文本摘要，有值时出现 |
