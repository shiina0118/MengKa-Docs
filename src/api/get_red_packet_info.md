# get_red_packet_info

查询群消息中 `red_packet` 消息段对应的 QQ 红包详细信息。走 DES 预领取（`hb_pre_grap`）。

领取红包不必先调用本接口，可直接使用 [`grab_red_packet`](/api/grab_red_packet)。

## 调用

```js
const redPacket = event.message.find(segment => segment.type === 'red_packet')
const result = await api.get_red_packet_info(
  event.self_id,
  platform,
  event.group_id,
  event.sender.user_id,
  redPacket.data,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `group_id` | number | 是 | 红包所在群号 |
| `sender_uin` | number | 是 | 红包发送人 QQ 号 |
| `red_packet` | object | 是 | 收到的 `red_packet` 消息段 `data` |
| `red_packet.title` | string | 否 | 红包标题 |
| `red_packet.listid` | string | 是 | 红包列表 ID |
| `red_packet.authkey` | string | 是 | 红包鉴权串 |
| `red_packet.channel` | number | 否 | 红包渠道，缺省为 `0` |
| `red_packet.pay_flag` | number | 是 | 红包支付标记，取自收到的 `red_packet` 消息段 |
| `red_packet.hb_from` | number | 是 | 红包来源标记，取自收到的 `red_packet` 消息段 |

## 返回值

返回 QQ 红包服务 DES 解密后的 JSON 对象，例如：

```js
{
  retcode: '0',
  retmsg: 'ok',
  pre_grap_token: 'rand=...&sign=...&ts=...&ver=1',
  send_object: {
    channel: '1',
    recv_amount: '0',
    recv_num: '0',
    send_listid: '10000000000000000000000000000001',
    send_name: '示例用户',
    send_uin: '246813579',
    total_amount: '100',
    total_num: '1',
    wishing: '恭喜发财',
  },
  state: '16',
}
```

`pre_grap_token` 位于返回对象顶层。如需带入领取请求，可作为 `grab_red_packet` 的第 6 个参数传入，非必填。

Bot 的 `skey`、`tenpay.com` PsKey、昵称、设备指纹、协议 AppID 和 DES Key 均由后端自动获取。
