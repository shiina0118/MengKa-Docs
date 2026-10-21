# qqpet_set_device_info

设置宠物设备信息。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const request = {
  "device_info": {
    "device": "DEVICE",
    "available": true,
    "score": 0
  }
}
const result = await api.qqpet_set_device_info(self_id, platform, request)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_set_device_info' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "request": {
    "device_info": {
      "device": "DEVICE",
      "available": true,
      "score": 0
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
| `request.device_info` | object | 否 | 设备信息 |

### request.device_info

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `device` | string | 设备名称 |
| `available` | boolean | 是否可用 |
| `score` | number | 评分 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |
