# get_login_qr

获取扫码登录二维码。账号不存在时会按传入的协议和设备配置创建账号。

这不是密码登录过程中的安全验证二维码。安全验证请用 [`get_security_verify_qr`](/api/get_security_verify_qr)。`add_account` 只用于密码登录账号；扫码登录账号通过本接口创建。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "get_login_qr",
  "params": {
    "self_id": 123456789,
    "protocol_id": 2,
    "device_profile_id": 1
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_login_qr' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 2,
  "device_profile_id": 1
}'
```


</template>
</ApiCallTabs>

目前仅支持 Linux 类型的协议 ID。账号已存在时保持原设备配置。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 5 到 10 位 QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `device_profile_id` | number | 是 | `get_device_profile_list` 返回的设备配置记录 ID |


## 返回值

常用字段：

```js
{
  code: 0,
  message: '二维码生成成功',
  url: 'https://...',
  created: true,
}
```

| 字段 | 说明 |
| --- | --- |
| `url` | 二维码内容，渲染后用手机 QQ 扫描 |
| `created` | 本次是否新建了账号 |

将 `url` 渲染成二维码后，轮询 [`query_login_qr`](/api/query_login_qr)。完整流程见[Bot 登录流程](/guide/login-flow)。
