# qqpet_get_user_pet

获取用户宠物。仅支持 `android` 账号。

## 调用


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


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | [Request](#request) | 否 | 本次操作的参数，默认 `{}` |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `pet_id` | string | 否 | 宠物 ID |
| `field_99` | number | 否 | 扩展参数，说明待补充 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `pet` | [Pet](#pet) | 宠物信息 |

保存头像时，将 `pet.field_2` 作为 `request.field_1`，将 `pet.field_3` 作为 `request.field_2`。参见[完整示例](./qqpet_save_avatar)。

<!--@include: ../../snippets/qqpet/pet.md-->

<!--@include: ../../snippets/qqpet/profile.md-->

<!--@include: ../../snippets/qqpet/accessory.md-->

<!--@include: ../../snippets/qqpet/model.md-->
