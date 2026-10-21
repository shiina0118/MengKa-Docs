# like_user_profile

给指定用户的 QQ 资料点赞。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "like_user_profile",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890,
    "like_count": 1
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/like_user_profile' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "user_id": 234567890,
  "like_count": 1
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `self_id` | number | 是 | - | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `user_id` | number | 是 | - | 目标 QQ 号 |
| `like_count` | number | 否 | `1` | 点赞次数，整数；省略或传 `0` 时按 `1` 处理，负数报错 |

## 返回值

```js
{ code: 0, msg: '成功' }
```

通过 `code` 判断业务结果，`0` 表示成功，`msg` 为结果说明。请求失败时返回 `ok: false`。

查询用户资料使用 [`get_user_profile`](/api/get_user_profile)；查询当前 Bot 发出的点赞使用 [`get_sent_profile_likes`](/api/get_sent_profile_likes)。
