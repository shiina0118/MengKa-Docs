# get_skey

获取当前 Bot 会话的 skey。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.get_skey(self_id, platform)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_skey' \
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
{ skey: 'SKEY' }
```

该凭据属于当前 Bot 会话，应仅在插件运行期间使用。
