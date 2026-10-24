# get_group_voice_url

按需获取群语音的下载 URL。收到群语音消息或调用 `upload_group_voice` 时，后端只缓存媒体元数据，不立即请求下载 URL。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "get_group_voice_url",
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
curl --request POST 'http://127.0.0.1:3003/api/get_group_voice_url' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{"self_id":123456789,"protocol_id":0,"file_id":"FILE_ID"}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID；允许为 `0` |
| `file_id` | string | 是 | 收到或上传的群语音段中的 `file_id` |
| `group_id` | number | 否 | 旧缓存没有保存群号时填写；新缓存会自动读取群号 |

## 返回值

```js
{
  file_id: 'FILE_ID',
  url: 'https://...',
}
```

这是 URL 查询结果，不是消息段。URL 由本次调用向 QQ 查询；群语音消息段仍只有 `file_id`。发送时无需先调用此接口。媒体元数据的本地缓存有效期为 5 分钟。
