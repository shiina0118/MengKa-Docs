# approve_friend_apply

同意普通好友申请。申请上下文可来自 [好友申请事件](/events/friend_apply)，也可来自 [查询好友申请](/api/get_friend_system_notifications) 返回的待处理记录。请保存上下文，并使用同一账号实例调用本接口。

## 调用


```json
{
  "type": "action",
  "id": "approve-1",
  "action": "approve_friend_apply",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890,
    "request_id": "9007199254740993",
    "msg_type": 1,
    "request_type": 1,
    "source_id": 0,
    "sub_source_id": 0,
    "group_msg_type": 0,
    "action_info": "CAI=",
    "remark": "",
    "group_id": 0
  }
}
```


## 参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `self_id`、`protocol_id` | number | 必填，使用事件中的账号标识，或查询申请时使用的账号标识；Bot 必须在线，`protocol_id` 允许为 `0` |
| `user_id` | number | 必填，使用申请记录中的申请者 QQ 号 |
| `request_id` | string | 必填，原样传入申请记录中的序号字符串，不能转成 JavaScript Number |
| `msg_type`、`request_type` | number | 必填，使用申请记录同名字段；当前仅支持均为 `1` 的普通好友申请 |
| `source_id`、`sub_source_id`、`group_msg_type` | number | 原样传入申请记录同名字段，允许为 `0`；省略时默认为 `0` |
| `action_info` | string | 必填，原样传入申请记录 `actions[0].action_info` 的标准 Base64；原值为空字符串时也须显式传入，不能省略或传 `null`；字符串长度最多 131072 字节 |
| `remark` | string | 可选，好友备注，默认空字符串 |
| `group_id` | number | 可选，好友分组 ID，默认 `0`；不是群号 |

示例中的 Base64 仅作演示，应使用实际申请记录提供的 `actions[0].action_info`，不要解析、修改或自行构造。调用前检查 `actions[0]` 是否存在，不要传入拒绝动作 `actions[1]`。使用查询结果时，还应确认该记录的 `pending` 为 `true`。

## 返回值

```json
{
  "success": true,
  "error_code": 0,
  "error_message": "",
  "msg_detail": "",
  "type": 0,
  "msg_invalid_decided": ""
}
```

外层 `ok: true` 表示已取得处理结果；申请是否同意成功以 `data.success` 为准，`error_code`、`error_message` 保留服务端结果。`msg_detail`、`type`、`msg_invalid_decided` 为服务端状态信息，`remark_result` 仅在服务端返回时出现。

参数错误、网络失败或响应损坏时返回 `ok: false`。此操作不会自动重试；超时或断线时应先确认结果，避免重复操作。
