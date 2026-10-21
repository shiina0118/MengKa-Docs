# grab_group_voice_red_packet

领取 `channel === 65536` 的群聊语音红包。须先上传匹配录音并发送群语音。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.grab_group_voice_red_packet(
  self_id,
  platform,
  group_id,
  sender_id,
  red_packet,
  voice_rate_id,
)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/grab_group_voice_red_packet' \
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
  "platform": "android",
  "group_id": 987654321,
  "sender_id": 234567890,
  "voice_rate_id": "VOICE_RATE_ID_FROM_MATCH_RESULT"
}'
```

`red_packet` 使用收到的红包消息段完整 `data`；上面的标识和凭据为占位值。 `voice_rate_id` 必须来自同一个语音红包的匹配成功结果，并在领取前完成群语音发送。

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `group_id` | number | 是 | 红包所在群号 |
| `sender_id` | number | 是 | 红包发送者 QQ 号 |
| `red_packet` | object | 是 | 同一个语音红包消息段的完整 `data`，含 `listid`、`authkey`、`channel`、`pay_flag`、`hb_from` |
| `voice_rate_id` | string | 是 | `upload_red_packet_voice` 匹配成功返回的值 |

本接口拒绝非语音红包，缺少 `voice_rate_id` 时也会报错。不需要 `claim_token`。

## WebSocket 示例

以下 `event` 为红包所在群的消息事件，`file_path` 是朗读该红包口令的录音：

```js
const packet = event.message.find(segment => (
  segment.type === 'red_packet' && segment.data.channel === 65536
))?.data

if (packet) {
  const match = await api.upload_red_packet_voice(
    event.self_id, platform, event.sender.user_id, packet, file_path,
  )
  if (match.matched) {
    const voice = await api.upload_group_voice(
      event.self_id, platform, event.group_id, file_path,
    )
    await api.send_group_msg(event.self_id, platform, event.group_id, [voice])
    const result = await api.grab_group_voice_red_packet(
      event.self_id, platform, event.group_id, event.sender.user_id,
      packet, match.voice_rate_id,
    )
    console.log(result.retcode, result.retmsg)
  }
}
```

上传匹配、发送群语音、领取三步由插件依次调用。匹配结果必须对应本次领取的同一个红包。

## 返回值

返回领取结果对象。先检查 `retcode`，再检查领取状态 `state`：`retcode` 为 `0` 且 `state` 为 `0` 才表示本次领取成功。仅 `retcode=0` 不代表已经领到；例如 `state=2` 表示红包已领完。缺少有效 `state` 时，不能确认本次领取成功。

本次领取金额取自 `recv_object.amount`，单位为分，展示为元时除以 `100`。`recv_object` 可能是 JSON 对象或 JSON 字符串，使用前应先解析为对象。金额字段缺失时应标记金额未知，不要将红包总金额或其他领取者的金额当作本次领取金额。SDK 超时为 60 秒。
