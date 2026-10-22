# qqpet_get_interaction_history

获取宠物互动历史。仅支持 `android` 账号。

按序列值分页读取历史；首次传"0"，后续使用返回的 `next_seq`。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_interaction_history",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "cursor_seq": "0",
      "count": 20
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_interaction_history' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "cursor_seq": "0",
    "count": 20
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
| `cursor_seq` | string | 否 | 上一页返回的序列值，首页可传"0"；十进制整数字符串 |
| `count` | number | 否 | 数量 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `messages` | [Message[]](#response-messages) | 互动消息列表 |
| `has_more` | boolean | 是否还有下一页 |
| `next_seq` | string | 下一页序列值；十进制整数字符串 |

### response.messages[]（Message） {#response-messages}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_4` | string | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充 |
| `field_6` | number | 扩展数据，说明待补充 |
| `field_7` | number | 扩展数据，说明待补充 |
| `field_8` | string | 扩展数据，说明待补充；标准 Base64 字符串 |
| `field_9` | [Field9](#response-messages-field-9) | 扩展数据，说明待补充 |
| `field_10` | boolean | 扩展数据，说明待补充 |
| `field_11` | [Field11](#response-messages-field-11) | 扩展数据，说明待补充 |
| `field_100` | string | 扩展数据，说明待补充 |
| `field_101` | string | 扩展数据，说明待补充 |

### response.messages[].field_9（Field9） {#response-messages-field-9}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | number | 扩展数据，说明待补充 |
| `field_3` | boolean | 扩展数据，说明待补充 |
| `field_4` | string | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_6` | number | 扩展数据，说明待补充 |
| `field_7` | object | 扩展数据，说明待补充；内部结构未整理 |
| `field_8` | number | 扩展数据，说明待补充 |
| `field_9` | boolean | 扩展数据，说明待补充 |
| `field_10` | boolean | 扩展数据，说明待补充 |
| `field_11` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_12` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_13` | object | 扩展数据，说明待补充；内部结构未整理 |

### response.messages[].field_11（Field11） {#response-messages-field-11}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object | 扩展数据，说明待补充；内部结构未整理 |
| `field_2` | object | 扩展数据，说明待补充；内部结构未整理 |
| `field_3` | number | 扩展数据，说明待补充 |
| `field_4` | object | 扩展数据，说明待补充；内部结构未整理 |
| `field_5` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_6` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_7` | string | 扩展数据，说明待补充 |
| `field_8` | boolean | 扩展数据，说明待补充 |
| `field_9` | string[] | 扩展数据，说明待补充 |
| `field_10` | [Field9](#response-messages-field-9) | 扩展数据，说明待补充 |
| `field_11` | number | 扩展数据，说明待补充 |
| `field_12` | object | 扩展数据，说明待补充；内部结构未整理 |
| `field_13` | object | 扩展数据，说明待补充；内部结构未整理 |
| `field_14` | object | 扩展数据，说明待补充；内部结构未整理 |
| `field_15` | number | 扩展数据，说明待补充 |
| `field_16` | object | 扩展数据，说明待补充；内部结构未整理 |
| `field_17` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_18` | boolean | 扩展数据，说明待补充 |
| `field_19` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_20` | string | 扩展数据，说明待补充 |
| `field_21` | object | 扩展数据，说明待补充；内部结构未整理 |
| `field_22` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_23` | string | 扩展数据，说明待补充 |
