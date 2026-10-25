# qqpet_report_clothing_red_dot

上报宠物装扮红点。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_report_clothing_red_dot",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "red_dots": [
        {
          "field_1": 1,
          "field_2": "123"
        }
      ],
      "field_2": "123"
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_report_clothing_red_dot' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "red_dots": [
      {
        "field_1": 1,
        "field_2": "123"
      }
    ],
    "field_2": "123"
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
| `red_dots` | [RedDot[]](#request-red-dots) | 否 | 红点信息列表 |
| `field_2` | string | 否 | 扩展参数，说明待补充 |

### request.red_dots[]（RedDot） {#request-red-dots}

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展参数，说明待补充 |
| `field_2` | string | 扩展参数，说明待补充 |

较长的 ID 或序号请使用字符串，避免 JavaScript 数字精度丢失。

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据；`_unknown_fields` 为 Base64 字符串数组，内容含义暂未明确 |
