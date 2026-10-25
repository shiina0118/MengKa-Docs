# get_user_agent

获取当前 Bot 使用的 User-Agent。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "get_user_agent",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | Bot QQ 号，登录验证过程中也可调用 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

## 返回值

```js
{
  user_agent: 'Mozilla/5.0 ...'
}
```

需要使用该 Bot 的 User-Agent 时，直接使用返回的 `user_agent` 字符串。
