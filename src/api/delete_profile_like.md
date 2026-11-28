# delete_profile_like

删除当前 Bot 的一条 QQ 资料点赞列表记录（发出的点赞或收到的点赞）。

可先通过 [`get_sent_profile_likes`](/api/get_sent_profile_likes) 或 [`get_received_profile_likes`](/api/get_received_profile_likes) 获取记录中的 `user_id`，再传入对应的 `type` 删除。此操作仅从当前账号的资料点赞记录列表中移除对应条目，不会撤回已经送出的点赞次数。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "delete_profile_like",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890,
    "type": 1
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `user_id` | number | 是 | 要删除记录的目标用户 QQ 号，必须为正整数 |
| `type` | number | 是 | 记录类型，见[记录类型](#type)；仅允许 `0` 或 `1` |

省略 `type`、传 `null` 或传入 `0`、`1` 以外的值时直接报错。

### 记录类型 {#type}

| 取值 | 说明 |
| --- | --- |
| `0` | 发出的资料点赞记录（对应 [`get_sent_profile_likes`](/api/get_sent_profile_likes) 列表） |
| `1` | 收到的资料点赞记录（对应 [`get_received_profile_likes`](/api/get_received_profile_likes) 列表） |

## 返回值

成功时外层为 `ok: true`，`data` 为：

```json
{
  "success": true,
  "user_id": 234567890,
  "type": 1
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 本次删除是否成功，成功时固定为 `true` |
| `user_id` | number | 被删除记录对应的目标用户 QQ 号 |
| `type` | number | 本次删除的记录类型（`0` 或 `1`） |

参数无效、Bot 未在线、网络超时或服务端拒绝时，返回 `ok: false`，`error` 包含失败原因。

查询资料点赞记录使用 [`get_sent_profile_likes`](/api/get_sent_profile_likes) 和 [`get_received_profile_likes`](/api/get_received_profile_likes)；给用户资料点赞使用 [`like_user_profile`](/api/like_user_profile)。
