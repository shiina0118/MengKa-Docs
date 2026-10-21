# upload_red_packet_voice

上传语音红包的口令录音，获取匹配结果。本接口只做匹配，不发送群语音，也不领取红包。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "upload_red_packet_voice",
  "params": {
    "red_packet": {
      "listid": "LISTID_FROM_RED_PACKET",
      "authkey": "AUTHKEY_FROM_RED_PACKET",
      "title": "你好",
      "channel": 65536,
      "pay_flag": 0,
      "hb_from": 0
    },
    "self_id": 123456789,
    "protocol_id": 0,
    "sender_id": 234567890,
    "file_path": "file:///D:/audio/example.mp3"
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/upload_red_packet_voice' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "red_packet": {
    "listid": "LISTID_FROM_RED_PACKET",
    "authkey": "AUTHKEY_FROM_RED_PACKET",
    "title": "你好",
    "channel": 65536,
    "pay_flag": 0,
    "hb_from": 0
  },
  "self_id": 123456789,
  "protocol_id": 0,
  "sender_id": 234567890,
  "file_path": "file:///D:/audio/example.mp3"
}'
```

`red_packet` 使用收到的红包消息段完整 `data`；上面的标识和凭据为占位值。

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `sender_id` | number | 是 | 红包发送者 QQ 号 |
| `red_packet` | object | 是 | 收到的语音红包消息段 `data`，保留完整对象供后续领取使用 |
| `red_packet.listid` | string | 是 | 红包列表 ID |
| `red_packet.title` | string | 是 | 需要朗读的口令 |
| `file_path` | string | 是 | 后端可访问的本地路径、`file://`、HTTP(S) 地址，或 `base64://` / Base64 data URL |

录音应与口令一致。支持 MP3、WAV 和 QQ Silk 文件。

也可以用 `base64` 参数提供音频，必须与 `file_path` 二选一；或者将 `base64://…`、`data:audio/wav;base64,…` 作为 `file_path` 传入。

单条请求的完整 JSON 按 UTF-8 计算不得超过 **4 MiB（4,194,304 字节）**。Base64 会增大体积，3 MiB 的原始音频加上请求字段后就会超限。较大音频请使用后端可访问的 HTTP(S) 地址或后端本地路径。详见[请求大小限制](/guide/protocol#请求大小限制)。

## 返回值

```js
{
  status: 1,
  degree: 'OPAQUE_MATCH_RESULT',
  voice_rate_id: 'OPAQUE_MATCH_RESULT',
  matched: true,
}
```

`matched` 为 `true` 时，将 `voice_rate_id` 原样传给领取接口，无需自行构造或解析。`matched` 为 `false` 时不能继续领取。

完整调用顺序见 [`grab_group_voice_red_packet`](/api/grab_group_voice_red_packet)。处理耗时较长，客户端等待响应的时间建议不少于 5 分钟。
