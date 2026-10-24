# upload_friend_image

上传好友聊天图片，并返回可直接传给 `send_friend_msg` 的图片消息段。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "upload_friend_image",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890,
    "file_path": "file:///D:/images/example.png"
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/upload_friend_image' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "user_id": 234567890,
  "file_path": "file:///D:/images/example.png"
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `user_id` | number | 是 | 目标好友 QQ 号 |
| `file_path` | string | 是 | 后端可访问的本地路径、`file://` 或 HTTP(S) 地址 |

## 返回值

```js
{ type: 'image', data: { file_id: 'FILE_ID', url: 'https://...' } }
```

`url` 暂不可用时为空字符串；发送只需要 `file_id`。媒体元数据在本地缓存 5 分钟，见[媒体有效期](/guide/message-segments#媒体有效期)。

## 发送

上传只返回图片消息段，不会发出消息。把返回的 `data` 原样放进 [`send_friend_msg`](/api/send_friend_msg) 的 `message` 数组：

```json
{
  "type": "action",
  "id": "1",
  "action": "send_friend_msg",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890,
    "message": [
      {
        "type": "image",
        "data": {
          "file_id": "FILE_ID"
        }
      }
    ]
  }
}
```
