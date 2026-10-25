# grab_group_voice_red_packet

领取 `channel === 65536` 的群聊语音红包。须先上传匹配录音并发送群语音。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "grab_group_voice_red_packet",
  "params": {
    "red_packet": {
      "listid": "LISTID_FROM_RED_PACKET",
      "authkey": "AUTHKEY_FROM_RED_PACKET",
      "title": "你好",
      "channel": 65536,
      "pay_flag": 0,
      "hb_from": 0
    },
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "sender_id": 234567890,
    "voice_rate_id": "VOICE_RATE_ID_FROM_MATCH_RESULT"
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `group_id` | number | 是 | 红包所在群号 |
| `sender_id` | number | 是 | 红包发送者 QQ 号 |
| `red_packet` | [RedPacket](#red-packet) | 是 | 同一个语音红包消息段的完整 `data` |
| `voice_rate_id` | string | 是 | `upload_red_packet_voice` 匹配成功返回的值 |

### red_packet（RedPacket） {#red-packet}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `listid` | string | 是 | 红包列表 ID |
| `authkey` | string | 是 | 红包鉴权串 |
| `channel` | number | 是 | 红包渠道，语音红包为 `65536`，其他值会被拒绝 |
| `pay_flag` | number | 否 | 红包支付标记，省略为 `0`，建议保留收到的值 |
| `hb_from` | number | 否 | 红包来源标记，省略为 `0`，建议保留收到的值 |

本接口拒绝非语音红包，缺少 `voice_rate_id` 时也会报错。不需要 `claim_token`。

## 调用流程

在群消息事件中找到 `channel` 为 `65536` 的 `red_packet` 消息段后，依次发送以下请求。`file_path` 是朗读该红包口令的录音，`sender_id` 为事件中的 `sender.user_id`，`red_packet` 为该消息段的完整 `data`。

1. 调用 [`upload_red_packet_voice`](/api/upload_red_packet_voice) 上传录音并匹配口令：

```json
{
  "type": "action",
  "id": "1",
  "action": "upload_red_packet_voice",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "sender_id": 234567890,
    "red_packet": {
      "listid": "LISTID_FROM_RED_PACKET",
      "title": "红包口令"
    },
    "file_path": "D:/voices/password.mp3"
  }
}
```

2. 返回 `matched` 为 `true` 时，调用 [`upload_group_voice`](/api/upload_group_voice) 上传同一段录音，再用 [`send_group_msg`](/api/send_group_msg) 把返回的语音消息段发到红包所在群。`matched` 不为 `true` 时停止，不要继续领取。

3. 使用第 1 步返回的 `voice_rate_id` 领取：

```json
{
  "type": "action",
  "id": "3",
  "action": "grab_group_voice_red_packet",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "sender_id": 234567890,
    "red_packet": {
      "listid": "LISTID_FROM_RED_PACKET",
      "authkey": "AUTHKEY_FROM_RED_PACKET",
      "channel": 65536,
      "pay_flag": 0,
      "hb_from": 0
    },
    "voice_rate_id": "VOICE_RATE_ID"
  }
}
```

匹配结果必须对应本次领取的同一个红包。`red_packet` 请使用消息段的完整 `data`，上例只列出部分字段。

## 返回值

返回领取结果对象。先检查 `retcode`，再检查领取状态 `state`：`retcode` 为 `0` 且 `state` 为 `0` 才表示本次领取成功。仅 `retcode=0` 不代表已经领到；例如 `state=2` 表示红包已领完。缺少有效 `state` 时，不能确认本次领取成功。

本次领取金额取自 `recv_object.amount`，单位为分，展示为元时除以 `100`。`recv_object` 可能是 JSON 对象或 JSON 字符串，使用前应先解析为对象。金额字段缺失时应标记金额未知，不要将红包总金额或其他领取者的金额当作本次领取金额。处理耗时较长，客户端等待响应的时间建议不少于 60 秒。
