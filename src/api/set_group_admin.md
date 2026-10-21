# set_group_admin

设置或取消群聊管理员。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "set_group_admin",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "user_id": 234567890,
    "set_admin": true
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/set_group_admin' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "group_id": 987654321,
  "user_id": 234567890,
  "set_admin": true
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
| `user_id` | number | 是 | 目标成员 QQ 号 |
| `set_admin` | boolean | 是 | `true` 设置，`false` 取消 |

必须明确传入 `set_admin`。省略或传 `null` 会报错，不会执行群管理操作。

## 返回值

```js
{
  group_id: 987654321,
  user_id: 112233445,
  set_admin: true,
}
```

当前接口要求 `group_id` 和 `user_id` 在 `1`～`4294967295` 范围内，超出范围会明确报错。
