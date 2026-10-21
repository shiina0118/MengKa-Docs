# qqpet_feeding

喂养宠物。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const request = {
  "pet_master_uin": "123456789",
  "pet_id": "example-pet-id",
  "field_5": 1
}
const result = await api.qqpet_feeding(self_id, platform, request)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_feeding' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "request": {
    "pet_master_uin": "123456789",
    "pet_id": "example-pet-id",
    "field_5": 1
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
| `request.pet_master_uin` | string | 否 | 宠物主人 QQ 号 |
| `request.nick` | string | 否 | 昵称 |
| `request.avatar_url` | string | 否 | 头像地址 |
| `request.pet_id` | string | 否 | 宠物 ID |
| `request.field_5` | number | 否 | 扩展参数，说明待补充 |
| `request.field_10` | object | 否 | 扩展参数，说明待补充 |
| `request.field_99` | number | 否 | 扩展参数，说明待补充 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展结果，说明待补充 |
| `field_2` | object | 扩展结果，说明待补充 |
| `field_3` | string | 扩展结果，说明待补充 |
