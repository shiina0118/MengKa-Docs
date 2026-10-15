# update_account

更新当前插件节点内的 Bot 账号配置。

## 调用

```js
const self_id = 123456789 // 要更新的 Bot QQ 号

const result = await api.update_account(
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
| `self_id` | number | 是 | QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `password` | string | 是 | 新密码 |
| `client_profile_id` | number | 是 | `get_client_profile_list` 返回的客户端配置记录的 `id` |
| `device_profile_id` | number | 是 | `get_device_profile_list` 返回的设备配置记录 ID |

账号必须处于离线状态。

## 返回值

```js
{ code: 0, msg: '账号编辑成功' }
```

失败时返回 `{ code: 1, msg: '错误信息' }`。
