# update_account

更新当前插件节点内的 Bot 账号配置。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const self_id = 123456789 // 要更新的 Bot QQ 号

const result = await api.update_account(
  self_id,
  platform,
  password,
  client_profile_id,
  device_profile_id,
)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/update_account' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "password": "YOUR_ACCOUNT_PASSWORD",
  "client_profile_id": 1,
  "device_profile_id": 1
}'
```

`client_profile_id` 和 `device_profile_id` 使用查询配置接口返回的真实 ID；客户端配置的平台必须与 `platform` 一致。

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `password` | string | 是 | 新密码 |
| `client_profile_id` | number | 是 | `get_client_profile_list` 返回的客户端配置记录的 `id` |
| `device_profile_id` | number | 是 | `get_device_profile_list` 返回的设备配置记录 ID |

账号必须处于离线状态。

## 返回值

以下 `code` / `msg` 是 WebSocket SDK 的封装结果。HTTP 成功返回 `{ "ok": true, "data": null }`；失败返回 `{ "ok": false, "error": "错误原因" }`。

```js
{ code: 0, msg: '账号编辑成功' }
```

失败时返回 `{ code: 1, msg: '错误信息' }`。
