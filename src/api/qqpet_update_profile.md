# qqpet_update_profile

更新宠物资料。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_update_profile",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "filter": {
        "field_1": 1
      },
      "profile": {
        "pet_name": "Momo"
      }
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_update_profile' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "filter": {
      "field_1": 1
    },
    "profile": {
      "pet_name": "Momo"
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
| `filter` | [Filter](#request-filter) | 否 | 要更新的资料项 |
| `profile` | [PetProfile](#pet-profile) | 否 | 宠物资料 |
| `field_3` | string | 否 | 扩展参数，说明待补充 |

### request.filter（Filter） {#request-filter}

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展参数，说明待补充 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据，没有已解析的字段；服务端返回的未知内容以 Base64 字符串数组保留在 `_unknown_fields` 中 |

<!--@include: ../../snippets/qqpet/profile.md-->
