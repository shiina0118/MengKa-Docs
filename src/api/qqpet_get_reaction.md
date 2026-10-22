# qqpet_get_reaction

获取宠物行为反应。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_reaction",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "pet_id": "PET_ID",
      "page": 1000
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_reaction' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "pet_id": "PET_ID",
    "page": 1000
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
| `request` | [Request](#request) | 否 | 本次操作的参数，默认 `{}` |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |
| `page` | number | 否 | 页面场景值；活动详情示例为6000，行为反应示例为1000 |
| `field_3` | boolean | 否 | 扩展数据，说明待补充 |
| `field_4` | number | 否 | 扩展数据，说明待补充 |
| `field_99` | number | 否 | 扩展数据，说明待补充 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `items` | [Item[]](#response-items) | 条目列表 |
| `field_2` | number | 扩展数据，说明待补充 |

### response.items[]（Item） {#response-items}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_2` | number | 扩展数据，说明待补充 |
| `field_3` | [Field3](#response-items-field-3) | 扩展数据，说明待补充 |
| `field_4` | [Field4](#response-items-field-4) | 扩展数据，说明待补充 |

### response.items[].field_3（Field3） {#response-items-field-3}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | object[] | 扩展数据，说明待补充；内部结构未整理 |
| `field_3` | boolean | 扩展数据，说明待补充 |
| `field_4` | boolean | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充 |
| `field_6` | [Field6[]](#response-items-field-3-field-6) | 扩展数据，说明待补充 |
| `field_7` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_8` | object[] | 扩展数据，说明待补充；内部结构未整理 |

### response.items[].field_3.field_6[]（Field6） {#response-items-field-3-field-6}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `key` | string | 扩展数据，说明待补充 |
| `value` | string | 扩展数据，说明待补充 |

### response.items[].field_4（Field4） {#response-items-field-4}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | [Field1[]](#response-items-field-4-field-1) | 扩展数据，说明待补充 |
| `field_2` | [Field2[]](#response-items-field-4-field-2) | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充 |
| `field_4` | number | 扩展数据，说明待补充 |
| `field_5` | number | 扩展数据，说明待补充 |
| `field_6` | string | 扩展数据，说明待补充 |

### response.items[].field_4.field_1[]（Field1） {#response-items-field-4-field-1}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `key` | number | 扩展数据，说明待补充 |
| `value` | number | 扩展数据，说明待补充 |

### response.items[].field_4.field_2[]（Field2） {#response-items-field-4-field-2}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `key` | number | 扩展数据，说明待补充 |
| `value` | number | 扩展数据，说明待补充 |
