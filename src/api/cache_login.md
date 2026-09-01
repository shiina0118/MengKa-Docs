# cache_login

使用本地缓存登录当前节点下的账号。

## 调用

```js
const self_id = 123456789 // 要登录的 Bot QQ 号
const result = await api.cache_login(self_id, platform)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 已创建且离线的 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |

## 返回值

成功：

```js
{ code: 0, message: '登录成功' }
```

失败：

```js
{
  code: 1,
  message: '错误信息',
  cache_invalid: true,
}
```

`cache_invalid` 为 `true` 时改用 [`login_account`](/api/login_account)。
