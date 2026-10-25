# qmate_use_item

使用聊天精灵背包物品或切换外观。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qmate_use_item",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890,
    "sku_id": "SKU_FROM_INVENTORY"
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qmate_use_item' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "user_id": 234567890,
  "sku_id": "SKU_FROM_INVENTORY"
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号协议 ID，与 self_id 共同定位实例；允许为 0 |
| `user_id` | number | 是 | 另一位合养用户的 QQ 号，必须大于 0，不接受 UID |
| `sku_id` | string | 是 | 从背包取得的非空物品 SKU |
| `avatar_sub_type` | string | 否 | 外观/皮肤子类型，取背包 skin_options，默认空字符串 |
| `rare_skin_confirm` | boolean | 否 | 稀有皮肤确认标志，默认 false |
| `cooldown_confirm` | boolean | 否 | 冷却确认标志，默认 false |
| `other_skin_confirm` | boolean | 否 | 其他皮肤确认标志，默认 false |

## 返回值

以下为响应 `data` 字段。`ok: true` 表示已取得并解析服务端响应，还需检查 `data.success`。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 请求成功时为 true；有额外业务结果的接口还需检查相应字段 |
| `error_code` | number | 请求结果码，成功时为 0 |
| `error_message` | string | 失败说明，空字符串时省略 |
| `result` | number | 物品操作业务结果原值，需要结合服务端状态判断 |
| `sku_id` | string | 响应物品 SKU |
| `remaining_quantity` | number | 剩余数量 |
| `avatar_sub_type` | string | 响应外观子类型 |
| `health_status` | number | 健康状态原值 |
| `active_days_info` | object | 可选，活跃天数详情；见[精灵信息](/api/qmate_get_info#active-days-info) |

服务端拒绝请求时，外层为 `ok: true`，`data.success` 为 `false`。参数无效、Bot 未在线、请求失败、响应损坏时，返回 `ok: false`。


先调用 [`qmate_get_inventory`](/api/qmate_get_inventory) 取得物品 SKU 和皮肤选项。首次调用保留三个确认标志为 `false`；若服务端要求额外确认，调用方应展示对应提示，用户确认后再携带相应标志重试。接口不会自动确认或自动重试。

`success` 表示请求是否成功，具体操作结果需结合 `result` 判断。调用后可重新查询背包及精灵信息确认最终状态。

## 业务错误码

以下为 `data.error_code`，出现时 `data.success` 为 `false`。

| 错误码 | 含义 | 确认后重试参数 |
| --- | --- | --- |
| 10024 | 道具已用完 | 重新查询背包 |
| 10032 | 冷却相关确认 | `cooldown_confirm: true` |
| 10033 | 稀有皮肤确认 | `rare_skin_confirm: true` |
| 10034 | 其他皮肤确认 | `other_skin_confirm: true` |

重试时保留原请求的用户、SKU 和皮肤子类型，仅修改用户已确认的对应标志。其他错误码原样返回。
