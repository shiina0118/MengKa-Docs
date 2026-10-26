# ntlogin_query_security_verify_qr

查询 Bot 安全验证二维码的扫码状态。扫码确认后会自动继续登录。扫码登录的二维码状态查询见 [`query_login_qr`](/api/query_login_qr)。

仅支持 NT 账号（`nt: 1`）。WT 账号调用返回 `ok: false` 和模式不匹配提示。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "ntlogin_query_security_verify_qr",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "guarantee_token": "GUARANTEE_TOKEN_FROM_VERIFY_QR"
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在等待安全验证的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `guarantee_token` | string | 是 | `ntlogin_get_security_verify_qr` 返回的轮询 token |

## 返回值

未扫码：

```js
{ code: 0, message: '等待扫码', status: 'waiting', status_code: 0, next: 'security' }
```

已扫码、等待手机确认：

```js
{ code: 0, message: '扫码成功，等待确认', status: 'scanned', status_code: 3, next: 'security' }
```

已失效：

```js
{ code: 0, message: '二维码已失效', status: 'expired', status_code: 2, next: 'security' }
```

已确认时，`status` 为 `confirmed`，并带有本次继续登录的 [NT 登录结果](/api/ntlogin_login_account#login-result)，按新的 `next` 处理：

```js
{ code: 0, message: '登录成功', status: 'confirmed', status_code: 1, next: 'done' }
```

已取消（仅 PC 账号，用户在手机上取消了授权）：

```js
{ code: 0, message: '扫码验证已取消', status: 'canceled', status_code: 4, next: 'security' }
```

收到 `confirmed`、`expired` 或 `canceled` 后应停止轮询。二维码失效或取消时 `next` 仍为 `security`，可重新调用 [`ntlogin_get_security_verify_qr`](/api/ntlogin_get_security_verify_qr)。结果中的 `next` 表示下一步，取值见[登录结果的 next 字段](/guide/login-flow#next)。
