# grab_red_packet

领取群消息中 `red_packet` 消息段对应的普通红包或文字口令红包。语音红包使用 [`grab_group_voice_red_packet`](/api/grab_group_voice_red_packet)。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "grab_red_packet",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "sender_id": 234567890,
    "red_packet": {
      "listid": "LISTID_FROM_RED_PACKET",
      "authkey": "AUTHKEY_FROM_RED_PACKET",
      "title": "恭喜发财",
      "channel": 1,
      "pay_flag": 0,
      "hb_from": 0
    }
  }
}
```

`self_id`、`protocol_id`、`group_id` 取自群消息事件，`sender_id` 为事件中的 `sender.user_id`，`red_packet` 为消息中 `red_packet` 消息段的完整 `data`。

以上示例用于普通红包。普通红包领取前必须取得 `claim_token`；省略 `claim_token` 时，后端会先查询详情取得 token，再发送领取请求。查询失败或未取得有效 token 时会报错，不会继续领取。

如已调用 [`get_red_packet_info`](/api/get_red_packet_info)，请将返回的 `claim_token` 原样放入 `params.claim_token`，后端就会使用该 token，跳过自动查询。文字口令红包不使用该参数。

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/grab_red_packet' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "red_packet": {
    "listid": "LISTID_FROM_RED_PACKET",
    "authkey": "AUTHKEY_FROM_RED_PACKET",
    "title": "恭喜发财",
    "channel": 1,
    "pay_flag": 0,
    "hb_from": 0
  },
  "self_id": 123456789,
  "protocol_id": 0,
  "group_id": 987654321,
  "sender_id": 234567890,
  "claim_token": "CLAIM_TOKEN_FROM_GET_RED_PACKET_INFO"
}'
```

`red_packet` 使用收到的红包消息段完整 `data`；上面的标识和凭据为占位值。 `claim_token` 来自 `get_red_packet_info`；省略时后端会自动预查询。

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
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
| `claim_token` | string | 视类型 | 普通红包领取前必需；可传 `get_red_packet_info` 返回的同名字段，省略时由后端自动查询获取；文字口令红包不使用该参数 |

## 文字口令红包

`channel` 为 `6` 或 `32` 时，先在红包所在群发送口令，再把**这条口令消息**的标识放进 `red_packet` 对象。不要使用收到的红包消息的标识。

文字口令红包不使用 `claim_token`，无需先查询详情。

1. 用 [`send_group_msg`](/api/send_group_msg) 在红包所在群发送去除首尾空白后的红包标题：

```json
{
  "type": "action",
  "id": "1",
  "action": "send_group_msg",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "message": [
      {
        "type": "text",
        "data": {
          "text": "恭喜发财"
        }
      }
    ]
  }
}
```

2. 把发送结果的 `client_seq`、`msg_random` 和发送的口令一并放入 `red_packet` 后领取：

```json
{
  "type": "action",
  "id": "2",
  "action": "grab_red_packet",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "sender_id": 234567890,
    "red_packet": {
      "listid": "LISTID_FROM_RED_PACKET",
      "authkey": "AUTHKEY_FROM_RED_PACKET",
      "title": "恭喜发财",
      "channel": 6,
      "pay_flag": 0,
      "hb_from": 0,
      "msg_random": 1234567890,
      "client_seq": 12345
    }
  }
}
```

调用前须先发送口令消息。将发送结果的 `client_seq` 和 `msg_random` 按同名字段填入 `red_packet`；发送结果的 `msg_seq` 用于撤回消息，不能替代 `client_seq`。领取时的 `title` 应与发送的口令一致。缺少标题或 `msg_random` 会报错；`client_seq` 必须是 `1` 至 `4294967295` 的整数，缺失、为 `null`、为 `0` 或其他无效值时会拒绝领取并返回明确错误，不会从其他字段补取。

旧领取参数 `red_packet.msg_seq` 已移除，传入会报错，不提供兼容。

## 语音红包

`channel` 为 `65536` 时，本接口会报错并提示使用专用 API。先调用 [`upload_red_packet_voice`](/api/upload_red_packet_voice) 上传录音并确认 `matched === true`，再发送群语音，最后用返回的 `voice_rate_id` 调用 [`grab_group_voice_red_packet`](/api/grab_group_voice_red_packet)。

## 返回值

返回领取结果对象。先检查 `retcode`，再检查领取状态 `state`：`retcode` 为 `0` 且 `state` 为 `0` 才表示本次领取成功。仅 `retcode=0` 不代表已经领到；例如 `state=2` 表示红包已领完。缺少有效 `state` 时，不能确认本次领取成功。

本次领取金额取自 `recv_object.amount`，单位为分，展示为元时除以 `100`。`recv_object` 可能是 JSON 对象或 JSON 字符串，使用前应先解析为对象。金额字段缺失时应标记金额未知，不要将红包总金额或其他领取者的金额当作本次领取金额。
