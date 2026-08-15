# grab_red_packet

领取 QQ 群红包。普通红包和口令红包的领取参数不同：普通红包需要先取得
`pre_grap_token`，口令红包需要先发送红包口令并取得该消息的
`msg_random` 和 `client_seq`。

## 普通红包

```js
const redPacket = event.message.find(segment => segment.type === 'red_packet')
const info = await api.get_red_packet_info(
  event.self_id,
  event.group_id,
  event.sender.user_id,
  redPacket.data,
)
const result = await api.grab_red_packet(
  event.self_id,
  event.group_id,
  event.sender.user_id,
  redPacket.data,
  info.pre_grap_token,
)
```

`pre_grap_token` 由 `get_red_packet_info` 返回。领取普通红包时，将它作为
`grab_red_packet` 的第 5 个参数传入。

## 口令红包

当 `red_packet.data.channel` 为 `32` 时，按口令红包处理。收到群消息事件后，
发送红包消息段中的 `title`，再把发送结果带入领取请求：

```js
const redPacket = event.message.find(segment => (
  segment.type === 'red_packet' && Number(segment.data.channel) === 32
))

if (!redPacket) {
  return
}

const sent = await api.send_group_msg(event.self_id, event.group_id, [
  { type: 'text', data: { text: redPacket.data.title } },
])

const result = await api.grab_red_packet(
  event.self_id,
  event.group_id,
  event.sender.user_id,
  {
    ...redPacket.data,
    msg_random: sent.msg_random,
    msg_seq: sent.client_seq,
  },
  undefined,
)
```

口令消息必须使用 `red_packet.data.title`。其中：

- `msg_random` 使用 `send_group_msg` 返回的 `msg_random`。
- `msg_seq` 使用 `send_group_msg` 返回的 `client_seq`，不要使用返回值中的 `msg_seq`。
- 口令红包不强制调用 `get_red_packet_info`，`pre_grap_token` 也不是必填参数。
- `sender_uin` 使用事件中的 `event.sender.user_id`。
- `listid`、`authkey`、`channel`、`pay_flag` 和 `hb_from` 直接使用事件中的 `red_packet.data`。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 红包所在群号 |
| `sender_uin` | number | 是 | 红包发送人 QQ 号，取消息事件的 `event.sender.user_id` |
| `red_packet` | object | 是 | 收到的 `red_packet` 消息段 `data`；口令红包还需补充消息标识 |
| `red_packet.title` | string | 口令红包是 | 红包标题；口令红包中同时作为口令原文 |
| `red_packet.listid` | string | 是 | 红包列表 ID |
| `red_packet.authkey` | string | 是 | 红包鉴权串 |
| `red_packet.channel` | number | 否 | 红包渠道，缺省为 `0`；值为 `32` 时按口令红包处理 |
| `red_packet.pay_flag` | number | 是 | 红包支付标记，取自收到的消息段 |
| `red_packet.hb_from` | number | 是 | 红包来源标记，取自收到的消息段 |
| `red_packet.msg_random` | number | 口令红包是 | 发送口令消息后返回的 `msg_random` |
| `red_packet.msg_seq` | number | 口令红包是 | 发送口令消息后返回的 `client_seq` |
| `pre_grap_token` | string | 普通红包是 | `get_red_packet_info` 返回对象顶层的预领取 token；口令红包非必填 |

## 返回值

返回红包领取结果对象。
