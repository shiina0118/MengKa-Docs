# auth_qr

用已登录的 Android Bot 确认应用或桌面登录二维码。须先 [`scan_qr`](/api/scan_qr)。`k` 与扫码时相同。

仅支持已在线的 Android 账号。确认 Linux 扫码登录后，再用 [`query_login_qr`](/api/query_login_qr) 看目标端是否 `confirmed`。

## 调用

```js
const result = await api.auth_qr(self_id, 'android', k)
const result = await api.auth_qr(self_id, 'android', k, true)
```

`skip_phone_confirm` 为 `true` 时，下次在同一设备登录不再要求手机确认。默认 `false`。

`k` 可以是完整 URL，也可以是 `k=` 后面的值。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `android`（`phone`、`pad` 视为 `android`） |
| `k` | string | 是 | 与 `scan_qr` 相同的二维码 URL 或 `k` |
| `skip_phone_confirm` | boolean | 否 | 下次登录无需手机确认，默认 `false` |

## 返回值

```js
{
  code: 0,
  message: '',
  success: true,
  uin: 2082083,
  device_os: 'ANDROID',
  device_model: 'test',
  ver: '9.2.70',
  package_name: 'com.tencent.mobileqq',
  qua: 'V1_AND_SQ_9.2.70_13350_YYB_D',
}
```

响应没有 `2.1.4` 即为成功（`success: true`）。失败时带 `code`、`title`、`message`，可能还有 `jump_url`。
