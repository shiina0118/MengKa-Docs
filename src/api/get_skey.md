# get_skey

获取当前 Bot 会话的 skey。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "get_skey",
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
{ skey: 'SKEY' }
```

该凭据属于当前 Bot 会话，应仅在插件运行期间使用。
