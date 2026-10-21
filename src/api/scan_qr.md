# scan_qr

用已登录的 Android Bot 扫描应用登录二维码。`k` 取自二维码链接里的 `k=`。

仅支持已在线的 Android 账号，不能代替 [`login_account`](/api/login_account) 发起扫码登录。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "scan_qr",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "k": "K_FROM_APPLICATION_QR_CODE"
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/scan_qr' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "k": "K_FROM_APPLICATION_QR_CODE"
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `k` | string | 是 | 应用登录二维码 URL 或其中的 `k` 参数 |

## 返回值

```js
{
  code: 1,
  message: '请确认该设备在你身边并且是你本人登录…',
  tip: '请谨慎登录该设备…',
  status: 1,
  app_name: 'QQ音乐',
  location: '凉山彝族自治州',
  client: 'web',
  client_app_id: 100497308,
}
```

`code`、`message` 表示扫码结果，`tip` 是可展示给用户的提示。目标信息可能包含 `app_name`、`location`，也可能包含 `device_os`、`device_name`，应按实际返回字段展示。本接口只完成扫码；确认登录用 [`auth_qr`](/api/auth_qr)。
