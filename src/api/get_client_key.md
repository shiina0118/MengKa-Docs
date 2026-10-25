# get_client_key

获取当前 Bot 会话的 client_key。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "get_client_key",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

## 返回值

```js
{ client_key: 'HEX_ENCODED_CLIENTKEY' }
```

`client_key` 使用十六进制编码。
