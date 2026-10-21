# query_login_qr

查询扫码登录二维码状态。扫码确认后，服务端会继续完成登录。

这不是安全验证二维码查询。安全验证请用 [`query_security_verify_qr`](/api/query_security_verify_qr)。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "query_login_qr",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/query_login_qr' \
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
| `self_id` | number | 是 | 正在扫码登录的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

账号必须处于登录中状态，且已调用过 [`get_login_qr`](/api/get_login_qr)。

## 返回值

等待扫码：

```js
{ code: 0, message: '等待扫码', state: 'waiting_for_scan', url: '...', created: false }
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
{ code: 0, message: '登录成功', state: 'confirmed', login_complete: true, self_id: 123456789 }
```

| `state` | 说明 |
| --- | --- |
| `waiting_for_scan` | 等待扫码 |
| `waiting_for_confirm` | 已扫码，等待确认 |
| `confirmed` | 已确认；成功时带 `login_complete: true` |
| `code_expired` | 二维码已失效，需重新 `get_login_qr` |
| `canceled` | 已取消扫码 |
| `invalid` | 二维码无效 |

收到 `confirmed`、`code_expired`、`canceled` 或 `invalid` 后应停止轮询。

`self_id` 是扫码确认的账号 QQ 号，尚未取得时为 `0`。
