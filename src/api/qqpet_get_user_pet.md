# qqpet_get_user_pet

获取用户宠物。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

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

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_user_pet' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "pet_id": "example-pet-id"
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
| `request` | object | 否 | 本次操作的参数，默认 `{}` |

### request

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `request.pet_id` | string | 否 | 宠物 ID |
| `request.field_99` | number | 否 | 扩展参数，说明待补充 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `pet` | object | 宠物信息 |

### response.pet

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 当前宠物资源标识，查询或保存套装时使用，保持字符串形式 |
| `field_2` | object[] | 当前装扮列表；[装扮项成员](./qqpet_save_avatar#accessory) |
| `field_3` | object | 当前模型信息；[模型成员](./qqpet_save_avatar#model) |

保存头像时，将 `pet.field_2` 作为 `request.field_1`，将 `pet.field_3` 作为 `request.field_2`。参见[完整示例](./qqpet_save_avatar)。
