# get_client_key

获取当前 Bot 会话的 client_key。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.get_client_key(self_id, platform)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_client_key' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android"
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |

## 返回值

```js
{ client_key: 'HEX_ENCODED_CLIENTKEY' }
```

`client_key` 使用十六进制编码。
