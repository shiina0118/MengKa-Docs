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
  code: 0,
  message: '',
  tips_color: 1,
  tips: '请确认该设备在你身边并且是你本人登录…',
  need_sec_check: true,
  tip: '请谨慎登录该设备…',
  need_a1: false,
  auto_login: {
    show_switch: true,
    switch_state: 0,
    tips_title: '',
    tips_content: '',
  },
  status: 1,
  app_name: 'QQ音乐',
  location: '凉山彝族自治州',
  client: 'web',
  client_app_id: 100497308,
}
```

以上示例表示扫码业务成功，同时返回安全提示。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `code` | number | 扫码业务错误码，`0` 表示成功；不表示提示文字颜色 |
| `message` | string | 扫码业务错误信息，成功时可能为空 |
| `tips_color` | number | `tips` 的文字颜色，`0` 为默认颜色，`1` 为红色 |
| `tips` | string | 安全提示文字，应独立于业务错误信息展示 |
| `need_sec_check` | boolean | 是否需要安全检查或确认 |
| `tip` | string | 安全检查提示文字，可能为空 |
| `need_a1` | boolean | 后续确认登录是否需要 A1 凭据，调用 `auth_qr` 时必须原样传入 |
| `auto_login` | [AutoLogin](#auto-login) | 自动登录开关及提示信息 |
| `status` | number | 安全检查结果，与业务错误码 `code` 分开处理 |

### auto_login（AutoLogin） {#auto-login}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `show_switch` | boolean | 是否展示自动登录选项；为 `false` 时，调用 `auth_qr` 应省略 `skip_phone_confirm` |
| `switch_state` | number | 当前开关状态：`0` 关闭，`1` 开启；不是确认请求中的三态操作值 |
| `tips_title` | string | 自动登录提示标题，可能为空 |
| `tips_content` | string | 自动登录提示内容，可能为空 |

`code`、`message`、`tips_color`、`tips`、`need_sec_check`、`need_a1`、`auto_login` 和 `status` 始终返回。目标信息可能包含 `app_name`、`location`，也可能包含 `device_os`、`device_name`，应按实际返回字段展示。本接口只完成扫码；确认登录用 [`auth_qr`](/api/auth_qr)。

调用方保存本次响应，展示提示并让用户确认后，将 `need_a1` 连同原 `k` 传给 `auth_qr`。后端不缓存扫码状态。

### 返回字段变更

本次调整不保留旧字段兼容：`tip_code` 已删除，改用布尔字段 `need_sec_check`。旧版 `code` 中的颜色值改由 `tips_color` 返回，旧版 `message` 中的安全提示文字改由 `tips` 返回。调用方应使用 `code === 0` 判断扫码业务成功，使用 `tips` 和 `tip` 展示安全提示。
