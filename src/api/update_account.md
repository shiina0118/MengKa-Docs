# update_account

更新当前插件节点内的 Bot 账号配置。

## 调用

```js
const self_id = 123456789 // 要更新的 Bot QQ 号

const result = await api.update_account(
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
| `self_id` | number | 是 | QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `password` | string | 是 | 新密码 |
| `protocol_id` | number | 是 | 新协议 ID |
| `device_profile_id` | number | 是 | 新设备指纹 ID |

账号必须处于离线状态。

更换设备指纹或修改其 Android ID 后，账号的 `xwid` 在下一次检查时重新生成；表中已有 `o3did` 保留，空值时使用当前 `xwid` 的纯算兜底结果，兜底不落库。

## 返回值

```js
{ code: 0, msg: '账号编辑成功' }
```

失败时返回 `{ code: 1, msg: '错误信息' }`。
