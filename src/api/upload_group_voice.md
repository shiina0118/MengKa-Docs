# upload_group_voice

上传群聊语音，并返回可直接发送的语音消息段。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "upload_group_voice",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "file_path": "file:///D:/audio/example.mp3"
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `group_id` | number | 是 | 目标群聊 ID |
| `file_path` | string | 是 | 后端本地路径、`file://`、HTTP(S) 音频地址，或 `base64://` / Base64 data URL |

输入支持 MP3、WAV 和 QQ Silk 文件。AAC/M4A、FLAC 等其他音频格式会返回不支持错误。

也可以用 `base64` 参数提供音频，必须与 `file_path` 二选一；或者将 `base64://…`、Base64 data URL 作为 `file_path` 传入。

单条请求的完整 JSON 按 UTF-8 计算不得超过 **4 MiB（4,194,304 字节）**。Base64 会增大体积，3 MiB 的原始音频加上请求字段后就会超限。较大音频请使用后端可访问的 HTTP(S) 地址或后端本地路径。详见[请求大小限制](/guide/protocol#请求大小限制)。

## 返回值

```js
{
  type: 'voice',
  data: {
    file_id: 'FILE_ID',
  },
}
```

返回段只能发送到上传时指定的群。需要下载地址时，另行调用 [`get_group_voice_url`](/api/get_group_voice_url)；发送不需要先获取 URL。`file_id` 有效期为 5 分钟，见[媒体有效期](/guide/message-segments#媒体有效期)。

## 发送

上传只返回语音消息段，不会发出消息。把返回的 `data` 原样放进 [`send_group_msg`](/api/send_group_msg) 的 `message` 数组：

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
        "type": "voice",
        "data": {
          "file_id": "FILE_ID"
        }
      }
    ]
  }
}
```

插件与 Meng Ka 不在同一台主机时，可使用后端可访问的 HTTP(S) 地址；小文件也可按上述大小限制传入 Base64。
