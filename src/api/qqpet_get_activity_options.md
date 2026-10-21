# qqpet_get_activity_options

获取宠物活动选项。仅支持 `android` 账号。

读取当前可选活动、耗时、消耗、奖励与限制提示。不要仅凭选项名称推断是否可执行。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const request = {
  "event_type": 6100,
  "pet_id": "PET_ID",
  "school_stage": 1,
  "outdoor_version": 2
}
const result = await api.qqpet_get_activity_options(self_id, platform, request)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_activity_options' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "request": {
    "event_type": 6100,
    "pet_id": "PET_ID",
    "school_stage": 1,
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
| `platform` | string | 是 | `android`；`phone`、`pad` 视为 `android` |
| `request` | object | 否 | 本次操作的参数，默认 `{}` |

### request

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `request.event_type` | number | 否 | 活动类型：6100 学习、6400 工作、6700 冒险、6900 PK |
| `request.pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |
| `request.target_pet_id` | string | 否 | 对方宠物 ID |
| `request.field_4` | string | 否 | 扩展数据，说明待补充 |
| `request.career_type` | number | 否 | 职业类型，使用职业树或总览返回的值 |
| `request.school_stage` | number | 否 | 学习阶段，使用活动总览返回的值 |
| `request.outdoor_version` | number | 否 | 户外功能版本；当前调用示例为2 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `items` | object[] | 条目列表 |
| `field_2` | string | 扩展数据，说明待补充 |
| `pk_guard` | object | PK保镖信息 |
| `rule_name` | string | 活动规则标题 |
| `rule_jump_url` | string | 活动规则链接 |
| `field_12` | string | 扩展数据，说明待补充 |

### response.items[]

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `event_name` | string | 所选活动的名称；以活动选项返回值为准 |
| `event_icon` | string | 本次操作的event_icon数据 |
| `level` | number | 级别 |
| `level_value` | number | 本次操作的level_value数据 |
| `level_total` | number | 本次操作的level_total数据 |
| `cost` | string | 消耗展示文本 |
| `cost_time` | string | 耗时展示文本 |
| `reward` | string | 奖励展示文本 |
| `reward_extra` | string | 本次操作的reward_extra数据 |
| `possible_event` | string | 本次操作的possible_event数据 |
| `field_11` | string | 扩展数据，说明待补充 |
| `reward_has_other` | string | 本次操作的reward_has_other数据 |
| `field_13` | string | 扩展数据，说明待补充 |
| `field_14` | string | 扩展数据，说明待补充 |
| `can_do` | boolean | 当前选项是否可执行 |
| `toast_msg` | string | 选项的提示信息 |
| `sub_event_type` | number | 所选活动选项返回的细分事件值；PK 示例为6901 |

### response.pk_guard

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_3` | number | 扩展数据，说明待补充 |

### response.pk_guard.field_1

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object | 扩展数据，说明待补充 |
| `field_2` | object | 扩展数据，说明待补充 |
| `field_3` | number | 扩展数据，说明待补充 |
| `field_4` | number | 扩展数据，说明待补充 |
