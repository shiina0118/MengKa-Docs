# qqpet_get_feed_times_info

获取宠物喂食次数信息。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_feed_times_info",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_feed_times_info' \
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
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | object | 否 | 本次操作的参数，默认 `{}` |

### request

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `request.field_4` | string | 否 | 宠物 ID；当前页面查询本人库存时可省略 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展结果，说明待补充 |
| `field_2` | number | 扩展结果，说明待补充 |
| `food_info` | object | 食物状态和商品配置 |
| `food_inventory` | object[] | 食物库存列表 |

### response.food_inventory[]

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `food_type` | number | 食物种类 |
| `balance` | number | 当前库存数量 |
| `food_id` | string | 喂食和购买时使用的食物 ID |
| `name` | string | 食物名称 |
| `icon_url` | string | 食物图标 |
