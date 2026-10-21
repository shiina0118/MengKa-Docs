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

动态常用字段：

| 字段 | 说明 |
| --- | --- |
| `app_id` | 动态应用标识 |
| `user_id` | 发布者 QQ 号 |
| `nickname` | 发布者昵称 |
| `create_time` | 发布时间 |
| `feed_id` | 动态标识 |
| `feeds_key` | 动态操作键 |
| `url` | 动态地址 |
| `text` | 文本摘要 |
| `forward` | 转发动态信息，可能省略 |

完整 feed 可直接传给点赞与取消点赞 API。
