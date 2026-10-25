# get_filtered_friend_notifications

分页查询“新朋友 → 过滤通知”中的好友申请，包含申请人的 QQ 号、昵称、验证消息、来源和过滤原因。每次调用返回一页，目标账号须在线且属于当前插件节点。

此接口只查询，不会将通知标记已读，也不会自动同意或删除申请。过滤通知使用独立的处理接口，不能将其记录传给普通好友申请的同意、拒绝接口。

## 调用


```json
{
  "type": "action",
  "id": "filtered-friends-1",
  "action": "get_filtered_friend_notifications",
  "params": { "self_id": 123456789, "protocol_id": 0, "page_size": 50 }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `page_size` | number | 否 | 每页请求条数，整数，范围 1–50；省略时默认 50，不接受 `null` |
| `cookie` | string | 否 | 分页游标，标准 Base64 字符串；首次省略或传 `""`，下一页原样传入上一次响应的 `cookie`，不接受 `null` |

每次调用只查询一页，超时为 30 秒。`cookie` 必须来自同一账号实例的上一页响应，不要自行构造、解析或修改。不支持通过页码直接跳转。

参数无效、查询失败、超时或响应无效时返回 `ok: false` 和 `error`，不会把失败当作空列表。

## 返回值

成功响应的 `data`：

```json
{
  "notifications": [
    {
      "user_id": 987654321,
      "nickname": "示例用户",
      "comment": "你好，我是某某",
      "source": "QQ号查找",
      "reason": "示例过滤原因",
      "request_time": 1700000000,
      "age": 20,
      "sex": -1,
      "group_id": 0,
      "common_friend_count": 0
    }
  ],
  "total_count": 1,
  "cookie": "",
  "has_more": false
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `notifications` | object[] | 本页的过滤申请，无记录时为 `[]` |
| `total_count` | number | 本页返回的记录数，等于 `notifications.length`；不是全部记录总数或未读数 |
| `cookie` | string | 下一页使用的标准 Base64 游标；没有后续页时为 `""` |
| `has_more` | boolean | 是否还有后续页；为 `false` 时停止翻页 |

每条记录包含以下字段；示例中的文字仅为演示，实际内容由查询结果决定。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_id` | number | 申请人的 QQ 号，同意或删除时原样传入 |
| `nickname` | string | 申请人昵称，无可用数据时为 `""` |
| `comment` | string | 验证消息，无可用数据时为 `""` |
| `source` | string | 申请来源说明，无可用数据时为 `""` |
| `reason` | string | 过滤原因，无可用数据时为 `""`；不要通过匹配此文字判断处理权限 |
| `request_time` | number | 申请时间，Unix 秒时间戳；无可用数据时为 `0` |
| `age` | number | 返回的年龄，无可用数据时为 `0` |
| `sex` | number | 返回的性别标识，未提供时为 `-1` |
| `group_id` | number | 记录关联的群号，无可用数据时为 `0` |
| `common_friend_count` | number | 返回的共同好友数，无可用数据时为 `0` |

## 查询下一页

当 `has_more` 为 `true` 时，保持 `self_id`、`protocol_id` 和 `page_size` 不变，将最近一页响应的 `cookie` 原样传入下一次请求。无需重新编码该字符串。

```json
{
  "type": "action",
  "id": "filtered-friends-2",
  "action": "get_filtered_friend_notifications",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "page_size": 50,
    "cookie": "AP8B"
  }
}
```

上例 `cookie` 仅为演示，须替换成最近一页实际返回的值。不要根据本页条数推断是否结束；空页也可能带有后续页游标，请以 `has_more` 为准。重新查询第一页时，省略 `cookie` 或传 `""`。

## 处理申请

使用本次查询的 `self_id`、`protocol_id` 和记录中的 `user_id`：

- 接受申请：调用 [approve_filtered_friend_apply](/api/approve_filtered_friend_apply)。
- 不接受并移除通知：调用 [delete_filtered_friend_notification](/api/delete_filtered_friend_notification)。这是删除通知，不是普通申请的拒绝或拉黑。

同意和删除无需 `request_id`、`action_info`。列表可能包含已失效的申请，最终以处理接口返回结果为准。
