# get_qzone_friend_feeds

分页获取好友空间动态。不传分页参数时获取最新一页；继续查询时，原样传回上一页返回的分页参数。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "get_qzone_friend_feeds",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_qzone_friend_feeds' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `attach_info` | string | 否 | 下一页游标；首包省略，翻页时传上一页返回的 `attach_info` |
| `refresh_id` | string | 否 | 分页会话标识；首包可省略，由后端生成。传 `attach_info` 时必须同时传上一页的 `refresh_id` |
| `last_feed_union_id` | string | 否 | 分页辅助标识，标准 Base64 字符串；翻页时原样传回上一页的同名字段，可为空字符串。非空时必须同时传 `attach_info` |

## 返回值

```js
{
  self_id: 123456789,
  feeds: [],
  total_count: 0,
  attach_info: 'NEXT_PAGE_CURSOR',
  has_more: true,
  refresh_id: '123456789_1710000000000',
  last_feed_union_id: 'CgRGRUVE',
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `feeds` | [QzoneFeed[]](#qzone-feed) / null | 好友动态列表，没有动态时为 `null` |
| `total_count` | number | 本次返回的动态数量 |
| `attach_info` | string | 供下一次请求使用的游标；不要解析、拼接或修改 |
| `has_more` | boolean | 是否还有后续页；为 `false` 时停止翻页 |
| `refresh_id` | string | 本次分页会话标识，后续请求保持不变 |
| `last_feed_union_id` | string | 下一页使用的 Base64 分页辅助标识；没有可用标识时为空字符串 |

`total_count` 是本页返回的数量，不是所有动态的总数。空页也可能有后续页，请以 `has_more` 判断是否结束。

## 查询下一页

首包请求保持上面的调用方式。收到成功响应后，将三个分页字段一起传回同一个账号实例：

```js
async function getPage(params) {
  const response = await fetch('http://127.0.0.1:3003/api/get_qzone_friend_feeds', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer TOKEN',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  const result = await response.json()
  if (!response.ok || !result.ok) throw new Error(result.error)
  return result.data
}

const account = { self_id: 123456789, protocol_id: 0 }
const firstPage = await getPage(account)

if (firstPage.has_more) {
  const secondPage = await getPage({
    ...account,
    attach_info: firstPage.attach_info,
    refresh_id: firstPage.refresh_id,
    last_feed_union_id: firstPage.last_feed_union_id,
  })
  console.log(secondPage.feeds)
}
```

WebSocket 使用相同的分页参数。查询更后面的页时，继续使用最近一页返回的三个字段；这是游标分页，不支持直接指定页码。重新获取最新一页时，省略分页参数，开始新的会话。

服务端拒绝请求或响应格式无效时返回 `ok: false` 和 `error`，不会将失败当作空列表。服务端返回的错误码和原因会包含在 `error` 中。

完整 feed 可直接传给点赞与取消点赞 API。

<!--@include: ../../snippets/qzone/feed.md-->
