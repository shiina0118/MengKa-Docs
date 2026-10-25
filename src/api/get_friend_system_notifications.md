# get_friend_system_notifications

查询当前可获取的好友申请记录，包含待处理及已处理记录。该调用只查询，不会同意或拒绝申请，也不会触发好友申请事件。

## 调用


```json
{
  "type": "action",
  "id": "friend-requests-1",
  "action": "get_friend_system_notifications",
  "params": { "self_id": 123456789, "protocol_id": 0 }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

目标账号必须属于当前插件节点。无需传入分页参数，本接口不支持指定页码或游标。

## 返回值

以下为成功响应 `data` 的字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `notifications` | object[] | 本次查询的申请记录，无记录时为 `[]` |
| `total_count` | number | 本次返回的记录数，等于 `notifications.length`；不是待处理申请数，也不代表全部历史申请数 |

### notifications 条目

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_id` | number | 申请记录中的 QQ 号 |
| `user_uid` | string | 申请者 UID，无可用数据时为 `""` |
| `nickname` | string | 申请者网名，无可用数据时为 `""` |
| `comment` | string | 验证附言，无可用数据时为 `""` |
| `request_id` | string | 申请序号的十进制字符串，保存和回传时不要转成 JavaScript Number |
| `request_time` | number | 申请时间，Unix 秒时间戳 |
| `msg_type` | number | 申请消息类型；普通好友申请为 `1` |
| `request_type` | number | 申请类型；普通待处理申请为 `1` |
| `request_sub_type` | number | 附加类型标识，可能为 `0`；不能代替 `request_type` |
| `source_id`、`sub_source_id`、`group_msg_type` | number | 处理申请所需的上下文标识，可能为 `0`；原样传入处理接口同名参数 |
| `actions` | array / null | 动作列表，保留返回顺序；没有动作时为 `null`，不能据此发起同意或拒绝操作 |
| `pending` | boolean | 是否为可处理的普通好友申请 |
| `unread` | boolean | 是否未读；已读不代表已处理 |
| `decided` | string | 已处理状态的说明，无说明时为 `""`；不要通过匹配此文本判断是否可处理 |

每个动作包含 `name`、`type` 和 `action_info`，含义见 [好友申请事件](/events/friend_apply#事件内容)。`action_info` 是需要原样回传的标准 Base64 字符串，可能为空字符串。

查询记录始终包含上表字段。与事件不同，`user_uid`、`comment` 为空时不会省略，`request_sub_type` 为 `0` 时也不会省略。记录中不包含 `self_id`、`protocol_id`，处理时请使用本次查询的账号标识。

## 处理申请

先确认记录的 `pending` 为 `true`，再检查所需动作是否存在：

- 同意：调用 [approve_friend_apply](/api/approve_friend_apply)，使用 `actions[0].action_info`。
- 拒绝：调用 [reject_friend_apply](/api/reject_friend_apply)，使用 `actions[1].action_info`，并按需要设置 `blacklist`。

将同一条记录的申请上下文和所选动作凭据一并传入，不要混用不同申请的数据，也不要将所有查询结果视为新申请。最终是否处理成功以处理接口的 `data.success` 为准。

Bot 未在线、网络失败、查询超时或结果无效时返回 `ok: false` 和 `error`，不会将失败当作空列表或返回部分成功记录。
