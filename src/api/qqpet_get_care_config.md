# qqpet_get_care_config

获取宠物一键照料配置。仅支持 `android` 账号。

先读取配置，再按当前宠物状态计算预计消耗和经验，用于一键照料。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_care_config",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "pet_id": "PET_ID",
      "version": 4
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_care_config' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "pet_id": "PET_ID",
    "version": 4
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
| `request.pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |
| `request.version` | number | 否 | 操作版本；照料配置与执行示例为4，补给信息示例为2 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object | 扩展数据，说明待补充 |
| `field_2` | object | 扩展数据，说明待补充 |
| `field_3` | object | 扩展数据，说明待补充 |
| `field_4` | object | 扩展数据，说明待补充 |

### response.field_1

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | number | 扩展数据，说明待补充 |
| `field_3` | number | 扩展数据，说明待补充 |

### response.field_2

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | number | 扩展数据，说明待补充 |
| `field_3` | number | 扩展数据，说明待补充 |
| `field_4` | number | 扩展数据，说明待补充 |
| `field_5` | number | 扩展数据，说明待补充 |
| `field_6` | number | 扩展数据，说明待补充 |
| `field_7` | number | 扩展数据，说明待补充 |
| `field_8` | number | 扩展数据，说明待补充 |
| `field_9` | object | 扩展数据，说明待补充 |
| `field_10` | object | 扩展数据，说明待补充 |

### response.field_2.field_9

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | number | 扩展数据，说明待补充 |
| `field_3` | number | 扩展数据，说明待补充 |

### response.field_3

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | boolean | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充 |
| `field_4` | string | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充 |
| `field_6` | string | 扩展数据，说明待补充 |
| `field_7` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_8` | string | 扩展数据，说明待补充；十进制整数字符串 |
