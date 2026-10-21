# qqpet_get_reaction

获取宠物行为反应。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const request = {
  "pet_id": "PET_ID",
  "page": 1000
}
const result = await api.qqpet_get_reaction(self_id, platform, request)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_reaction' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "request": {
    "pet_id": "PET_ID",
    "page": 1000
  }
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `android`；`phone`、`pad` 视为 `android` |
| `request` | object | 否 | 本次操作的参数，默认 `{}` |

### request

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `request.pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |
| `request.page` | number | 否 | 页面场景值；活动详情示例为6000，行为反应示例为1000 |
| `request.field_3` | boolean | 否 | 扩展数据，说明待补充 |
| `request.field_4` | number | 否 | 扩展数据，说明待补充 |
| `request.field_99` | number | 否 | 扩展数据，说明待补充 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `items` | object[] | 条目列表 |
| `field_2` | number | 扩展数据，说明待补充 |

### response.items[]

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_2` | number | 扩展数据，说明待补充 |
| `field_3` | object | 扩展数据，说明待补充 |
| `field_4` | object | 扩展数据，说明待补充 |

### response.items[].field_3

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | object[] | 扩展数据，说明待补充 |
| `field_3` | boolean | 扩展数据，说明待补充 |
| `field_4` | boolean | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充 |
| `field_6` | object[] | 扩展数据，说明待补充 |
| `field_7` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_8` | object[] | 扩展数据，说明待补充 |

### response.items[].field_4

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object[] | 扩展数据，说明待补充 |
| `field_2` | object[] | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充 |
| `field_4` | number | 扩展数据，说明待补充 |
| `field_5` | number | 扩展数据，说明待补充 |
| `field_6` | string | 扩展数据，说明待补充 |
