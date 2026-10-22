# qqpet_get_my_suits

获取我的宠物套装。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_my_suits",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "client_version": "9.3.70",
      "field_2": "123456789"
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_my_suits' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "client_version": "9.3.70",
    "field_2": "123456789"
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
| `client_version` | string | 否 | 客户端版本 |
| `field_2` | string | 否 | 当前宠物资源标识，来自 `qqpet_get_user_pet` 的 `response.pet.field_1` |

较长的 ID 或序号请使用字符串，避免 JavaScript 数字精度丢失。

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | [PetSuit[]](#pet-suit) | 我的套装列表；每项为完整套装对象，可作为保存套装的 `request.suit` |

保存时沿用本次查询的版本、宠物资源标识和完整套装对象。参见[查询后保存的完整示例](./qqpet_save_one_suit)。

<!--@include: ../../snippets/qqpet/suit.md-->

<!--@include: ../../snippets/qqpet/accessory.md-->

<!--@include: ../../snippets/qqpet/model.md-->
