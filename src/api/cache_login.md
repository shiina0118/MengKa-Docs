# cache_login

使用本地缓存登录当前节点下的账号。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const self_id = 123456789 // 要登录的 Bot QQ 号
const result = await api.cache_login(self_id, platform)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/cache_login' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android"
}'
```

</template>
</ApiCallTabs>

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

缓存失效时可能返回：

```js
{
  code: 1,
  message: '错误信息',
  cache_invalid: true,
}
```

`cache_invalid === true` 时，密码登录账号改用 [`login_account`](/api/login_account)，扫码登录账号改用 [`get_login_qr`](/api/get_login_qr)。

失败结果的 `code` 不一定为 `1`，也不一定包含 `cache_invalid`。缓存不存在时可能返回 `cache_invalid: false`，仍需重新登录；网络等其他失败应结合 `message` 处理。不要仅凭 `cache_invalid` 判断是否成功，只有 `code === 0` 才表示登录成功。

参数错误、账号不属于当前节点或账号未离线等调用错误会拒绝 Promise。
