# get_red_packet_info

查询群消息中 `red_packet` 消息段对应的 QQ 红包详细信息。

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

## 返回值

返回 QQ 红包服务解密后的 JSON 对象，例如：

```js
{
  retcode: '0',
  retmsg: 'ok',
  pre_grap_token: 'rand=...&sign=...&ts=...&ver=1',
  send_object: {
    channel: '1',
    recv_amount: '0',
    recv_num: '0',
    send_listid: '10000452012608021400100537757900',
    send_name: '示例用户',
    send_uin: '350873596',
    total_amount: '100',
    total_num: '1',
    wishing: '恭喜发财',
  },
  state: '16',
}
```
