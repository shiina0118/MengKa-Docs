# delete_friend

删除指定好友。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "delete_friend",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `user_id` | number | 是 | 要删除的好友 QQ 号 |

## 返回值

```js
{ success: true, user_id: 112233445 }
```
