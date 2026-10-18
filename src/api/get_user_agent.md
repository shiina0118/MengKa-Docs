# get_user_agent

获取当前 Bot 使用的 User-Agent。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.get_user_agent(self_id, platform)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_user_agent' \
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
| `self_id` | number | 是 | Bot QQ 号，登录验证过程中也可调用 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |

## 返回值

```js
{
  user_agent: 'Mozilla/5.0 ...'
}
```

需要使用该 Bot 的 User-Agent 时，直接使用返回的 `user_agent` 字符串。
