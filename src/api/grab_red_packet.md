# grab_red_packet

领取群消息中 `red_packet` 消息段对应的 QQ 红包。

## 调用

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

`pre_grap_token` 由 `get_red_packet_info` 返回，位于响应对象顶层。正式领取会将其作为 action 参数顶层的 `pre_grap_token` 发送。

Bot 的 `skey`、`tenpay.com` PsKey、昵称、设备指纹、协议 AppID 和红包加密上下文均由后端自动获取。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 红包所在群号 |
| `sender_uin` | number | 是 | 红包发送人 QQ 号 |
| `red_packet` | object | 是 | 收到的 `red_packet` 消息段 `data` |
| `red_packet.title` | string | 否 | 红包标题 |
| `red_packet.listid` | string | 是 | 红包列表 ID |
| `red_packet.authkey` | string | 是 | 红包鉴权串 |
| `red_packet.channel` | number | 否 | 红包渠道，缺省为 `0` |
| `red_packet.pay_flag` | number | 是 | 红包支付标记，取自收到的 `red_packet` 消息段 |
| `red_packet.hb_from` | number | 是 | 红包来源标记，取自收到的 `red_packet` 消息段 |
| `pre_grap_token` | string | 是 | `get_red_packet_info` 返回对象顶层的预领取 token |

## 返回值

返回 QQ 红包服务解密后的领取结果 JSON 对象。
