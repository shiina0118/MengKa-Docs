# get_device_profile_list

获取可用于创建或更新账号的设备指纹列表。

## 调用

```js
const profiles = await api.get_device_profile_list()
```

## 参数

无。

## 返回值

返回完整设备指纹数组。调用账号 API 时使用所选记录的 `id` 作为 `device_profile_id`。
