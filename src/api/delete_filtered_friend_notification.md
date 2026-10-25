# delete_filtered_friend_notification

删除一条过滤通知，适用于不接受该申请并希望移除通知的情况。先通过 [get_filtered_friend_notifications](/api/get_filtered_friend_notifications) 获取记录，再使用同一账号实例和记录中的 `user_id` 调用。

此操作是删除过滤通知，不是普通好友申请的“拒绝”，也不会将申请人拉黑。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "delete-filtered-1",
  "action": "delete_filtered_friend_notification",
  "params": { "self_id": 123456789, "protocol_id": 0, "user_id": 987654321 }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/delete_filtered_friend_notification' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{"self_id":123456789,"protocol_id":0,"user_id":987654321}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `user_id` | number | 是 | 过滤通知列表返回的申请人 QQ 号，不能是 Bot 自身 |

目标账号必须属于当前插件节点。无需传入 `request_id` 或 `action_info`，不支持 `blacklist` 参数。

## 返回值

成功响应的 `data` 示例：

```json
{ "success": true, "user_id": 987654321 }
```

`success: true` 表示本次删除操作成功。账号未在线、请求被拒绝、网络失败、超时或响应无效时返回 `ok: false` 和 `error`。

超时后可重新查询过滤通知，核对记录是否已移除。处理普通好友申请的拒绝操作请使用 [reject_friend_apply](/api/reject_friend_apply)。
