# qqpet_set_device_info

设置宠物设备信息。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_set_device_info",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "device_info": {
        "device": "DEVICE",
        "available": true,
        "score": 0
      }
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_set_device_info' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
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
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | [Request](#request) | 否 | 本次操作的参数，默认 `{}` |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `device_info` | [DeviceInfo](#request-device-info) | 否 | 设备信息 |

### request.device_info（DeviceInfo） {#request-device-info}

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `device` | string | 设备名称 |
| `available` | boolean | 是否可用 |
| `score` | number | 评分 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据，没有已解析的字段；服务端返回的未知内容以 Base64 字符串数组保留在 `_unknown_fields` 中 |
