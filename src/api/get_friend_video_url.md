# get_friend_video_url

按需获取好友视频和封面的下载 URL。收到好友视频消息时，后端只缓存媒体元数据和查询所需的发送者信息，不立即请求下载 URL。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "get_friend_video_url",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "file_id": "FILE_ID"
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_friend_video_url' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{"self_id":123456789,"protocol_id":0,"file_id":"FILE_ID"}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 接收该消息的在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID；允许为 `0` |
| `file_id` | string | 是 | 收到的好友视频段中的 `file_id` |

发送者信息从缓存读取，无需提供 `user_id` 或 UID。群视频请使用 [`get_group_video_url`](/api/get_group_video_url)。

## 返回值

```js
{
  file_id: 'FILE_ID',
  url: 'https://...',
  thumb_url: 'https://...',
}
```

这是 URL 查询结果，不是消息段。同一次调用查询视频和封面。如果原消息没有封面 `file_id`，`thumb_url` 为空字符串；封面查询失败时接口返回错误。好友视频消息段仍只有 `file_id`。

媒体元数据的本地缓存有效期为 5 分钟，重启后未过期的记录仍可使用。旧缓存缺少发送者 UID 时，需要重新接收消息。当前 `send_friend_msg` 尚不支持发送视频段。
