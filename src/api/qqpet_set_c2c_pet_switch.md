# qqpet_set_c2c_pet_switch

设置 C2C 宠物开关。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_set_c2c_pet_switch",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "friend_uin": "123456789",
      "field_2": {
        "field_3": 1
      },
      "is_open": 1
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_set_c2c_pet_switch' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "friend_uin": "123456789",
    "field_2": {
      "field_3": 1
    },
    "is_open": 1
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
| `friend_uin` | string | 否 | 好友 QQ 号 |
| `field_2` | [Field2](#request-field-2) | 否 | 扩展参数，说明待补充 |
| `is_open` | number | 否 | 是否开启，0 关闭、1 开启 |

### request.field_2（Field2） {#request-field-2}

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `field_3` | number | 扩展参数，说明待补充 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据，没有已解析的字段；服务端返回的未知内容以 Base64 字符串数组保留在 `_unknown_fields` 中 |
