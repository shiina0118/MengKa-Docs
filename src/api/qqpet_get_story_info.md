# qqpet_get_story_info

获取宠物活动详情。仅支持 `android` 账号。

读取指定任务的详细状态。`story_id` 来自活动状态或启动结果。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_story_info",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "page": 6000,
      "pet_id": "PET_ID",
      "story_id": "STORY_ID",
      "outdoor_version": 2
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_story_info' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "page": 6000,
    "pet_id": "PET_ID",
    "story_id": "STORY_ID",
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
| `request.page` | number | 否 | 页面场景值；活动详情示例为6000，行为反应示例为1000 |
| `request.pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |
| `request.story_id` | string | 否 | 活动状态返回的任务 ID |
| `request.outdoor_version` | number | 否 | 户外功能版本；当前调用示例为2 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object[] | 扩展数据，说明待补充 |
| `status_info` | object | 活动状态信息 |
| `field_3` | string | 扩展数据，说明待补充 |
| `field_4` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_5` | object | 扩展数据，说明待补充 |
| `field_6` | object | 扩展数据，说明待补充 |
| `pk_battle` | object | PK双方与战斗结果 |
| `field_8` | number | 扩展数据，说明待补充 |
| `field_9` | string | 扩展数据，说明待补充 |
| `field_100` | object | 扩展数据，说明待补充 |

### response.field_1[]

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

### response.field_1[].field_22

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object[] | 扩展数据，说明待补充 |

### response.status_info

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_3` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_4` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_5` | boolean | 扩展数据，说明待补充 |
| `field_6` | object | 扩展数据，说明待补充 |

### response.status_info.field_6

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充 |
| `field_4` | string | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充 |
| `field_6` | string | 扩展数据，说明待补充 |

### response.field_5

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充 |

### response.field_6

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_2` | string | 扩展数据，说明待补充 |

### response.pk_battle

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object | 扩展数据，说明待补充 |
| `field_2` | object | 扩展数据，说明待补充 |
| `field_3` | object | 扩展数据，说明待补充 |
| `field_4` | object | 扩展数据，说明待补充 |
| `field_5` | number | 扩展数据，说明待补充 |
| `field_6` | boolean | 扩展数据，说明待补充 |

### response.pk_battle.field_1

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | number | 扩展数据，说明待补充 |
| `field_3` | number | 扩展数据，说明待补充 |
| `field_4` | number | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充 |
| `field_6` | string | 扩展数据，说明待补充 |
| `field_7` | object | 扩展数据，说明待补充 |
