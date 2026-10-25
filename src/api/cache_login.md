# cache_login

使用本地缓存登录当前节点下的账号。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "cache_login",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 已创建且离线的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

## 返回值

成功：

```js
{ code: 0, message: '登录成功', next: 'done' }
```

缓存失效时可能返回：

```js
{
  code: 1,
  message: '错误信息',
  cache_invalid: true,
  next: 'failed',
}
```

`cache_invalid === true` 表示服务端判定缓存已失效，应改用 [`login_account`](/api/login_account) 重新登录。

失败结果的 `code` 不一定为 `1`，也不一定包含 `cache_invalid`。缓存不存在时返回 `message: "缓存不存在"`、`cache_invalid: false`；网络等其他失败应结合 `message` 处理。任何失败后都可以改用 `login_account`。不要仅凭 `cache_invalid` 判断是否成功，只有 `code === 0` 才表示登录成功。

参数错误、账号不属于当前节点或账号未离线等调用错误会返回 `ok: false`。
