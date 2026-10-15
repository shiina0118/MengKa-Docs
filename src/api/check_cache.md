# check_cache

检查账号是否具备可用于尝试缓存登录的本地数据。

## 调用

```js
const self_id = 123456789 // 要检查的 Bot QQ 号
const result = await api.check_cache(self_id, platform)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 当前节点下的 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |

## 返回值

```js
{ valid: true }
```

`valid === true` 时可以尝试 [`cache_login`](/api/cache_login)，但不保证能够登录成功，仍需检查登录结果。`valid === false` 时，密码登录账号使用 [`login_account`](/api/login_account)，扫码登录账号使用 [`get_login_qr`](/api/get_login_qr)。
