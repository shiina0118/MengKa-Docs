# get_qzone_friend_feeds

获取好友空间首包中的最新动态。

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

## 返回值

```js
{
  self_id: 123456789,
  feeds: [],
  total_count: 0,
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `feeds` | [QzoneFeed[]](#qzone-feed) / null | 好友动态列表，没有动态时为 `null` |
| `total_count` | number | 本次返回的动态数量 |

完整 feed 可直接传给点赞与取消点赞 API。

<!--@include: ../../snippets/qzone/feed.md-->
