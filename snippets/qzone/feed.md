## 好友动态（QzoneFeed） {#qzone-feed}

`get_qzone_friend_feeds` 和 `publish_qzone_feed` 返回的动态结构。点赞和取消点赞时，请把整个对象原样传回。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `app_id` | number | 动态应用标识 |
| `user_id` | number | 发布者 QQ 号 |
| `nickname` | string | 发布者昵称 |
| `create_time` | number | 发布时间 |
| `feed_id` | string | 动态标识 |
| `feeds_key` | string | 动态操作键 |
| `url` | string | 动态地址 |
| `text` | string | 按顺序拼接所有正文摘要片段，保留原始空间表情标记和 Unicode emoji；转发动态为转发时附带的文字 |
| `segments` | QzoneFeedSegment[] | 按正文顺序排列的文本、空间表情和 @ 提及片段；无正文时为 `[]` |
| `heat` | number | 可选，动态热度（浏览计数），服务端未返回或值为负时省略，明确返回 `0` 时保留 |
| `like_count` | number | 可选，服务端返回的点赞总数；缺失或普通动态计数为负时省略，明确返回 `0` 时保留 |
| `orig_uin` | number | 互动信息中的原始 QQ 号，有值时出现 |
| `orig_tid` | string | 互动信息中的原始动态 ID，有值时出现 |
| `interaction` | string | 动态互动信息，标准 Base64 字符串，有值时出现；点赞时原样回传 |
| `forward` | [QzoneFeed](#qzone-feed) | 被转发的原动态，非转发动态时省略 |

`heat` 表示该动态的热度（浏览计数），不是点赞、评论或转发数的合计。API 返回完整数字，例如 `"heat": 12345`，不转换为“1.2万”等显示文本。只有响应中携带对应字段时才返回，省略不代表热度为 0；转发原文和发布返回也按同一规则读取各自的数据。

`like_count` 表示点赞总数，不等于返回的点赞名单人数。转发动态顶层的 `like_count` 属于这条转发动态，`forward.like_count` 属于被转发的原文，原文没有计数信息时省略 `forward.like_count`。发布成功返回的 `feed` 也会在携带计数时返回该字段。

### 正文、表情与 @ 提及片段

`segments` 中，`type: "text"` 的 `text` 是普通文本（包含 Unicode emoji）；`type: "emoji"` 表示 `[em]e数字[/em]` 格式的空间表情，`text` 保留原始标记，`code` 是空间表情代码，`url` 是表情图片地址。空间表情代码与 QQ 聊天表情 ID 不通用。

例如 `text` 为 `你好😀[em]e10011[/em]！` 时：

```json
[
  { "type": "text", "text": "你好😀" },
  {
    "type": "emoji",
    "text": "[em]e10011[/em]",
    "code": "e10011",
    "url": "https://qzonestyle.gtimg.cn/qzone/em/e10011@2x.gif#kp=1"
  },
  { "type": "text", "text": "！" }
]
```

显示正文时依次渲染片段，文本使用文本节点，表情使用图片；图片加载失败时可回退到该片段的 `text`。未知格式原样保留为文本，符合标记格式的代码会生成图片地址，但不保证资源存在。`forward` 中的原动态采用同样的解析规则。

空间 @ 标记 `@{uin:123456789,nick:小明,who:1,auto:1}` 会解析为：

```json
{
  "type": "mention",
  "text": "@{uin:123456789,nick:小明,who:1,auto:1}",
  "user_id": 123456789,
  "nickname": "小明"
}
```

`text` 保留原始标记，`user_id` 是被提及者的 QQ 号，`nickname` 是经过 URL 解码的昵称，空昵称时省略。显示时使用 `@` 加昵称，昵称为空则使用 QQ 号。兼容 `nick` 和 `nickname` 两种字段名，以及标记跨正文摘要片段的情况；昵称中的 `%2C`、`%7B` 等转义会还原。普通 `@小明` 无法确定 QQ 号，保留为文本；`who` 为 `2`、`3` 等其他账号类型的标记也保留为文本。好友动态、转发原文和发布返回采用相同规则。
