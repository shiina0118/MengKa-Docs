# qqpet_save_one_suit

保存宠物套装。仅支持 `android` 账号。

先查询已有套装，再传入完整套装对象。下例重新保存第一套已有套装；仅填写套装名称无法组成完整外观。

## 调用

<ApiCallTabs>
<template #websocket>

1. 查询已有套装。`field_2` 使用 `qqpet_get_user_pet` 返回的 `response.pet.field_1`，保持字符串形式：

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
      "field_2": "123"
    }
  }
}
```

2. 从响应 `data.response.field_1` 取出一套完整套装对象作为 `suit`，`field_1`、`field_2` 与查询时的 `client_version`、`field_2` 保持一致：

```json
{
  "type": "action",
  "id": "2",
  "action": "qqpet_save_one_suit",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "field_1": "9.3.70",
      "field_2": "123",
      "suit": {}
    }
  }
}
```

`data.response.field_1` 为空时表示当前没有可保存的套装。

</template>
<template #http>

```js
const baseURL = 'http://127.0.0.1:3003'
const headers = {
  Authorization: 'Bearer TOKEN',
  'Content-Type': 'application/json',
}
const account = { self_id: 123456789, protocol_id: 0 }

// 使用 qqpet_get_user_pet 返回的 response.pet.field_1，保持字符串形式。
const petResourceId = '123'
const context = { client_version: '9.3.70', field_2: petResourceId }
const listResponse = await fetch(baseURL + '/api/qqpet_get_my_suits', {
  method: 'POST', headers,
  body: JSON.stringify({ ...account, request: context }),
})
const list = await listResponse.json()
if (!listResponse.ok || !list.ok) throw new Error(list.error || '查询套装失败')
const suit = list.data.response.field_1?.[0]
if (!suit) throw new Error('当前没有可保存的套装')
const request = { field_1: context.client_version, field_2: context.field_2, suit }
const response = await fetch(baseURL + '/api/qqpet_save_one_suit', {
  method: 'POST', headers, body: JSON.stringify({ ...account, request }),
})
const result = await response.json()
if (!response.ok || !result.ok) throw new Error(result.error || '保存套装失败')
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
| `field_1` | string | 是 | 客户端版本，与查询套装时的 `request.client_version` 一致 |
| `field_2` | string | 是 | 当前宠物资源标识，与查询套装时的 `request.field_2` 一致；来自 `qqpet_get_user_pet` 的 `response.pet.field_1` |
| `suit` | [PetSuit](#pet-suit) | 是 | `qqpet_get_my_suits` 返回的 `response.field_1` 中的完整套装对象 |

较长的 ID 或序号使用字符串，避免 JavaScript 数字精度丢失。

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据；`_unknown_fields` 为 Base64 字符串数组，内容含义暂未明确 |

<!--@include: ../../snippets/qqpet/suit.md-->

<!--@include: ../../snippets/qqpet/accessory.md-->

<!--@include: ../../snippets/qqpet/model.md-->
