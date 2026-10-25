# qqpet_feeding

喂养宠物。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_feeding",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "pet_master_uin": "123456789",
      "pet_id": "example-pet-id",
      "food_id": "FOOD_ID"
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_feeding' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "pet_master_uin": "123456789",
    "pet_id": "example-pet-id",
    "food_id": "FOOD_ID"
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
| `pet_master_uin` | string | 否 | 宠物主人 QQ 号 |
| `nick` | string | 否 | 昵称 |
| `avatar_url` | string | 否 | 头像地址 |
| `pet_id` | string | 否 | 宠物 ID |
| `field_5` | number | 否 | 旧版食物种类；使用食物库存中的 `food_id` 可指定具体食物 |
| `field_10` | object | 否 | 扩展参数，含义暂未明确 |
| `field_99` | number | 否 | 扩展参数，说明待补充 |
| `food_id` | string | 否 | 食物目录返回的食物 ID |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展结果，说明待补充 |
| `field_2` | object | 扩展结果，含义暂未明确 |
| `field_3` | string | 扩展结果，说明待补充 |
