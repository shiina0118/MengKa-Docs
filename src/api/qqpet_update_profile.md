# qqpet_update_profile

更新宠物资料。仅支持 `android` 账号。

## 调用


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
| `response` | object | 本次操作的返回数据；`_unknown_fields` 为 Base64 字符串数组，内容含义暂未明确 |

<!--@include: ../../snippets/qqpet/profile.md-->
