# qqpet_get_story_process

获取宠物活动过程。仅支持 `android` 账号。

读取活动过程文字及继续查询提示。此接口不执行鼓励操作；根据返回提示控制查询间隔。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_story_process",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "story_id": "STORY_ID",
      "pet_id": "PET_ID",
      "outdoor_version": 2
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_story_process' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "story_id": "STORY_ID",
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
| `request` | [Request](#request) | 否 | 本次操作的参数，默认 `{}` |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `story_id` | string | 否 | 活动状态返回的任务 ID |
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
| `process_info` | [ProcessInfo](#response-process-info) | 活动过程信息 |
| `need_next_request` | number | 是否需要继续获取过程；1表示需要 |
| `timeout` | string | 下次过程查询的等待时间，以返回值为准；十进制整数字符串 |
| `together_info` | [TogetherInfo](#response-together-info) | 一起活动的信息 |
| `event_type` | number | 活动类型：6100 学习、6400 工作、6700 冒险、6900 PK |
| `career_type` | number | 职业类型，使用职业树或总览返回的值 |
| `school_stage` | number | 学习阶段，使用活动总览返回的值 |
| `field_8` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_9` | boolean | 扩展数据，说明待补充 |
| `field_10` | [Field10](#response-field-10) | 扩展数据，说明待补充 |
| `field_11` | [Field10](#response-field-10) | 扩展数据，说明待补充 |
| `field_12` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_13` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_14` | string | 扩展数据，说明待补充；十进制整数字符串 |

### response.process_info（ProcessInfo） {#response-process-info}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `items` | [Item[]](#response-process-info-items) | 条目列表 |

### response.process_info.items[]（Item） {#response-process-info-items}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `time` | string | 条目时间值；十进制整数字符串 |
| `left_seconds` | number | 剩余秒数 |
| `content` | string | 过程文字 |

### response.together_info（TogetherInfo） {#response-together-info}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充 |

### response.field_10（Field10） {#response-field-10}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | [Field1](#response-field-10-field-1) | 扩展数据，说明待补充 |
| `field_2` | [Field2](#response-field-10-field-2) | 扩展数据，说明待补充 |
| `field_3` | number | 扩展数据，说明待补充 |
| `field_4` | number | 扩展数据，说明待补充 |

### response.field_10.field_1（Field1） {#response-field-10-field-1}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充 |
| `field_4` | string | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充 |
| `field_6` | string | 扩展数据，说明待补充 |

### response.field_10.field_2（Field2） {#response-field-10-field-2}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object[] | 扩展数据，含义暂未明确 |
