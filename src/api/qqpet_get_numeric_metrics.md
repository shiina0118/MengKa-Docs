# qqpet_get_numeric_metrics

获取宠物数值指标。仅支持 `android` 账号。

按指标类型读取结果。每项 `payload` 是该类型的数据，保留 Base64 字符串；不同类型的数据结构不同。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const request = {
  "pet_id": "PET_ID",
  "msg_types": [
    3,
    5,
    9
  ]
}
const result = await api.qqpet_get_numeric_metrics(self_id, platform, request)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_numeric_metrics' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "request": {
    "pet_id": "PET_ID",
    "msg_types": [
      3,
      5,
      9
    ]
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
| `request.pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |
| `request.msg_types` | number[] | 否 | 需要查询的指标类型列表，例如3为等级、5为金币、9为照料状态 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `items` | object[] | 条目列表 |
| `field_2` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_3` | string | 扩展数据，说明待补充；十进制整数字符串 |

### response.items[]

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `msg_type` | number | 本次操作的msg_type数据 |
| `payload` | string | 该指标类型对应的数据，使用标准 Base64 字符串返回 |
