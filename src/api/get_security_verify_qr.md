# get_security_verify_qr

为正在等待安全验证的 Bot 获取安全验证二维码。密码登录返回 `140022010` 后，用手机 QQ 扫描该码完成身份核验。

这不是扫码登录。登录二维码见 [`get_login_qr`](/api/get_login_qr)。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const self_id = 123456789 // 正在登录的 Bot QQ 号
const result = await api.get_security_verify_qr(self_id, platform)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_security_verify_qr' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android"
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在等待安全验证的 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |

## 返回值

```js
{
  code: 0,
  message: '二维码生成成功',
  qr_url: 'https://accounts.qq.com/safe/scanresult?...',
  guarantee_token: 'GUARANTEE_TOKEN',
  expires_in: 180,
}
```

将 `qr_url` 渲染成二维码，并保留 `guarantee_token` 用于查询状态。二维码有效期单位为秒。

完整流程见[Bot 登录流程](/guide/login-flow)。
