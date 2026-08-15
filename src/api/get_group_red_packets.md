# get_group_red_packets

查询指定群内仍可领取的 QQ 红包。该接口也可通过别名 `get_up_for_grabs` 调用。

该接口用于主动查询红包列表，不是处理实时群消息事件的必经步骤。收到 `red_packet`
消息段后，可以直接按 [`grab_red_packet`](/api/grab_red_packet) 的对应流程领取。

## 调用

```js
const packets = await api.get_group_red_packets(self_id, group_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 要查询的群号 |

## 返回值

返回仍可领取的红包数组。没有匹配记录时返回空数组。

```js
[
  {
    sender_uin: 123456789,
    title: '口令内容',
    listid: '10000000000000000000000000000001',
    authkey: '...',
    channel: 32,
    pay_flag: 0,
    hb_from: 0,
    time: 1765432100,
  },
]
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `sender_uin` | number | 红包发送人 QQ 号 |
| `title` | string | 红包标题；口令红包中同时作为需要发送的口令 |
| `listid` | string | 红包列表 ID |
| `authkey` | string | 红包鉴权串 |
| `channel` | number | 红包渠道；值为 `32` 时按口令红包处理 |
| `pay_flag` | number | 红包支付标记 |
| `hb_from` | number | 红包来源标记 |
| `time` | number | 红包创建时间，Unix 秒 |
