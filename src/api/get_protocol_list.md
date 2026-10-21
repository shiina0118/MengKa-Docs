# get_protocol_list

获取协议列表，包含已关闭的协议。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "get_protocol_list",
  "params": {}
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_protocol_list' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{}'
```

</template>
</ApiCallTabs>

## 参数

无。

## 返回值

```json
[
  { "id": 0, "platform": "Android", "type": "Phone", "version": "9.3.75", "state": true },
  { "id": 1, "platform": "Android", "type": "Pad", "version": "9.3.75", "state": true },
  { "id": 2, "platform": "PC", "type": "Linux", "version": "3.2.32", "state": true },
  { "id": 3, "platform": "PC", "type": "Windows", "version": "3.2.32", "state": false },
  { "id": 4, "platform": "Android", "type": "Watch", "version": "9.0.7", "state": false }
]
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 协议 ID，可为 `0`；作为账号 API 的 `protocol_id` |
| `platform` | string | 所属平台：`Android` 或 `PC` |
| `type` | string | 平台类型，如 `Phone`、`Pad`、`Linux`、`Windows`、`Watch` |
| `version` | string | 协议版本 |
| `state` | boolean | 是否启用；关闭后不能用于添加、编辑或登录账号 |
