# get_friend_video_url

获取好友视频和封面的下载 URL。收到消息后，需要下载视频或封面时调用此接口。

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

群视频请使用 [`get_group_video_url`](/api/get_group_video_url)。

## 返回值

```js
{
  file_id: 'FILE_ID',
  url: 'https://...',
  thumb_url: 'https://...',
}
```

一次调用同时返回视频地址 `url` 和封面地址 `thumb_url`。原消息没有封面时，`thumb_url` 为空字符串；封面查询失败时接口返回错误。好友视频消息段只包含 `file_id`。

请在收到消息后的 5 分钟内使用 `file_id` 查询；重启不影响未过期的标识。标识过期或资源失效后，需要重新获取。

当前 `send_friend_msg` 尚不支持发送视频段。
