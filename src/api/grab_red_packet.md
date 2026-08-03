# grab_red_packet

领取群消息中 `red_packet` 消息段对应的 QQ 红包。

## 调用

```js
const redPacket = event.message.find(segment => segment.type === 'red_packet')
const result = await api.grab_red_packet(
  event.self_id,
  event.group_id,
  event.sender.user_id,
  redPacket.data,
)
```

Bot 的 `skey`、`tenpay.com` PsKey、昵称、设备指纹、协议 AppID 和 DES Key 均由后端自动获取。

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

## 返回值

返回 QQ 红包服务解密后的领取结果 JSON 对象。
