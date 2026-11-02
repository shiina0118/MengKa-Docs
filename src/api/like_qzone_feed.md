# like_qzone_feed

点赞一条好友空间动态，可选指定个性点赞样式。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "like_qzone_feed",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "feed": {},
    "like_style_id": 201807
  }
}
```

`feed` 需替换为 [`get_qzone_friend_feeds`](/api/get_qzone_friend_feeds) 返回的 `feeds` 中的完整动态对象，不要删减字段。不需要结果时可以省略 `id`，后端处理后不会回复。

示例使用样式 ID `201807`。普通点赞可省略 `like_style_id`，或传 `0`；使用个性点赞时只需传入样式 ID，无需提供样式配置。


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `feed` | [QzoneFeed](#qzone-feed) | 是 | `get_qzone_friend_feeds` 返回的完整动态对象 |
| `like_style_id` | number | 否 | 个性点赞样式 ID，使用正整数，范围 `1`～`2147483647`；省略或传 `0` 表示普通点赞 |

指定样式后，若样式不存在、配置获取失败或配置无效，会自动按普通点赞继续处理，不会仅因样式不可用而使点赞请求失败。`feed` 仍须提供完整动态对象。

## 返回值

请求带 `id` 时，成功返回 `data` 为 `null` 的 `action_result`，失败时返回 `ok: false` 和 `error`；省略 `id` 时不会收到任何回复。

返回值不区分是否使用了指定样式，成功响应不代表该样式已生效。

转发动态会根据 `feed.forward` 自动处理。

<!--@include: ../../snippets/qzone/feed.md-->
