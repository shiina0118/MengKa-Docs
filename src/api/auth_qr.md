# auth_qr

用已登录的 Android Bot 确认应用或桌面登录二维码。须先 [`scan_qr`](/api/scan_qr)，再传入相同的 `k` 和扫码返回的 `need_a1`。

仅支持已在线的 Android 账号。确认 Linux 扫码登录后，再用 [`query_login_qr`](/api/query_login_qr) 看目标端是否 `confirmed`。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "auth_qr",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "k": "K_FROM_APPLICATION_QR_CODE",
    "need_a1": false,
    "skip_phone_confirm": false
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/auth_qr' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "k": "K_FROM_APPLICATION_QR_CODE",
  "need_a1": false,
  "skip_phone_confirm": false
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `k` | string | 是 | 与 `scan_qr` 相同的二维码 URL 或 `k` |
| `need_a1` | boolean | 是 | 原样传入本次 `scan_qr` 返回的 `need_a1`；允许为 `false`，不允许省略或为 `null` |
| `skip_phone_confirm` | boolean | 否 | 自动登录设置：`true` 开启，`false` 关闭；不传则使用服务端默认设置 |

`need_a1=true` 时，后端从当前账号凭据中读取 A1 和 NoPicSig；A1 缺失会报错，NoPicSig 允许为空。`need_a1=false` 时不携带这两项凭据。调用方无需提供凭据内容。

### 与扫码联动

1. 调用 `scan_qr`，检查返回的 `code`，非 `0` 时先处理业务错误。
2. 展示 `tips`、`tip` 等安全提示。根据 `auto_login.show_switch` 决定是否展示自动登录选项，`auto_login.switch_state` 表示当前开关状态。
3. 用户确认后，用同一账号实例、同一 `k` 和扫码返回的 `need_a1` 调用 `auth_qr`。展示了自动登录选项时可传入用户选择的 `skip_phone_confirm`；未展示时省略该参数。

后端不缓存扫码状态，由调用方传递本次扫码参数。`need_sec_check` 是扫码返回的提示信息，无需传入确认接口。

### 参数变更

`need_a1` 是新增必传参数；原先省略 `skip_phone_confirm` 会关闭自动登录，现在省略表示使用默认设置。要明确关闭，请传 `false`。

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

以 `success` 判断确认是否成功，`success` 等价于业务错误码 `code === 0`。失败时通过 `code`、`title`、`message` 获取原因，可能还会返回需要用户打开的 `jump_url`。

`self_id` 是本次确认登录的账号 QQ 号，响应未提供账号信息时可能省略。
