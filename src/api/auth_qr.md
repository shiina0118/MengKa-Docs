# auth_qr

用已登录的 Android Bot 确认应用或桌面登录二维码。须先 [`scan_qr`](/api/scan_qr)。`k` 与扫码时相同。

仅支持已在线的 Android 账号。确认 Linux 扫码登录后，再用 [`query_login_qr`](/api/query_login_qr) 看目标端是否 `confirmed`。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.auth_qr(self_id, 'android', k)
// 或跳过后续的手机确认：
// const result = await api.auth_qr(self_id, 'android', k, true)
```

`skip_phone_confirm` 为 `true` 时，下次在同一设备登录不再要求手机确认。默认 `false`。

`k` 可以是完整 URL，也可以是 `k=` 后面的值。

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/auth_qr' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "k": "K_FROM_APPLICATION_QR_CODE",
  "skip_phone_confirm": false
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `android`（`phone`、`pad` 视为 `android`） |
| `k` | string | 是 | 与 `scan_qr` 相同的二维码 URL 或 `k` |
| `skip_phone_confirm` | boolean | 否 | 下次登录无需手机确认，默认 `false` |

## 返回值

常用字段：

```js
{
  code: 0,
  message: '',
  success: true,
  self_id: 2082083,
  device_os: 'ANDROID',
  device_model: 'test',
}
```

以 `success` 判断确认是否成功。失败时通过 `code`、`title`、`message` 获取原因，可能还会返回需要用户打开的 `jump_url`。

`self_id` 是本次确认登录的账号 QQ 号，响应未提供账号信息时可能省略。
