# upload_friend_image

上传好友聊天图片，并返回可直接传给 `send_friend_msg` 的图片消息段。

## 调用

```js
const image = await api.upload_friend_image(
  self_id,
  platform,
  user_id,
  file_path,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `user_id` | number | 是 | 目标好友 QQ 号 |
| `file_path` | string | 是 | 后端可访问的本地路径、`file://` 或 HTTP(S) 地址 |

## 返回值

```js
{ type: 'image', data: { file_id: 'FILE_ID' } }
```

请在上传成功后 **2 分钟内**发送。超过期限或萌卡NT重启后需重新上传，`file_id` 不适合作为永久标识保存。见[媒体有效期](/guide/message-segments#媒体有效期)。

## 示例

```js
const image = await api.upload_friend_image(
  123456789,
  'android',
  234567890,
  'https://example.com/image.jpg',
)

await api.send_friend_msg(123456789, 'android', 234567890, [image])
```
