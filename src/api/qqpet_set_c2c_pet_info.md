# qqpet_set_c2c_pet_info

设置 C2C 宠物信息。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const request = {
  "field_1": {
    "action_type": 1,
    "position": {
      "position_type": 0,
      "x": 0.5,
      "y": 0.5
    }
  },
  "field_2": "123456789"
}
const result = await api.qqpet_set_c2c_pet_info(self_id, platform, request)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_set_c2c_pet_info' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "request": {
    "field_1": {
      "action_type": 1,
      "position": {
        "position_type": 0,
        "x": 0.5,
        "y": 0.5
      }
    },
    "field_2": "123456789"
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
| `request.field_1` | object | 否 | 扩展参数，说明待补充 |
| `request.field_2` | string | 否 | 扩展参数，说明待补充 |
| `request.field_3` | string | 否 | 扩展参数，说明待补充 |
| `request.field_4` | string | 否 | 扩展参数，说明待补充 |
| `request.field_5` | string[] | 否 | 扩展参数，说明待补充 |
| `request.field_6` | number | 否 | 扩展参数，说明待补充 |

### request.field_1

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `action_type` | number | 动作类型 |
| `position` | object | 宠物位置 |

### request.field_1.position

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `position_type` | number | 位置类型 |
| `x` | number | 横坐标 |
| `y` | number | 纵坐标 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |
