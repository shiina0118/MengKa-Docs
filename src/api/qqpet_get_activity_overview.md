# qqpet_get_activity_overview

获取宠物活动总览与属性。仅支持 `android` 账号。

按学习或工作场景读取总览与成长属性；不返回独立的精确疲劳数值。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_activity_overview",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "event_type": 6100,
      "pet_id": "PET_ID",
      "outdoor_version": 2
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_activity_overview' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "event_type": 6100,
    "pet_id": "PET_ID",
    "outdoor_version": 2
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
| `request.event_type` | number | 否 | 活动类型：6100 学习、6400 工作、6700 冒险、6900 PK |
| `request.pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |
| `request.outdoor_version` | number | 否 | 户外功能版本；当前调用示例为2 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `stories` | object[] | 活动条目列表 |
| `attributes` | object | 成长属性 |
| `career_type` | number | 职业类型，使用职业树或总览返回的值 |
| `school_stage` | number | 学习阶段，使用活动总览返回的值 |
| `guide` | object | 当前引导信息 |

### response.stories[]

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充 |
| `field_3` | number | 扩展数据，说明待补充 |
| `field_4` | number | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充 |
| `field_20` | number | 扩展数据，说明待补充 |
| `field_21` | number | 扩展数据，说明待补充 |
| `field_22` | object | 扩展数据，说明待补充 |
| `field_23` | boolean | 扩展数据，说明待补充 |

### response.stories[].field_22

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object[] | 扩展数据，说明待补充 |

### response.attributes

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object | 扩展数据，说明待补充 |
| `field_2` | object | 扩展数据，说明待补充 |
| `field_3` | object | 扩展数据，说明待补充 |

### response.attributes.field_1

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | string | 名称 |
| `icon` | string | 图标地址 |
| `value` | string | 属性数值；十进制整数字符串 |
