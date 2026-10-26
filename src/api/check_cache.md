# check_cache

检查账号是否具备可用于尝试缓存登录的本地数据。NT 和 WT 账号共用本接口，不需要指定登录模式。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "check_cache",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 当前节点下的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

## 返回值

```json
{ "has_cache": true }
```

`has_cache` 只表示本地是否存有登录缓存。缓存能否继续使用只有服务端知道，必须通过 [`cache_login`](/api/cache_login) 的登录结果判断。`has_cache` 为 `false` 时，按账号模式调用 [`ntlogin_login_account`](/api/ntlogin_login_account) 或 [`wtlogin_login_account`](/api/wtlogin_login_account) 进行密码登录；Linux 账号也可调用 [`get_login_qr`](/api/get_login_qr) 进行扫码登录。
