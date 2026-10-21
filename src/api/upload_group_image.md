# upload_group_image

上传群聊图片，并返回可直接发送的图片消息段。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "upload_group_image",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "file_path": "file:///D:/images/example.png"
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/upload_group_image' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "group_id": 987654321,
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
| `group_id` | number | 是 | 目标群聊 ID |
| `file_path` | string | 是 | 后端本地路径、`file://` 或后端可访问的 HTTP(S) 地址 |

## 返回值

```js
{ type: 'image', data: { file_id: 'FILE_ID' } }
```

请在上传成功后 **2 分钟内**发送。超过期限或 Meng Ka 重启后需重新上传，`file_id` 不适合作为永久标识保存。见[媒体有效期](/guide/message-segments#媒体有效期)。

## 发送

上传只返回图片消息段，不会发出消息。把返回的 `data` 原样放进 [`send_group_msg`](/api/send_group_msg) 的 `message` 数组：

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
        "type": "image",
        "data": {
          "file_id": "FILE_ID"
        }
      }
    ]
  }
}
```

插件与 Meng Ka 不在同一台主机时，不要传插件主机的本地路径；应传后端可访问的 HTTP(S) 地址。
