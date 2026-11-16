# qqpet_get_clothing

获取宠物装扮及商店页面状态。仅支持 `android` 账号。

本接口只读取商品和状态，不执行领取道具、观看广告或其他领取操作。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_clothing",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "client_version": "9.3.70",
      "field_2": "123456789"
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
| `client_version` | string | 否 | 客户端版本 |
| `field_2` | string | 否 | 扩展参数，说明待补充 |
| `field_6` | string | 否 | 扩展参数，说明待补充 |

较长的 ID 或序号请使用字符串，避免 JavaScript 数字精度丢失。

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | [Field1[]](#response-field-1) | 扩展结果，说明待补充 |
| `field_2` | object[] | 扩展结果，含义暂未明确 |
| `field_3` | object | 扩展结果，含义暂未明确 |
| `field_4` | object[] | 扩展结果，含义暂未明确 |
| `field_5` | boolean | 兼容字段，与 `is_limit_free` 同值 |
| `is_limit_free` | boolean | 是否显示限时免费提示；不等同于今日可领取，也不表示广告礼包状态 |

### 限免状态说明

- `is_limit_free` 只表示本次查询的页面是否需要显示限时免费提示。
- 免费道具按每天一次处理；本接口不返回领取次数，也不执行领取。
- 当前响应不提供可确认的广告礼包状态字段，不能用 `is_limit_free` 推断广告礼包是否可领取。

### response.field_1[]（Field1） {#response-field-1}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `key` | number | 扩展数据，说明待补充 |
| `value` | [PetAccessoryGroup](#pet-accessory-group) | 扩展数据，说明待补充 |

<!--@include: ../../snippets/qqpet/suit.md-->

<!--@include: ../../snippets/qqpet/accessory.md-->

<!--@include: ../../snippets/qqpet/model.md-->
