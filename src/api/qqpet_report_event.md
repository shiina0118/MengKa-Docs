# qqpet_report_event

上报宠物事件。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_report_event",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "field_1": "example",
      "field_3": {
        "field_1": 1
      }
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_report_event' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "field_1": "example",
    "field_3": {
      "field_1": 1
    }
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
| `field_1` | string | 否 | 扩展参数，说明待补充 |
| `field_2` | string | 否 | 扩展参数，说明待补充 |
| `field_3` | [Field3](#request-field-3) | 否 | 扩展参数，说明待补充 |
| `field_4` | object | 否 | 扩展参数，含义暂未明确 |
| `field_5` | object | 否 | 扩展参数，含义暂未明确 |
| `field_6` | [Field6[]](#request-field-6) | 否 | 扩展参数，说明待补充 |
| `field_90` | object | 否 | 扩展参数，含义暂未明确 |
| `field_99` | number | 否 | 扩展参数，说明待补充 |

### request.field_6[]（Field6） {#request-field-6}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `key` | string | 否 | 扩展参数，说明待补充 |
| `value` | string | 否 | 扩展参数，说明待补充 |

### request.field_3（Field3） {#request-field-3}

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展参数，说明待补充 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string[] | 扩展结果，说明待补充 |
