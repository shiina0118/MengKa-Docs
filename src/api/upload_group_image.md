# upload_group_image

上传群聊图片，并返回可直接发送的图片消息段。

## 调用

```js
const image = await api.upload_group_image(
  self_id,
  group_id,
  file_path,
  name,
  image_type,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 目标群聊 ID |
| `file_path` | string | 是 | 后端本地路径、`file://` 或后端可访问的 HTTP(S) 地址 |
| `name` | string | 否 | 文件名，默认使用图片 MD5 |
| `image_type` | number | 否 | 图片类型，默认 `1000` |

## 返回值

```js
{ type: 'image', data: { file_id: 'FILE_ID' } }
```

## 示例

```js
const image = await api.upload_group_image(
  123456789,
  987654321,
  'D:/images/example.png',
)

await api.send_group_msg(123456789, 987654321, [image])
```

插件与萌卡NT不在同一台主机时，不要传插件主机的本地路径；应传后端可访问的 HTTP(S) 地址。
