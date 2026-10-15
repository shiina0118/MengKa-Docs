# upload_group_video

上传群聊 MP4 视频，并返回可直接发送的视频消息段。

## 调用

```js
const video = await api.upload_group_video(self_id, platform, group_id, file_path)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
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

请在上传成功后 **2 分钟内**发送。超过期限或萌卡NT重启后需重新上传，`file_id` 不适合作为永久标识保存。见[媒体有效期](/guide/message-segments#媒体有效期)。

## 示例

```js
const video = await api.upload_group_video(
  123456789,
  'android',
  987654321,
  'D:/videos/example.mp4',
)

await api.send_group_msg(123456789, 'android', 987654321, [video])
```

插件与萌卡NT不在同一台主机时，应传后端可访问的 HTTP(S) 地址。
