# grab_red_packet

领取群消息中 `red_packet` 消息段对应的普通红包或文字口令红包。语音红包使用 [`grab_group_voice_red_packet`](/api/grab_group_voice_red_packet)。

## 调用

```js
const redPacket = event.message.find(segment => segment.type === 'red_packet')
const result = await api.grab_red_packet(
  event.self_id,
  platform,
  event.group_id,
  event.sender.user_id,
  redPacket.data,
)
```

以上示例用于普通红包，直接传入收到的红包数据即可。

如已调用 [`get_red_packet_info`](/api/get_red_packet_info)，也可将返回的 `claim_token` 原样作为第 6 个参数传入。该参数可以省略，无需自行构造或解析。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `group_id` | number | 是 | 红包所在群号 |
| `sender_id` | number | 是 | 红包发送人 QQ 号 |
| `red_packet` | object | 是 | 收到的 `red_packet` 消息段 `data` |
| `red_packet.title` | string | 视类型 | 普通红包可省略；文字口令红包必填，作为口令原文 |
| `red_packet.listid` | string | 是 | 红包列表 ID |
| `red_packet.authkey` | string | 是 | 红包鉴权串 |
| `red_packet.channel` | number | 视类型 | 取自收到的消息段；`6`、`32` 为文字口令红包，`65536` 为语音红包，不要丢弃或改写 |
| `red_packet.pay_flag` | number | 否 | 红包支付标记，省略为 `0`，建议保留收到的值 |
| `red_packet.hb_from` | number | 否 | 红包来源标记，省略为 `0`，建议保留收到的值 |
| `red_packet.msg_random` | number | 视类型 | 文字口令红包必填：Bot 发送口令消息后返回的 `msg_random` |
| `red_packet.client_seq` | number | 视类型 | 文字口令红包必填：同一次发送返回的 `client_seq` |
| `claim_token` | string | 否 | 普通红包可传 `get_red_packet_info` 返回的同名字段，也可省略；文字口令红包不使用该参数 |

## 文字口令红包

`channel` 为 `6` 或 `32` 时，先在红包所在群发送口令，再把**这条口令消息**的标识放进 `red_packet` 对象。不要使用收到的红包消息的标识。

```js
const title = redPacket.data.title.trim()
const sent = await api.send_group_msg(event.self_id, platform, event.group_id, [
  { type: 'text', data: { text: title } },
])

const result = await api.grab_red_packet(
  event.self_id,
  platform,
  event.group_id,
  event.sender.user_id,
  {
    ...redPacket.data,
    title,
    msg_random: sent.msg_random,
    client_seq: sent.client_seq,
  },
)
```

调用前须先发送口令消息。将发送结果的 `client_seq` 和 `msg_random` 按同名字段填入 `red_packet`；发送结果的 `msg_seq` 用于撤回消息，不能替代 `client_seq`。领取时的 `title` 应与发送的口令一致。缺少标题或 `msg_random` 会报错；`client_seq` 必须是 `1` 至 `4294967295` 的整数，缺失、为 `null`、为 `0` 或其他无效值时会拒绝领取并返回明确错误，不会从其他字段补取。

旧领取参数 `red_packet.msg_seq` 已移除，传入会报错，不提供兼容。

## 语音红包

`channel` 为 `65536` 时，本接口会报错并提示使用专用 API。先调用 [`upload_red_packet_voice`](/api/upload_red_packet_voice) 上传录音并确认 `matched === true`，再发送群语音，最后用返回的 `voice_rate_id` 调用 [`grab_group_voice_red_packet`](/api/grab_group_voice_red_packet)。

## 返回值

返回领取结果对象。检查 `retcode`、`retmsg` 判断是否领取成功。
