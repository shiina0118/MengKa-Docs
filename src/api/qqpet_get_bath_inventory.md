# qqpet_get_bath_inventory

获取宠物洗护用品库存。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_bath_inventory",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {}
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_bath_inventory' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {}
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

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `inventory` | object | 库存信息 |

### response.inventory

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `items` | object[] | 条目列表 |

### response.inventory.items[]

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `item_id` | string | 用品或商品 ID，使用相应目录返回的值 |
| `balance` | number | 剩余数量 |
