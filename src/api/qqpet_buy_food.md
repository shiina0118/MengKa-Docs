# qqpet_buy_food

购买宠物食物。仅支持 `android` 账号。

购买会消耗金币。食物 ID 来自食物商品目录，先核对价格和余额，再提交实际数量。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_buy_food",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "count": 1,
      "pet_id": "PET_ID",
      "food_id": "FOOD_ID"
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_buy_food' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "count": 1,
    "pet_id": "PET_ID",
    "food_id": "FOOD_ID"
  }
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | object | 否 | 本次操作的参数，默认 `{}` |

### request

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `request.count` | number | 否 | 数量 |
| `request.pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |
| `request.food_id` | string | 否 | 食物目录返回的食物 ID |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `food_balance` | number | 食物余额 |
| `gold_balance` | string | 金币余额，以十进制字符串返回 |
| `bought_num` | number | 本次购买数量 |
| `cost_gold` | number | 本次花费金币 |
