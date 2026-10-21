# kick_group_member

将指定成员移出群聊，可同时拒绝该成员后续的加群申请。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "kick_group_member",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "user_id": 234567890,
    "reject_add_request": false
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/kick_group_member' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "group_id": 987654321,
  "user_id": 234567890,
  "reject_add_request": false
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `group_id` | number | 是 | 群聊 ID |
| `user_id` | number | 是 | 被移出成员的 QQ 号 |
| `reject_add_request` | boolean | 是 | `true` 表示同时拒绝该成员后续的加群申请 |

只移出成员时传 `false`；省略 `reject_add_request` 或传 `null` 会报错，不会执行移出操作。

## 返回值

```js
{
  success: true,
}
```
