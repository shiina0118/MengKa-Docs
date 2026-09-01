# check_cache

检查账号的本地登录缓存是否完整有效。

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

仅在 `valid === true` 时调用 [`cache_login`](/api/cache_login)。
