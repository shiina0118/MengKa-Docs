# qqpet_do_care

执行宠物一键照料。仅支持 `android` 账号。

执行会消耗照料用品或余额。预计消耗与经验必须按当前配置计算，服务端结果为准，不能用示例数量作为实际报价。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const request = {
  "pet_id": "PET_ID",
  "expect_biscuit_cost": 1,
  "expect_exp_gain": 1,
  "show_card": true,
  "version": 4,
  "expect_soap_cost": 1
}
const result = await api.qqpet_do_care(self_id, platform, request)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_do_care' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "request": {
    "pet_id": "PET_ID",
    "expect_biscuit_cost": 1,
    "expect_exp_gain": 1,
    "show_card": true,
    "version": 4,
    "expect_soap_cost": 1
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
| `request.expect_biscuit_cost` | number | 否 | 预期食物消耗量，从照料配置计算 |
| `request.expect_exp_gain` | number | 否 | 预期经验增量，从照料配置计算 |
| `request.show_card` | boolean | 否 | 是否返回展示卡片所需的数据 |
| `request.version` | number | 否 | 操作版本；照料配置与执行示例为4，补给信息示例为2 |
| `request.expect_soap_cost` | number | 否 | 预期洗护用品消耗量，从照料配置计算 |
| `request.field_7` | boolean | 否 | 扩展数据，说明待补充 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `result` | number | 操作结果码；请求成功不代表该业务结果一定成功，请检查本字段 |
| `care_info` | object | 本次照料结果 |

### response.care_info

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | number | 扩展数据，说明待补充 |
