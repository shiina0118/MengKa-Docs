# scan_qr

用已登录的 Android Bot 扫描应用登录二维码。`k` 取自二维码链接里的 `k=`。

仅支持已在线的 Android 账号，不能代替 [`get_login_qr`](/api/get_login_qr) 做扫码登录。

## 调用

```js
const result = await api.scan_qr(self_id, 'android', k)
```

`k` 可以是完整 URL，也可以是 `k=` 后面的值：

```js
await api.scan_qr(self_id, 'android', 'https://qun.qq.com/qunpay/...&k=XXXX')
await api.scan_qr(self_id, 'android', 'XXXX')
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `android`（`phone`、`pad` 视为 `android`） |
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

`code` / `message` 来自响应 `2.10.1` / `2.10.2`，`tip` 来自 `2.10.4`。扫码目标可能是应用名+地区（`2.2` / `2.3`），也可能是系统+设备名（`2.4` / `2.5`）。本接口只完成扫码；确认登录用 [`auth_qr`](/api/auth_qr)。
