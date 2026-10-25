# get_friend_voice_url

获取好友语音的下载 URL。收到消息后，需要下载语音时调用此接口。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "get_friend_voice_url",
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
| `self_id` | number | 是 | 接收该消息的在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID；允许为 `0` |
| `file_id` | string | 是 | 收到的好友语音段中的 `file_id` |

群语音请使用 [`get_group_voice_url`](/api/get_group_voice_url)。

## 返回值

```js
{
  file_id: 'FILE_ID',
  url: 'https://...',
}
```

返回 `file_id` 和下载地址 `url`。好友语音消息段只包含 `file_id`。

请在收到消息后的 5 分钟内使用 `file_id` 查询；重启不影响未过期的标识。标识过期或资源失效后，需要重新获取。

当前 `send_friend_msg` 尚不支持发送语音段。
