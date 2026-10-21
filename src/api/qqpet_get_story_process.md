# qqpet_get_story_process

获取宠物活动过程。仅支持 `android` 账号。

读取活动过程文字及继续查询提示。此接口不执行鼓励操作；根据返回提示控制查询间隔。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const request = {
  "story_id": "STORY_ID",
  "pet_id": "PET_ID",
  "outdoor_version": 2
}
const result = await api.qqpet_get_story_process(self_id, platform, request)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_story_process' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
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
| `platform` | string | 是 | `android`；`phone`、`pad` 视为 `android` |
| `request` | object | 否 | 本次操作的参数，默认 `{}` |

### request

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `request.story_id` | string | 否 | 活动状态返回的任务 ID |
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
| `process_info` | object | 活动过程信息 |
| `need_next_request` | number | 是否需要继续获取过程；1表示需要 |
| `timeout` | string | 下次过程查询的等待时间，以返回值为准；十进制整数字符串 |
| `together_info` | object | 一起活动的信息 |
| `event_type` | number | 活动类型：6100 学习、6400 工作、6700 冒险、6900 PK |
| `career_type` | number | 职业类型，使用职业树或总览返回的值 |
| `school_stage` | number | 学习阶段，使用活动总览返回的值 |
| `field_8` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_9` | boolean | 扩展数据，说明待补充 |
| `field_10` | object | 扩展数据，说明待补充 |
| `field_11` | object | 扩展数据，说明待补充 |
| `field_12` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_13` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_14` | string | 扩展数据，说明待补充；十进制整数字符串 |

### response.process_info

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `items` | object[] | 条目列表 |

### response.process_info.items[]

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `time` | string | 条目时间值；十进制整数字符串 |
| `left_seconds` | number | 剩余秒数 |
| `content` | string | 过程文字 |

### response.together_info

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充 |

### response.field_10

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object | 扩展数据，说明待补充 |
| `field_2` | object | 扩展数据，说明待补充 |
| `field_3` | number | 扩展数据，说明待补充 |
| `field_4` | number | 扩展数据，说明待补充 |

### response.field_10.field_1

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充 |
| `field_4` | string | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充 |
| `field_6` | string | 扩展数据，说明待补充 |

### response.field_10.field_2

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object[] | 扩展数据，说明待补充 |
