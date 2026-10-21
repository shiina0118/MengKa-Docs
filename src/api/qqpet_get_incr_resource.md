# qqpet_get_incr_resource

获取宠物增量资源。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_incr_resource",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "field_1": "1",
      "client_version": "9.3.70",
      "model_id": "123",
      "last_resource_hash": "",
      "page": "0",
      "field_6": "1500"
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_incr_resource' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "field_1": "1",
    "client_version": "9.3.70",
    "model_id": "123",
    "last_resource_hash": "",
    "page": "0",
    "field_6": "1500"
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
| `request.field_1` | string | 否 | 扩展参数，说明待补充 |
| `request.client_version` | string | 否 | 客户端版本 |
| `request.model_id` | string | 否 | 模型 ID |
| `request.last_resource_hash` | string | 否 | 上次获取的资源标识；首次可传空字符串 |
| `request.page` | string | 否 | 页码 |
| `request.field_6` | string | 否 | 扩展参数，说明待补充 |

较长的 ID 或序号请使用字符串，避免 JavaScript 数字精度丢失。

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `add_res_infos` | object[] | 新增资源 |
| `update_res_infos` | object[] | 更新资源 |
| `delete_res_infos` | object[] | 删除的资源 |
| `url_base` | string | 资源地址前缀 |
| `is_end` | boolean | 是否已到末尾 |
| `global_resources_hash` | string | 本次资源标识 |
