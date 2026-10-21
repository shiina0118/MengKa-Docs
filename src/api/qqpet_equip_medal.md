# qqpet_equip_medal

佩戴宠物勋章。仅支持 `android` 账号。

佩戴已获得的勋章。勋章 ID 从图鉴或详情读取。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const request = {
  "pet_id": "PET_ID",
  "medal_id": "123"
}
const result = await api.qqpet_equip_medal(self_id, platform, request)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_equip_medal' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "request": {
    "pet_id": "PET_ID",
    "medal_id": "123"
  }
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

### request

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `request.pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |
| `request.medal_id` | string | 否 | 勋章图鉴返回的勋章 ID，使用十进制字符串 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `medal_id` | string | 勋章图鉴返回的勋章 ID，使用十进制字符串 |
