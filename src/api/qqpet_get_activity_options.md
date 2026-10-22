# qqpet_get_activity_options

获取宠物活动选项。仅支持 `android` 账号。

读取当前可选活动、耗时、消耗、奖励与限制提示。不要仅凭选项名称推断是否可执行。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_activity_options",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "event_type": 6100,
      "pet_id": "PET_ID",
      "school_stage": 1,
      "outdoor_version": 2
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_activity_options' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
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
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | [Request](#request) | 否 | 本次操作的参数，默认 `{}` |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `event_type` | number | 否 | 活动类型：6100 学习、6400 工作、6700 冒险、6900 PK |
| `pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |
| `target_pet_id` | string | 否 | 对方宠物 ID |
| `field_4` | string | 否 | 扩展数据，说明待补充 |
| `career_type` | number | 否 | 职业类型，使用职业树或总览返回的值 |
| `school_stage` | number | 否 | 学习阶段，使用活动总览返回的值 |
| `outdoor_version` | number | 否 | 户外功能版本；当前调用示例为2 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `items` | [Item[]](#response-items) | 条目列表 |
| `field_2` | string | 扩展数据，说明待补充 |
| `pk_guard` | [PkGuard](#response-pk-guard) | PK保镖信息 |
| `rule_name` | string | 活动规则标题 |
| `rule_jump_url` | string | 活动规则链接 |
| `field_12` | string | 扩展数据，说明待补充 |

### response.items[]（Item） {#response-items}

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

### response.pk_guard（PkGuard） {#response-pk-guard}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | [Field1](#response-pk-guard-field-1) | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_3` | number | 扩展数据，说明待补充 |

### response.pk_guard.field_1（Field1） {#response-pk-guard-field-1}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object | 扩展数据，说明待补充；内部结构未整理 |
| `field_2` | object | 扩展数据，说明待补充；内部结构未整理 |
| `field_3` | number | 扩展数据，说明待补充 |
| `field_4` | number | 扩展数据，说明待补充 |
