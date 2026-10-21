# set_group_mute

设置或取消群聊成员禁言。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "set_group_mute",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "user_id": 234567890,
    "duration_sec": 60
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/set_group_mute' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "group_id": 987654321,
  "user_id": 234567890,
  "duration_sec": 60
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
| `duration_sec` | number | 是 | 禁言秒数，`0` 取消禁言 |

必须明确传入 `duration_sec`。省略或传 `null` 会报错；解除禁言请显式传 `0`。

## 返回值

```js
{
  group_id: 987654321,
  user_id: 112233445,
  duration_sec: 600,
}
```
