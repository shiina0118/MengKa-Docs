# add_account

向当前插件节点添加 Bot 账号。仅支持 Android 密码登录账号。扫码登录账号请用 [`get_login_qr`](/api/get_login_qr) 创建。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "add_account",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "password": "YOUR_ACCOUNT_PASSWORD",
    "device_profile_id": 1
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/add_account' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "password": "YOUR_ACCOUNT_PASSWORD",
  "device_profile_id": 1
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 5 到 10 位 QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `password` | string | 是 | 账号密码 |
| `device_profile_id` | number | 是 | `get_device_profile_list` 返回的设备配置记录 ID |

## 返回值

成功时 `data` 为新账号信息：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 账号 QQ 号 |
| `platform` | string | 通信实现，如 `android` |
| `protocol_id` | number | 协议 ID |
| `device_profile_id` | number | 设备配置记录 ID |
| `node_id` | number | 所属节点 ID |
| `status` | number | 账号状态 |

失败时 `action_result` 为 `ok: false`，`error` 为错误原因；HTTP 返回 `{ "ok": false, "error": "错误原因" }`。
