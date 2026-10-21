# qqpet_save_avatar

保存宠物头像。仅支持 `android` 账号。

先查询当前宠物，保留装扮和模型的完整对象后保存。下例保存当前外观；修改外观时，应使用账号已拥有的装扮数据。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const { response } = await api.qqpet_get_user_pet(self_id, platform, {
  pet_id: 'example-pet-id',
})
const pet = response.pet
if (!pet || !Array.isArray(pet.field_2) || !pet.field_3) {
  throw new Error('宠物装扮或模型信息不完整')
}
const request = { field_1: pet.field_2, field_2: pet.field_3 }
const result = await api.qqpet_save_avatar(self_id, platform, request)
```

</template>
<template #http>

```js
const baseURL = 'http://127.0.0.1:3003'
const headers = {
  Authorization: 'Bearer TOKEN',
  'Content-Type': 'application/json',
}
const account = { self_id: 123456789, platform: 'android' }

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
| `platform` | string | 是 | `android`；`phone`、`pad` 视为 `android` |
| `request` | object | 是 | 本次操作的参数 |

### request

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `request.field_1` | object[] | 是 | 装扮列表，来自 `qqpet_get_user_pet` 的 `response.pet.field_2` |
| `request.field_2` | object | 是 | 模型信息，来自同次查询的 `response.pet.field_3` |

### 装扮项 {#accessory}

`request.field_1` 中每个对象的成员如下。保留项的业务含义尚未确认，请沿用查询返回值，并保留对象中的其他返回成员。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 保留项，十进制整数字符串 |
| `field_2` | string | 保留项，十进制整数字符串 |
| `field_3` | string[] | 保留项，十进制整数字符串数组 |
| `field_4` | number | 保留整数项 |
| `field_5` | number | 保留整数项 |
| `field_7` | string | 保留项，十进制整数字符串 |
| `field_8` | number[] | 保留整数数组 |
| `field_9` | boolean | 保留开关项 |
| `field_10` | object | 保留附加信息；其 `field_1` 为 `string[]` |
| `field_11` | string[] | 保留项，十进制整数字符串数组 |
| `field_100` | object[] | 保留附加列表，成员见下表 |

装扮项的 `field_100` 数组元素：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 保留项，十进制整数字符串 |
| `field_2` | string[] | 保留项，十进制整数字符串数组 |
| `field_3` | number[] | 保留非负整数数组 |
| `field_4` | string | 保留项，十进制整数字符串 |

### 模型信息 {#model}

`request.field_2` 的成员如下。各成员请沿用同次查询返回的模型信息。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 保留文本项 |
| `field_2` | string | 保留项，十进制整数字符串 |
| `field_3` | string | 保留项，十进制整数字符串 |
| `field_4` | string | 保留项，十进制整数字符串 |
| `field_5` | number | 保留整数项 |
| `field_6` | string | 保留文本项 |
| `field_7` | number | 保留整数项 |
| `field_8` | string | 保留项，十进制整数字符串 |
| `field_9` | string | 保留项，十进制整数字符串 |
| `field_20` | string | 保留文本项 |

较长的 ID 或序号请使用字符串，避免 JavaScript 数字精度丢失。不要将整个 `pet` 对象直接作为 `request`。

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |
