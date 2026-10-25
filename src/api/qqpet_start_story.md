# qqpet_start_story

发起宠物活动或PK。仅支持 `android` 账号。

学习、工作、冒险和PK共用此接口。发起前查询活动选项，传入服务端返回的名称与细分事件值；PK需同时填写对方宠物及主人信息。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_start_story",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "event_type": 6900,
      "pet_id": "PET_ID",
      "target": {
        "pet_id": "TARGET_PET_ID",
        "uin": "987654321"
      },
      "target_uin": "987654321",
      "event_name": "PK",
      "sub_event_type": 6901,
      "outdoor_version": 2
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_start_story' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "event_type": 6900,
    "pet_id": "PET_ID",
    "target": {
      "pet_id": "TARGET_PET_ID",
      "uin": "987654321"
    },
    "target_uin": "987654321",
    "event_name": "PK",
    "sub_event_type": 6901,
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
| `field_3` | string | 否 | 扩展数据，说明待补充 |
| `target` | [Target](#request-target) | 否 | 对方宠物及主人信息 |
| `target_uin` | string | 否 | 对方主人 QQ 号 |
| `event_name` | string | 否 | 所选活动的名称；以活动选项返回值为准 |
| `sub_event_type` | number | 否 | 所选活动选项返回的细分事件值；PK 示例为6901 |
| `outdoor_version` | number | 否 | 户外功能版本；当前调用示例为2 |

### request.target（Target） {#request-target}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |
| `uin` | string | 否 | 主人 QQ 号 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `story_id` | string | 活动状态返回的任务 ID |
| `field_2` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `begin_info` | [BeginInfo](#response-begin-info) | 活动开始信息 |
| `status_info` | [StatusInfo](#response-status-info) | 活动状态信息 |
| `pk_battle` | [PkBattle](#response-pk-battle) | PK双方与战斗结果 |

### response.begin_info（BeginInfo） {#response-begin-info}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充 |

### response.status_info（StatusInfo） {#response-status-info}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_3` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_4` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_5` | boolean | 扩展数据，说明待补充 |
| `field_6` | [Field6](#response-status-info-field-6) | 扩展数据，说明待补充 |

### response.status_info.field_6（Field6） {#response-status-info-field-6}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充 |
| `field_4` | string | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充 |
| `field_6` | string | 扩展数据，说明待补充 |

### response.pk_battle（PkBattle） {#response-pk-battle}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | [Field1](#response-pk-battle-field-1) | 扩展数据，说明待补充 |
| `field_2` | [Field1](#response-pk-battle-field-1) | 扩展数据，说明待补充 |
| `field_3` | [Field1](#response-pk-battle-field-1) | 扩展数据，说明待补充 |
| `field_4` | [Field1](#response-pk-battle-field-1) | 扩展数据，说明待补充 |
| `field_5` | number | 扩展数据，说明待补充 |
| `field_6` | boolean | 扩展数据，说明待补充 |

### response.pk_battle.field_1（Field1） {#response-pk-battle-field-1}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | number | 扩展数据，说明待补充 |
| `field_3` | number | 扩展数据，说明待补充 |
| `field_4` | number | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充 |
| `field_6` | string | 扩展数据，说明待补充 |
| `field_7` | object | 扩展数据，含义暂未明确 |
