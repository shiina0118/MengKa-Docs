# qqpet_get_home_resource

获取宠物家园资源。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.qqpet_get_home_resource(self_id, platform)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_home_resource' \
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
| `platform` | string | 是 | `android`；`phone`、`pad` 视为 `android` |

此接口无需额外业务参数。

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展结果，说明待补充 |
| `field_2` | object | 扩展结果，说明待补充 |
| `field_3` | object | 扩展结果，说明待补充 |
| `field_4` | object | 扩展结果，说明待补充 |
| `field_5` | object | 扩展结果，说明待补充 |
