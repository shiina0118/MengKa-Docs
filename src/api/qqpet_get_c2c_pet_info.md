# qqpet_get_c2c_pet_info

获取 C2C 宠物信息。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const request = {
  "field_1": "123456789",
  "field_2": {
    "field_1": 1,
    "field_2": 1,
    "field_3": 1
  }
}
const result = await api.qqpet_get_c2c_pet_info(self_id, platform, request)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_c2c_pet_info' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "request": {
    "field_1": "123456789",
    "field_2": {
      "field_1": 1,
      "field_2": 1,
      "field_3": 1
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
| `platform` | string | 是 | `android`；`phone`、`pad` 视为 `android` |
| `request` | object | 否 | 本次操作的参数，默认 `{}` |

### request

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `request.field_1` | string | 否 | 扩展参数，说明待补充 |
| `request.field_2` | object | 否 | 扩展参数，说明待补充 |

### request.field_2

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展参数，说明待补充 |
| `field_2` | number | 扩展参数，说明待补充 |
| `field_3` | number | 扩展参数，说明待补充 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object | 扩展结果，说明待补充 |
| `field_2` | object | 扩展结果，说明待补充 |
| `field_3` | string | 扩展结果，说明待补充 |
| `field_4` | number | 扩展结果，说明待补充 |
