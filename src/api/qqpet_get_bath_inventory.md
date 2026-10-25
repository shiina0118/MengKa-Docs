# qqpet_get_bath_inventory

获取宠物洗护用品库存。仅支持 `android` 账号。

## 调用


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
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `inventory` | [Inventory](#response-inventory) | 库存信息 |

### response.inventory（Inventory） {#response-inventory}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `items` | [Item[]](#response-inventory-items) | 条目列表 |

### response.inventory.items[]（Item） {#response-inventory-items}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `item_id` | string | 用品或商品 ID，使用相应目录返回的值 |
| `balance` | number | 剩余数量 |
