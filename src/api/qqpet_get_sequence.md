# qqpet_get_sequence

获取宠物资源序列。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_sequence",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "field_1": "1",
      "client_version": "9.3.70",
      "field_4": [
        "123"
      ],
      "last_resource_hash": ""
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_sequence' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "field_1": "1",
    "client_version": "9.3.70",
    "field_4": [
      "123"
    ],
    "last_resource_hash": ""
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
| `client_version` | string | 否 | 客户端版本 |
| `field_3` | string | 否 | 扩展参数，说明待补充 |
| `field_4` | string[] | 否 | 扩展参数，说明待补充 |
| `last_resource_hash` | string | 否 | 上次获取的资源标识；首次可传空字符串 |

较长的 ID 或序号请使用字符串，避免 JavaScript 数字精度丢失。

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展结果，说明待补充 |
| `field_2` | [Field2[]](#response-field-2) | 扩展结果，说明待补充 |
| `field_3` | [Field3[]](#response-field-3) | 扩展结果，说明待补充 |
| `field_100` | string | 扩展结果，说明待补充 |
| `field_101` | string | 扩展结果，说明待补充 |

### response.field_2[]（Field2） {#response-field-2}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `key` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `value` | string | 扩展数据，说明待补充；十进制整数字符串 |

### response.field_3[]（Field3） {#response-field-3}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `key` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `value` | string | 扩展数据，说明待补充 |
