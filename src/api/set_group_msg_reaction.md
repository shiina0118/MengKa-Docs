# set_group_msg_reaction

添加或取消当前 Bot 对普通群消息的表情回应。目标消息可以由其他群成员发送；取消时只操作当前 Bot 自己的回应。

## 调用

添加表情回应：

```json
{
  "type": "action",
  "id": "1",
  "action": "set_group_msg_reaction",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "msg_seq": 123,
    "emoji_id": "76",
    "emoji_type": 1,
    "is_add": true
  }
}
```

示例中的消息序号和表情 ID 是演示值，调用时替换为目标消息和表情的实际值。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号，必须大于 `0` |
| `protocol_id` | number | 是 | 与 `self_id` 共同定位账号实例，允许为 `0` |
| `group_id` | number | 是 | 目标群号，必须大于 `0` |
| `msg_seq` | number | 是 | 目标群消息的序号，必须大于 `0` |
| `emoji_id` | string | 是 | 表情 ID，不能为空或纯空白字符串；必须以字符串传入 |
| `emoji_type` | number | 否 | 表情类型，正整数；省略或传 `null` 时为 `1`，表示 QQ 系统表情 |
| `is_add` | boolean | 是 | `true` 添加回应，`false` 取消回应 |

`msg_seq` 可从[群聊消息事件](/events/group_message)的 `msg.seq`、[`get_group_history_messages`](/api/get_group_history_messages) 返回记录的 `msg.seq`，或 [`send_group_msg`](/api/send_group_msg) 返回的 `msg_seq` 获取。需同时使用该消息所属的 `group_id`，无需传入消息随机数或发送者 QQ 号。

QQ 系统表情的 `emoji_id` 使用表情 ID 的十进制字符串形式，例如消息段 `{ "type": "face", "data": { "id": 76 } }` 对应 `"76"`。可用于消息发送的表情不保证都支持回应，是否接受由服务端决定。

必须明确传入 `is_add`。省略、传 `null`、数字或字符串都会报错。取消时传入与添加时相同的 `group_id`、`msg_seq`、`emoji_id` 和 `emoji_type`，仅将 `is_add` 改为 `false`：

```json
{
  "type": "action",
  "id": "2",
  "action": "set_group_msg_reaction",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "msg_seq": 123,
    "emoji_id": "76",
    "emoji_type": 1,
    "is_add": false
  }
}
```

## 返回值

成功响应：

```json
{
  "type": "action_result",
  "id": "1",
  "ok": true,
  "data": {
    "success": true
  }
}
```

成功表示本次操作被接受，不返回表情回应总数或成员列表。当前接口只支持普通群消息。

参数错误、服务端拒绝、响应无效或请求超时均通过统一的 `ok: false`、`error` 返回。调用前需确保 Bot 在线、已加入目标群，并使用该群内有效的消息序号。
