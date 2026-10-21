# get_device_profile_list

获取可用于创建或更新账号的设备配置列表。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "get_device_profile_list",
  "params": {}
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_device_profile_list' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{}'
```

</template>
</ApiCallTabs>

## 参数

无。

## 返回值

返回设备配置数组，每项字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 设备配置 ID，对应请求参数 `device_profile_id` |
| `name` | string | 设备配置名称 |
