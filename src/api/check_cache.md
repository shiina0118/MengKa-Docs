# check_cache

检查账号是否具备可用于尝试缓存登录的本地数据。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "check_cache",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/check_cache' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 当前节点下的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

## 返回值

```js
{ valid: true }
```

`valid === true` 时可以尝试 [`cache_login`](/api/cache_login)，但不保证能够登录成功，仍需检查登录结果。`valid === false` 时，密码登录账号使用 [`login_account`](/api/login_account)，扫码登录账号使用 [`get_login_qr`](/api/get_login_qr)。
