# qqpet_place_order

购买宠物商城商品。仅支持 `android` 账号。

QQ 宠物 API 默认关闭。管理员须在后端 `data/config.yaml` 顶层设置 `qqpet: 1` 并重启后端；未配置或设置为 `0` 时，所有 QQ 宠物 API（含礼包领取）均不可调用。

购买会提交订单并消耗相应余额。洗护用品类别为"355"；商品 ID 取自目录，不能把示例 ID 直接用于购买。检查返回的 `response.result`，不要把有订单响应等同于购买成功。

学习和打工道具的商品 ID 可从 [qqpet_get_prop_catalog](./qqpet_get_prop_catalog) 获取，`goods[].goods_kind` 使用所选商品的 `app_id`（学习 `"356"`、打工 `"357"`）。购买后应重新查询 [当前活动库存](./qqpet_get_story_process)；购买不会直接应用道具效果，使用须另调 [qqpet_use_props](./qqpet_use_props)。不要将下方洗护示例的商品、场景或币种直接套用于活动道具购买。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_place_order",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
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
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | [Request](#request) | 否 | 本次操作的参数，默认 `{}` |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `account` | [Account](#request-account) | 否 | 本次购买的账号和宠物信息 |
| `currency_type` | number | 否 | 币种，Android页面示例为1001 |
| `goods` | [Good[]](#request-goods) | 否 | 购买的商品列表 |
| `scene` | number | 否 | 购买场景；洗护用品示例为21 |

### request.account（Account） {#request-account}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `platform` | number | 否 | 购买平台值，Android示例为1 |
| `currency_type` | number | 否 | 币种，Android页面示例为1001 |
| `pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |

### request.goods[]（Good） {#request-goods}

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
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `result` | number | 操作结果码；请求成功不代表该业务结果一定成功，请检查本字段 |
| `order_id` | string | 订单 ID |
| `field_3` | [Field3[]](#response-field-3) | 扩展数据，说明待补充 |
| `field_4` | [Field4[]](#response-field-4) | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充；标准 Base64 字符串 |

### response.field_3[]（Field3） {#response-field-3}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_3` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_4` | string | 扩展数据，说明待补充 |
| `field_5` | number | 扩展数据，说明待补充 |

### response.field_4[]（Field4） {#response-field-4}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_2` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_3` | number | 扩展数据，说明待补充 |
