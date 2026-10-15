# add_account

向当前插件节点添加 Bot 账号。仅支持密码登录账号（`android`）。扫码登录账号请用 [`get_login_qr`](/api/get_login_qr) 创建。

## 调用

```js
const self_id = 123456789 // 要添加的 Bot QQ 号

const result = await api.add_account(
  self_id,
  platform,
  password,
  client_profile_id,
  device_profile_id,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 5 到 10 位 QQ 号 |
| `platform` | string | 是 | `android`（`phone`、`pad` 视为 android）。扫码登录请用 [`get_login_qr`](/api/get_login_qr) |
| `password` | string | 是 | 账号密码 |
| `client_profile_id` | number | 是 | `get_client_profile_list` 返回的客户端配置记录的 `id` |
| `device_profile_id` | number | 是 | `get_device_profile_list` 返回的设备配置记录 ID |

## 返回值

成功：

```js
{ code: 0, msg: '账号添加成功' }
```

失败：

```js
{ code: 1, msg: '错误信息' }
```
