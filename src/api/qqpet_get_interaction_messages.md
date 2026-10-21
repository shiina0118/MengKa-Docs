# qqpet_get_interaction_messages

获取宠物互动消息摘要。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const request = {}
const result = await api.qqpet_get_interaction_messages(self_id, platform, request)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_interaction_messages' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "request": {}
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

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `messages` | object[] | 互动消息列表 |
| `extra_messages` | object[] | 其他互动消息列表 |
| `field_3` | boolean | 扩展数据，说明待补充 |

### response.messages[]

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
| `field_9` | object | 扩展数据，说明待补充 |
| `field_10` | boolean | 扩展数据，说明待补充 |
| `field_11` | object | 扩展数据，说明待补充 |
| `field_100` | string | 扩展数据，说明待补充 |
| `field_101` | string | 扩展数据，说明待补充 |

### response.messages[].field_9

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | number | 扩展数据，说明待补充 |
| `field_3` | boolean | 扩展数据，说明待补充 |
| `field_4` | string | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_6` | number | 扩展数据，说明待补充 |
| `field_7` | object | 扩展数据，说明待补充 |
| `field_8` | number | 扩展数据，说明待补充 |
| `field_9` | boolean | 扩展数据，说明待补充 |
| `field_10` | boolean | 扩展数据，说明待补充 |
| `field_11` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_12` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_13` | object | 扩展数据，说明待补充 |

### response.messages[].field_11

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object | 扩展数据，说明待补充 |
| `field_2` | object | 扩展数据，说明待补充 |
| `field_3` | number | 扩展数据，说明待补充 |
| `field_4` | object | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_6` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_7` | string | 扩展数据，说明待补充 |
| `field_8` | boolean | 扩展数据，说明待补充 |
| `field_9` | string[] | 扩展数据，说明待补充 |
| `field_10` | object | 扩展数据，说明待补充 |
| `field_11` | number | 扩展数据，说明待补充 |
| `field_12` | object | 扩展数据，说明待补充 |
| `field_13` | object | 扩展数据，说明待补充 |
| `field_14` | object | 扩展数据，说明待补充 |
| `field_15` | number | 扩展数据，说明待补充 |
| `field_16` | object | 扩展数据，说明待补充 |
| `field_17` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_18` | boolean | 扩展数据，说明待补充 |
| `field_19` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_20` | string | 扩展数据，说明待补充 |
| `field_21` | object | 扩展数据，说明待补充 |
| `field_22` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_23` | string | 扩展数据，说明待补充 |
