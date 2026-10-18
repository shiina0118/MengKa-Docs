# delete_friend

删除指定好友。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.delete_friend(self_id, platform, user_id)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/delete_friend' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "user_id": 234567890
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `user_id` | number | 是 | 要删除的好友 QQ 号 |

## 返回值

```js
{ success: true, user_id: 112233445 }
```
