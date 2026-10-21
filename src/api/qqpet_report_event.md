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
| `request` | object | 否 | 本次操作的参数，默认 `{}` |

### request

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `request.field_1` | string | 否 | 扩展参数，说明待补充 |
| `request.field_2` | string | 否 | 扩展参数，说明待补充 |
| `request.field_3` | object | 否 | 扩展参数，说明待补充 |
| `request.field_4` | object | 否 | 扩展参数，说明待补充 |
| `request.field_5` | object | 否 | 扩展参数，说明待补充 |
| `request.field_6` | object[] | 否 | 扩展参数，说明待补充 |
| `request.field_90` | object | 否 | 扩展参数，说明待补充 |
| `request.field_99` | number | 否 | 扩展参数，说明待补充 |

### request.field_3

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展参数，说明待补充 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string[] | 扩展结果，说明待补充 |
