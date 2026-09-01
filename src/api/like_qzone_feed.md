# like_qzone_feed

点赞一条好友空间动态。

## 调用

```js
api.like_qzone_feed(self_id, platform, feed)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `feed` | object | 是 | `get_qzone_friend_feeds` 返回的完整动态对象 |

## 返回值

此 API 不等待响应，不返回 Promise。

```js
const { feeds } = await api.get_qzone_friend_feeds(self_id, platform)
api.like_qzone_feed(self_id, platform, feeds[0])
```

转发动态会根据 `feed.forward` 自动处理。
