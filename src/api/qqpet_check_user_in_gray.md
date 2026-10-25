# qqpet_check_user_in_gray

检查宠物灰度资格。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_check_user_in_gray",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "field_2": "example"
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_check_user_in_gray' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "field_2": "example"
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
| `field_1` | boolean | 否 | 扩展参数，说明待补充 |
| `field_2` | string | 否 | 扩展参数，说明待补充 |
| `field_3` | boolean | 否 | 扩展参数，说明待补充 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | boolean | 扩展结果，说明待补充 |
| `field_2` | object | 扩展结果，含义暂未明确 |
| `field_3` | string | 扩展结果，说明待补充 |
| `field_4` | string | 扩展结果，说明待补充 |
| `field_5` | boolean | 扩展结果，说明待补充 |
