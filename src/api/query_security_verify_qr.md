# query_security_verify_qr

查询 Bot 安全验证二维码的扫码状态。扫码确认后会自动继续登录。扫码登录的二维码状态查询见 [`query_login_qr`](/api/query_login_qr)。

## 调用

```js
const self_id = 123456789
const result = await api.query_security_verify_qr(self_id, platform, guarantee_token)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在等待安全验证的 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `guarantee_token` | string | 是 | `get_security_verify_qr` 返回的轮询 token |

## 返回值

未扫码：

```js
{ code: 0, message: '等待扫码', status: 'waiting', status_code: 0 }
```

已扫码、等待手机确认：

```js
{ code: 0, message: '扫码成功，等待确认', status: 'scanned', status_code: 3 }
```

已失效：

```js
{ code: 0, message: '二维码已失效', status: 'expired', status_code: 2 }
```

已确认时，`status` 为 `confirmed`，并返回与 [`login_account`](/api/login_account) 相同的登录结果：

```js
{ code: 0, message: '登录成功', status: 'confirmed', status_code: 1 }
```

收到 `confirmed` 或 `expired` 后应停止轮询。
