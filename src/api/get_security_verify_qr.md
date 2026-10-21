# get_security_verify_qr

为正在等待安全验证的 Bot 获取安全验证二维码。密码登录返回 `140022010` 后，用手机 QQ 扫描该码完成身份核验。

这不是扫码登录。扫码登录的二维码由无密码 PC 账号调用 [`login_account`](/api/login_account) 获得。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "get_security_verify_qr",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_security_verify_qr' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在等待安全验证的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

## 返回值

```js
{
  code: 0,
  message: '二维码生成成功',
  qr_url: 'https://accounts.qq.com/safe/scanresult?...',
  guarantee_token: 'GUARANTEE_TOKEN',
  expires_in: 180,
  next: 'security',
}
```

将 `qr_url` 渲染成二维码，并保留 `guarantee_token` 用于查询状态。PC 账号的 `qr_url` 是服务端返回的设备验证链接原文，Android 账号是包装后的扫码结果页链接，两者都直接渲染即可。二维码有效期单位为秒。

完整流程见[Bot 登录流程](/guide/login-flow)。
