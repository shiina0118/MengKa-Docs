# qqpet_use_bath_item

使用宠物洗护用品。仅支持 `android` 账号。

消耗洗护用品。本人洗护省略 `pet_uin`；给好友洗护时同时填写好友的宠物 ID 与主人 QQ 号。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_use_bath_item",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "pet_id": "PET_ID",
      "item_id": "ITEM_ID",
      "use_num": 1
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_use_bath_item' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "pet_id": "PET_ID",
    "item_id": "ITEM_ID",
    "use_num": 1
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
| `request.pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |
| `request.item_id` | string | 否 | 用品或商品 ID，使用相应目录返回的值 |
| `request.use_num` | number | 否 | 消耗的用品数量；页面示例为1 |
| `request.pet_uin` | string | 否 | 目标主人 QQ 号；给本人洗护可省略，给好友洗护填写好友 QQ 号 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `clean_value` | number | 清洁值 |
| `field_2` | number | 扩展数据，说明待补充 |
| `balance` | number | 剩余数量 |
| `is_clean` | boolean | 是否已完成清洁 |
| `field_5` | number | 扩展数据，说明待补充 |
| `field_6` | number | 扩展数据，说明待补充 |
