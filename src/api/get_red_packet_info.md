# get_red_packet_info

查询群消息中 `red_packet` 消息段对应的 QQ 红包详细信息。

本接口用于查看红包详情，并取得普通红包领取所需的 `claim_token`。调用 [`grab_red_packet`](/api/grab_red_packet) 时未传 token，后端会自动执行预查询；文字口令和语音红包按领取接口中的对应流程处理。

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
| `sender_id` | number | 是 | 红包发送人 QQ 号 |
| `red_packet` | object | 是 | 收到的 `red_packet` 消息段 `data` |
| `red_packet.title` | string | 否 | 红包标题 |
| `red_packet.listid` | string | 是 | 红包列表 ID |
| `red_packet.authkey` | string | 是 | 红包鉴权串 |
| `red_packet.channel` | number | 否 | 红包渠道，缺省为 `0` |
| `red_packet.pay_flag` | number | 否 | 红包支付标记，省略为 `0`，建议保留收到的值 |
| `red_packet.hb_from` | number | 否 | 红包来源标记，省略为 `0`，建议保留收到的值 |

## 返回值

返回红包详情对象，常用字段示例：

```js
{
  retcode: '0',
  retmsg: 'success',
  claim_token: 'TOKEN',
  send_object: {
    channel: 1,
    recv_amount: 0,
    recv_num: 0,
    send_listid: '10000000000000000000000000000001',
    send_name: '示例用户',
    sender_id: 246813579,
    total_amount: 100,
    total_num: 1,
    wishing: '恭喜发财',
  },
  state: 16,
}
```

`sender_id`、`state`、`channel`、金额和数量字段为数字，`send_listid` 为字符串。`send_object` 仅在返回了可解析的详情时出现。

`claim_token` 是普通红包领取所需的凭据，请原样作为 `grab_red_packet` 的第 6 个参数传入。省略时后端会自动预查询，只有取得有效 token 后才会发送领取请求；获取失败会报错。文字口令红包不使用该参数。查询详情不代表已领取红包。

## 直接发送 WebSocket 请求

SDK 与直接请求使用相同的嵌套对象：

```json
{
  "type": "action",
  "id": "packet-info-1",
  "action": "get_red_packet_info",
  "params": {
    "self_id": 123456789,
    "platform": "android",
    "group_id": 987654321,
    "sender_id": 234567890,
    "red_packet": {
      "listid": "收到的红包标识",
      "authkey": "收到的红包凭据",
      "channel": 1,
      "pay_flag": 0,
      "hb_from": 0
    }
  }
}
```

其余红包 API 同样把收到的数据放在 `red_packet` 中；普通红包的 `claim_token` 放在 `params` 顶层，省略时由后端自动预查询获取。
