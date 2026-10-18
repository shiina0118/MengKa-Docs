# get_ps_key

获取指定域名的 PsKey。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.get_ps_key(self_id, platform, domain)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_ps_key' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "domain": "qzone.qq.com"
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `domain` | string | 是 | 目标域名 |

## 返回值

```js
{
  domain: 'DOMAIN',
  ps_key: 'PSKEY',
}
```
