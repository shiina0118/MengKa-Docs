# qqpet_place_order

购买宠物商城商品。仅支持 `android` 账号。

购买会提交订单并消耗相应余额。洗护用品类别为"355"；商品 ID 取自目录，不能把示例 ID 直接用于购买。检查返回的 `response.result`，不要把有订单响应等同于购买成功。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const request = {
  "account": {
    "platform": 1,
    "currency_type": 1001,
    "pet_id": "PET_ID"
  },
  "currency_type": 1001,
  "goods": [
    {
      "goods_kind": "355",
      "item_id": "123",
      "count": "1"
    }
  ],
  "scene": 21
}
const result = await api.qqpet_place_order(self_id, platform, request)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_place_order' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "request": {
    "account": {
      "platform": 1,
      "currency_type": 1001,
      "pet_id": "PET_ID"
    },
    "currency_type": 1001,
    "goods": [
      {
        "goods_kind": "355",
        "item_id": "123",
        "count": "1"
      }
    ],
    "scene": 21
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
| `request.account` | object | 否 | 本次购买的账号和宠物信息 |
| `request.currency_type` | number | 否 | 币种，Android页面示例为1001 |
| `request.goods` | object[] | 否 | 购买的商品列表 |
| `request.scene` | number | 否 | 购买场景；洗护用品示例为21 |

### request.account

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `platform` | number | 否 | 购买平台值，Android示例为1 |
| `currency_type` | number | 否 | 币种，Android页面示例为1001 |
| `pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |

### request.goods[]

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `goods_kind` | string | 否 | 商品类别，洗护用品为"355"；十进制整数字符串 |
| `item_id` | string | 否 | 用品或商品 ID，使用相应目录返回的值；十进制整数字符串 |
| `count` | string | 否 | 数量；十进制整数字符串 |
| `field_4` | number | 否 | 扩展数据，说明待补充 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `result` | number | 操作结果码；请求成功不代表该业务结果一定成功，请检查本字段 |
| `order_id` | string | 订单 ID |
| `field_3` | object[] | 扩展数据，说明待补充 |
| `field_4` | object[] | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充；标准 Base64 字符串 |

### response.field_3[]

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_3` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_4` | string | 扩展数据，说明待补充 |
| `field_5` | number | 扩展数据，说明待补充 |

### response.field_4[]

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_2` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_3` | number | 扩展数据，说明待补充 |
