# get_ps_key

获取指定域名的 PsKey。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "get_ps_key",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "domain": "qzone.qq.com"
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `domain` | string | 是 | 目标域名 |

## 返回值

```js
{
  domain: 'DOMAIN',
  ps_key: 'PSKEY',
}
```
