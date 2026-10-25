# unlike_qzone_feed

取消对好友空间动态的点赞。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "unlike_qzone_feed",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "feed": {}
  }
}
```

`feed` 需替换为 [`get_qzone_friend_feeds`](/api/get_qzone_friend_feeds) 返回的 `feeds` 中的完整动态对象，不要删减字段。不需要结果时可以省略 `id`，后端处理后不会回复。


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `feed` | [QzoneFeed](#qzone-feed) | 是 | `get_qzone_friend_feeds` 返回的完整动态对象 |

## 返回值

请求带 `id` 时，成功返回 `data` 为 `null` 的 `action_result`，失败时返回 `ok: false` 和 `error`；省略 `id` 时不会收到任何回复。

<!--@include: ../../snippets/qzone/feed.md-->
