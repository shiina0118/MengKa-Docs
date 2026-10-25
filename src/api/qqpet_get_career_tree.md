# qqpet_get_career_tree

获取宠物职业树。仅支持 `android` 账号。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_career_tree",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "pet_id": "PET_ID",
      "outdoor_version": 2
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
| `pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |
| `outdoor_version` | number | 否 | 户外功能版本；当前调用示例为2 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `pet_id` | string | 宠物 ID，不能用 QQ 号代替 |
| `attributes` | [Attributes](#response-attributes) | 成长属性 |
| `careers` | [Career[]](#response-careers) | 职业条目列表 |

### response.attributes（Attributes） {#response-attributes}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | [Field1](#response-attributes-field-1) | 扩展数据，说明待补充 |
| `field_2` | [Field1](#response-attributes-field-1) | 扩展数据，说明待补充 |
| `field_3` | [Field1](#response-attributes-field-1) | 扩展数据，说明待补充 |

### response.attributes.field_1（Field1） {#response-attributes-field-1}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充；十进制整数字符串 |

### response.careers[]（Career） {#response-careers}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充 |
| `field_4` | [Field4[]](#response-careers-field-4) | 扩展数据，说明待补充 |

### response.careers[].field_4[]（Field4） {#response-careers-field-4}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充 |
| `field_3` | number | 扩展数据，说明待补充 |
| `field_4` | boolean | 扩展数据，说明待补充 |
| `field_5` | boolean | 扩展数据，说明待补充 |
| `field_6` | boolean | 扩展数据，说明待补充 |
| `field_7` | object | 扩展数据，含义暂未明确 |
| `field_8` | boolean | 扩展数据，说明待补充 |
| `field_9` | string | 扩展数据，说明待补充 |
