# add_account

向当前插件节点添加 Bot 账号。仅支持密码登录账号（`android`）。扫码登录账号请用 [`get_login_qr`](/api/get_login_qr) 创建。

## 调用

```js
const self_id = 123456789 // 要添加的 Bot QQ 号

const result = await api.add_account(
  self_id,
  platform,
  password,
  protocol_id,
  device_profile_id,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 5 到 10 位 QQ 号 |
| `platform` | string | 是 | `android`（`phone`、`pad` 视为 android）。扫码登录请用 [`get_login_qr`](/api/get_login_qr) |
| `password` | string | 是 | 账号密码 |
| `protocol_id` | number | 是 | 协议数组下标 |
| `device_profile_id` | number | 是 | 设备指纹记录 ID |

账号表分别提供 `xwid` 和 `o3did` 字段，共用设备指纹的账号仍各自缓存。`xwid` 超过 14400 秒时更新，生成标识及时间保存在账号的 `xwid_state` 中，重启后沿用缓存。`o3did` 字段留给 getToken 下发值；表中为空时返回本地纯算兜底值，兜底不落库，已有值不会随 `xwid` 刷新而改变。账号查询返回 `xwid`、有效的 `o3did` 和 `xwidUpdatedAt`。

## 返回值

成功：

```js
{ code: 0, msg: '账号添加成功' }
```

失败：

```js
{ code: 1, msg: '错误信息' }
```
