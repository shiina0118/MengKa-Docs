# qqpet_get_bath_catalog

获取宠物洗护用品目录。仅支持 `android` 账号。

读取洗护用品名称、价格、清洁值与购买数量限制。库存使用 `qqpet_get_bath_inventory`。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_bath_catalog",
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
| `items` | [Item[]](#response-items) | 条目列表 |

### response.items[]（Item） {#response-items}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | string | 名称 |
| `item_id` | string | 用品或商品 ID，使用相应目录返回的值 |
| `icon_url` | string | 图标地址 |
| `resource_id` | string | 本次操作的resource_id数据 |
| `gold` | number | 金币价格 |
| `clean_value` | number | 清洁值 |
| `description` | string | 说明 |
| `default_count` | number | 默认购买数量 |
| `count_step` | number | 数量调整步长 |
| `min_count` | number | 最小购买数量 |
| `max_count` | number | 最大购买数量 |
| `field_12` | number | 扩展数据，说明待补充 |
| `field_13` | string | 扩展数据，说明待补充 |
| `field_14` | [Field14](#response-items-field-14) | 扩展数据，说明待补充 |
| `field_15` | string | 扩展数据，说明待补充 |

### response.items[].field_14（Field14） {#response-items-field-14}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充 |
| `field_4` | string | 扩展数据，说明待补充 |
