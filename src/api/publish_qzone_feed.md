# publish_qzone_feed

发布一条 QQ 空间说说，支持文本、Unicode emoji、空间表情和 @ 提及。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "publish_qzone_feed",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "content": "你好，今天也要开心。",
    "visibility": 1,
    "self_delete_after_one_day": false,
    "declare_ai_generated": false
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `self_id` | number | 是 | - | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `content` | string | 条件必填 | - | 动态文本，不能只包含空白字符；与 `segments` 二选一，也可直接携带原始空间 @、表情标记 |
| `segments` | QzonePublishFeedSegment[] | 条件必填 | - | 按顺序排列的文本、@ 和空间表情片段；与 `content` 二选一，见下方示例 |
| `visibility` | number | 否 | `1` | `1` 所有人可见、`2` 好友可见、`5` 仅自己可见 |
| `self_delete_after_one_day` | boolean | 否 | `false` | 是否在一天后自动删除 |
| `declare_ai_generated` | boolean | 否 | `false` | 是否声明内容由 AI 生成 |

## 发布 @ 和表情

将上面调用中的 `content` 替换成 `segments`：

```json
{
  "self_id": 123456789,
  "protocol_id": 0,
  "segments": [
    { "type": "text", "text": "和 " },
    { "type": "mention", "user_id": 987654321, "nickname": "小明" },
    { "type": "text", "text": " 一起出门😀 " },
    { "type": "emoji", "code": "e10011" }
  ],
  "visibility": 1
}
```

| `type` | 输入字段 | 说明 |
| --- | --- | --- |
| `text` | `text` | 原样写入文本，支持换行和 Unicode emoji |
| `mention` | `user_id`、可选的 `nickname` | `user_id` 必须为非零 QQ 号；昵称省略或为空时使用 QQ 号。昵称直接填写原文，无需自行拼接或转义空间 @ 标记 |
| `emoji` | `code` | 空间表情代码，格式为 `e` 加数字，例如 `e10011`；兼容大小写并转为小写。QQ 小黄脸使用对应的空间表情代码，不能直接使用聊天 `face_id` |

片段按顺序拼接，不自动插入空格。`content` 和 `segments` 不能同时提供，片段列表不能是空列表或仅包含空白文本；未知片段类型、缺失 QQ 号或不符合格式的表情代码会返回参数错误。格式正确的表情代码不代表对应图片资源一定存在。

仍可直接使用 `content` 发送原始标记，例如：

```json
{
  "self_id": 123456789,
  "protocol_id": 0,
  "content": "和 @{uin:987654321,nick:小明,who:1,auto:1} 一起出门😀 [em]e10011[/em]"
}
```

普通 `@小明` 只会作为文本发送；需要提及具体账号时使用 `mention` 片段或带 QQ 号的空间标记。`/微笑`、`[微笑]` 等别名不自动转换为空间表情。成功响应中的 `feed.segments` 由服务端返回的正文解析得到。

## 返回值

```js
{
  self_id: 123456789,
  feed: {},
  client_feed_id: 'CLIENT_FEED_ID',
  server_time: 1710000000,
}
```

返回的 `feed` 可用于 `like_qzone_feed` 或 `unlike_qzone_feed`。

<!--@include: ../../snippets/qzone/feed.md-->
