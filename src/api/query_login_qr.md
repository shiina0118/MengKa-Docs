# query_login_qr

查询扫码登录二维码状态。扫码确认后，服务端会继续完成登录。

这不是安全验证二维码查询。安全验证请用 [`ntlogin_query_security_verify_qr`](/api/ntlogin_query_security_verify_qr)。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "query_login_qr",
  "params": {
    "self_id": 123456789,
    "protocol_id": 2
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在扫码登录的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

账号必须处于扫码登录中，即 Linux 账号已调用过 [`get_login_qr`](/api/get_login_qr)。

账号正在密码登录或其他验证时，调用本接口返回 `ok: false`，不会改变当前登录步骤。

## 返回值

等待扫码：

```js
{ code: 0, message: '等待扫码', state: 'waiting_for_scan', url: '', next: 'qr' }
```

已扫码、等待手机确认：

```js
{ code: 0, message: '扫码成功，等待确认', state: 'waiting_for_confirm' }
```

已失效或取消：

```js
{ code: 0, message: '二维码已失效', state: 'code_expired' }
{ code: 0, message: '已取消扫码', state: 'canceled' }
```

已确认并登录成功：

```js
{ code: 0, message: '登录成功', state: 'confirmed', login_complete: true, self_id: 123456789, next: 'done' }
```

以上示例只列出部分字段。返回 [QRLoginResult](#qr-login-result)，`state` 取值见该结构下的表格。

收到 `confirmed`、`code_expired`、`canceled` 或 `invalid` 后应停止轮询。需要换码时再次调用 [`get_login_qr`](/api/get_login_qr)。

<!--@include: ../../snippets/api/qr-login-result.md-->
