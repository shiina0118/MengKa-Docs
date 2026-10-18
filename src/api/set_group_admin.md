# set_group_admin

设置或取消群聊管理员。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.set_group_admin(
  self_id,
  platform,
  group_id,
  user_id,
  set_admin,
)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/set_group_admin' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
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
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
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
