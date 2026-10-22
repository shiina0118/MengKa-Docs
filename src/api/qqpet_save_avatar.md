# qqpet_save_avatar

保存宠物头像。仅支持 `android` 账号。

先查询当前宠物，保留装扮和模型的完整对象后保存。下例保存当前外观；修改外观时，应使用账号已拥有的装扮数据。

## 调用

<ApiCallTabs>
<template #websocket>

1. 查询当前宠物：

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_user_pet",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "pet_id": "example-pet-id"
    }
  }
}
```

2. 从响应 `data.response.pet` 取出 `field_2`（装扮列表）和 `field_3`（模型信息），原样填入 `request.field_1` 和 `request.field_2` 后保存：

```json
{
  "type": "action",
  "id": "2",
  "action": "qqpet_save_avatar",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "field_1": [],
      "field_2": {}
    }
  }
}
```

`field_2` 不是数组或 `field_3` 缺失时，说明宠物装扮或模型信息不完整，不应继续保存。

</template>
<template #http>

```js
const baseURL = 'http://127.0.0.1:3003'
const headers = {
  Authorization: 'Bearer TOKEN',
  'Content-Type': 'application/json',
}
const account = { self_id: 123456789, protocol_id: 0 }

const petResponse = await fetch(baseURL + '/api/qqpet_get_user_pet', {
  method: 'POST', headers,
  body: JSON.stringify({ ...account, request: { pet_id: 'example-pet-id' } }),
})
const lookup = await petResponse.json()
if (!petResponse.ok || !lookup.ok) throw new Error(lookup.error || '查询宠物失败')
const pet = lookup.data.response.pet
if (!pet || !Array.isArray(pet.field_2) || !pet.field_3) {
  throw new Error('宠物装扮或模型信息不完整')
}
const request = { field_1: pet.field_2, field_2: pet.field_3 }
const response = await fetch(baseURL + '/api/qqpet_save_avatar', {
  method: 'POST', headers, body: JSON.stringify({ ...account, request }),
})
const result = await response.json()
if (!response.ok || !result.ok) throw new Error(result.error || '保存头像失败')
console.log(result.data)
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | [Request](#request) | 是 | 本次操作的参数 |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `field_1` | [PetAccessory[]](#pet-accessory) | 是 | 装扮列表，来自 `qqpet_get_user_pet` 的 `response.pet.field_2` |
| `field_2` | [PetModel](#pet-model) | 是 | 模型信息，来自同次查询的 `response.pet.field_3` |

较长的 ID 或序号请使用字符串，避免 JavaScript 数字精度丢失。不要将整个 `pet` 对象直接作为 `request`。

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据，没有已解析的字段；服务端返回的未知内容以 Base64 字符串数组保留在 `_unknown_fields` 中 |

<!--@include: ../../snippets/qqpet/accessory.md-->

<!--@include: ../../snippets/qqpet/model.md-->
