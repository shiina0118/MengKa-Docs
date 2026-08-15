# get_red_packet_info

查询群消息中 `red_packet` 消息段对应的 QQ 红包详细信息。

该接口用于普通红包的预领取。口令红包不强制调用本接口，可以直接使用群消息事件中的
`red_packet` 消息段按
[`grab_red_packet` 的口令红包流程](/api/grab_red_packet#口令红包)领取，也可以按需查询红包详情。

## 调用

```js
const redPacket = event.message.find(segment => segment.type === 'red_packet')
const result = await api.get_red_packet_info(
  event.self_id,
  event.group_id,
  event.sender.user_id,
  redPacket.data,
)
```

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

## 返回值

返回红包详情对象，例如：

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

`pre_grap_token` 位于返回对象顶层。领取普通红包时，将它作为 `grab_red_packet` 的第 5 个参数传入。
