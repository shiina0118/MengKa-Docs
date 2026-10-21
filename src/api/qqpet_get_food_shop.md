# qqpet_get_food_shop

获取宠物食物商品。仅支持 `android` 账号。

商品配置与食物库存分开查询。库存使用 `qqpet_get_feed_times_info`；本接口的商品查询范围示例为 `["11"]`。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const request = {
  "pet_id": "PET_ID",
  "field_2": [
    "11"
  ]
}
const result = await api.qqpet_get_food_shop(self_id, platform, request)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_food_shop' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "request": {
    "pet_id": "PET_ID",
    "field_2": [
      "11"
    ]
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
| `request.field_2` | string[] | 否 | 扩展数据，说明待补充；十进制整数字符串 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `items` | object[] | 条目列表 |
| `gold_balance` | string | 金币余额，以十进制字符串返回 |

### response.items[]

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `gold` | number | 金币价格 |
| `default_count` | number | 默认购买数量 |
| `count_step` | number | 数量调整步长 |
| `min_count` | number | 最小购买数量 |
| `max_count` | number | 最大购买数量 |
| `name` | string | 名称 |
| `field_7` | string | 扩展数据，说明待补充 |
| `food_id` | string | 食物目录返回的食物 ID |
| `description` | string | 说明 |
| `icon_url` | string | 图标地址 |
