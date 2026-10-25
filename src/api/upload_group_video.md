# upload_group_video

上传群聊 MP4 视频，并返回可直接发送的视频消息段。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "upload_group_video",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "file_path": "file:///D:/videos/example.mp4"
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/upload_group_video' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "group_id": 987654321,
  "file_path": "file:///D:/videos/example.mp4"
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `group_id` | number | 是 | 目标群聊 ID |
| `file_path` | string | 是 | MP4 的后端本地路径、`file://` 或后端可访问的 HTTP(S) 地址 |

输入必须为普通 MP4 文件，建议使用 H.264、8 位、逐行扫描、4:2:0 的 SDR 视频。部分 HEVC 和 JPEG/PNG 视频也受支持，具体以接口结果为准。

分片 MP4、HDR、带旋转标记等视频暂不支持。文件格式或视频特性不受支持时，接口会返回错误，可更换符合要求的文件后重试。无需额外提供封面。

## 返回值

```js
{
  type: 'video',
  data: {
    file_id: 'FILE_ID',
  },
}
```

返回段可直接传给 `send_group_msg`，并应发送到上传时指定的群聊。视频必须作为唯一消息段单独发送。

需要视频和封面的下载地址时，另行调用 [`get_group_video_url`](/api/get_group_video_url)；发送不需要先获取 URL。`file_id` 有效期为 5 分钟，见[媒体有效期](/guide/message-segments#媒体有效期)。

## 发送

上传只返回视频消息段，不会发出消息。把返回的 `data` 原样放进 [`send_group_msg`](/api/send_group_msg) 的 `message` 数组：

```json
{
  "type": "action",
  "id": "1",
  "action": "send_group_msg",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "message": [
      {
        "type": "video",
        "data": {
          "file_id": "FILE_ID"
        }
      }
    ]
  }
}
```

插件与 Meng Ka 不在同一台主机时，应传后端可访问的 HTTP(S) 地址。
