# ntlogin_get_security_verify_qr

为正在等待安全验证的 Bot 获取安全验证二维码。密码登录返回 `140022010` 后，用手机 QQ 扫描该码完成身份核验。

仅支持 NT 账号（`nt: 1`）。WT 账号调用返回 `ok: false` 和模式不匹配提示；WT 短信安全验证请使用 [`wtlogin_get_sms`](/api/wtlogin_get_sms)。

扫码登录的二维码请调用 [`get_login_qr`](/api/get_login_qr) 获取。本接口用于 NT 密码登录过程中的安全验证。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "ntlogin_get_security_verify_qr",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```


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
