# qqpet_report_action

上报宠物行为。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const request = {
  "action_id": "ACTION_ID",
  "action_scene": "ACTION_SCENE",
  "bubble_source": "SOURCE",
  "timestamp_ms": "1792500000000",
  "bubble_id": "BUBBLE_ID"
}
const result = await api.qqpet_report_action(self_id, platform, request)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_report_action' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "request": {
    "action_id": "ACTION_ID",
    "action_scene": "ACTION_SCENE",
    "bubble_source": "SOURCE",
    "timestamp_ms": "1792500000000",
    "bubble_id": "BUBBLE_ID"
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
| `request.action_id` | string | 否 | 行为 ID |
| `request.action_scene` | string | 否 | 行为场景 |
| `request.bubble_source` | string | 否 | 气泡来源 |
| `request.timestamp_ms` | string | 否 | 时间，Unix 毫秒 |
| `request.bubble_id` | string | 否 | 气泡 ID |

较长的 ID 或序号请使用字符串，避免 JavaScript 数字精度丢失。

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展结果，说明待补充 |
