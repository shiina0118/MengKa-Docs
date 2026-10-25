# get_group_video_url

使用收到的群视频消息段或 `upload_group_video` 返回的 `file_id` 获取视频和封面的下载 URL。视频段本身不包含下载地址。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "get_group_video_url",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "file_id": "FILE_ID"
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID；允许为 `0` |
| `file_id` | string | 是 | 收到或上传的群视频段中的 `file_id` |
| `group_id` | number | 否 | 视频所属群号，通常可省略；接口提示缺少群号时须提供 |

## 返回值

```js
{
  file_id: 'FILE_ID',
  url: 'https://...',
  thumb_url: 'https://...',
}
```

这是 URL 查询结果，不是消息段。同一次调用查询视频和封面。如果原消息未提供封面，`thumb_url` 为空字符串；封面查询失败时接口返回错误。群视频消息段仍只有 `file_id`，发送时无需先调用此接口。`file_id` 有效期为 5 分钟，过期后需重新获取或上传，见[媒体有效期](/guide/message-segments#媒体有效期)。
