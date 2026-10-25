# approve_filtered_friend_apply

同意过滤通知中的好友申请。先通过 [get_filtered_friend_notifications](/api/get_filtered_friend_notifications) 获取申请，使用同一账号实例和记录中的 `user_id` 调用。

## 调用


```json
{
  "type": "action",
  "id": "approve-filtered-1",
  "action": "approve_filtered_friend_apply",
  "params": { "self_id": 123456789, "protocol_id": 0, "user_id": 987654321 }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `user_id` | number | 是 | 过滤通知列表返回的申请人 QQ 号，不能是 Bot 自身 |

目标账号必须属于当前插件节点。无需传入 `request_id` 或 `action_info`；不支持在此调用中设置备注、好友分组或拉黑。

## 返回值

成功响应的 `data` 示例：

```json
{ "success": true, "user_id": 987654321 }
```

`success: true` 表示本次同意操作成功。账号未在线、请求被拒绝、网络失败、超时或响应无效时返回 `ok: false` 和 `error`。

超时不代表操作一定未生效，请先查询好友列表或过滤通知核对状态，再决定是否重试。处理普通好友申请请使用 [approve_friend_apply](/api/approve_friend_apply)。
