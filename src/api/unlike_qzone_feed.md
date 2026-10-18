# unlike_qzone_feed

取消对好友空间动态的点赞。

## 调用

<ApiCallTabs>
<template #websocket>

```js
api.unlike_qzone_feed(self_id, platform, feed)
```

</template>
<template #http>

```js
const baseURL = 'http://127.0.0.1:3003'
const headers = {
  Authorization: 'Bearer TOKEN',
  'Content-Type': 'application/json',
}
const account = { self_id: 123456789, platform: 'android' }

// 先查询，保留服务端返回的完整动态对象。
const listResponse = await fetch(baseURL + '/api/get_qzone_friend_feeds', {
  method: 'POST', headers, body: JSON.stringify(account),
})
const list = await listResponse.json()
if (!listResponse.ok || !list.ok) throw new Error(list.error || '获取动态失败')
const feed = list.data.feeds[0]
if (!feed) throw new Error('当前没有可操作的动态')

const response = await fetch(baseURL + '/api/unlike_qzone_feed', {
  method: 'POST', headers,
  body: JSON.stringify({ ...account, feed }),
})
const result = await response.json()
if (!response.ok || !result.ok) throw new Error(result.error || '操作失败')
console.log(result.data)
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `feed` | object | 是 | `get_qzone_friend_feeds` 返回的完整动态对象 |

## 返回值

WebSocket SDK 不等待响应，不返回 Promise。HTTP 会等待后端处理并返回 `{ "ok": true, "data": null }`，失败时返回 `ok: false` 和 `error`。

```js
const { feeds } = await api.get_qzone_friend_feeds(self_id, platform)
api.unlike_qzone_feed(self_id, platform, feeds[0])
```
