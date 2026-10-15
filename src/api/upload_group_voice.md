# upload_group_voice

上传群聊语音，并返回可直接发送的语音消息段。

## 调用

```js
const voice = await api.upload_group_voice(self_id, platform, group_id, file_path)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `group_id` | number | 是 | 目标群聊 ID |
| `file_path` | string | 是 | 后端本地路径、`file://`、HTTP(S) 音频地址，或 `base64://` / Base64 data URL |

输入支持 MP3、WAV 和 QQ Silk 文件。AAC/M4A、FLAC 等其他音频格式会返回不支持错误。

直接使用 WebSocket API 时，也可在 `params.base64` 中提供音频，必须与 `file_path` 二选一。SDK 使用 `file_path` 传入 `base64://…` 或 Base64 data URL。

单条请求的完整 JSON 按 UTF-8 计算不得超过 **4 MiB（4,194,304 字节）**。Base64 会增大体积，3 MiB 的原始音频加上请求字段后就会超限。较大音频请使用后端可访问的 HTTP(S) 地址或后端本地路径。详见[请求大小限制](/guide/protocol#请求大小限制)。

## 返回值

```js
{
  type: 'voice',
  data: {
    file_id: 'FILE_ID',
    duration: 5,
  },
}
```

返回段只能发送到上传时指定的群。请在上传成功后 **2 分钟内**发送；超过期限或萌卡NT重启后需重新上传。见[媒体有效期](/guide/message-segments#媒体有效期)。

## 示例

```js
const voice = await api.upload_group_voice(
  123456789,
  'android',
  987654321,
  'D:/voices/example.mp3',
)

await api.send_group_msg(123456789, 'android', 987654321, [voice])
```

插件与萌卡NT不在同一台主机时，可使用后端可访问的 HTTP(S) 地址；小文件也可按上述大小限制传入 Base64。
