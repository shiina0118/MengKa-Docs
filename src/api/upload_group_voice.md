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
| `file_path` | string | 是 | 后端本地路径、`file://` 或后端可访问的 HTTP(S) 音频地址 |

输入音频须为已支持的 MP3。后端使用纯 Go 解码、转换为单声道 24kHz PCM 后编码为 Silk，并生成语音波形。AAC/M4A、WAV、FLAC 等其他音频格式会返回未支持错误。

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

返回段只能发送到上传时指定的群。

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

插件与萌卡NT不在同一台主机时，应传后端可访问的 HTTP(S) 地址。
