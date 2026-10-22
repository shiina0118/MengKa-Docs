## 好友动态（QzoneFeed） {#qzone-feed}

`get_qzone_friend_feeds` 返回的动态结构。点赞和取消点赞时，请把整个对象原样传回。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `app_id` | number | 动态应用标识 |
| `user_id` | number | 发布者 QQ 号 |
| `nickname` | string | 发布者昵称 |
| `create_time` | number | 发布时间 |
| `feed_id` | string | 动态标识 |
| `feeds_key` | string | 动态操作键 |
| `url` | string | 动态地址 |
| `text` | string | 文本摘要；转发动态为转发时附带的文字 |
| `orig_uin` | number | 互动信息中的原始 QQ 号，有值时出现 |
| `orig_tid` | string | 互动信息中的原始动态 ID，有值时出现 |
| `interaction` | string | 动态互动信息，标准 Base64 字符串，有值时出现；点赞时原样回传 |
| `forward` | [QzoneFeed](#qzone-feed) | 被转发的原动态，非转发动态时省略 |
