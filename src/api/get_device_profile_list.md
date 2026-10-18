# get_device_profile_list

获取可用于创建或更新账号的设备配置列表。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const profiles = await api.get_device_profile_list()
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

返回设备配置数组。使用记录的 `name` 展示配置名称，使用 `id` 作为账号 API 的 `device_profile_id`，无需自行构造设备配置。

每项只返回 `{ id, name }`，`id` 为 number，`name` 为 string。
