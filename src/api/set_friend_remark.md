# set_friend_remark

设置或清除指定好友的备注。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "set_friend_remark",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890,
    "remark": "示例备注"
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `user_id` | number | 是 | 目标好友 QQ 号 |
| `remark` | string | 是 | 新备注；传空字符串清除备注 |

`remark` 不可省略或传 `null`。目标必须是该 Bot 的好友。

## 返回值

```js
{ success: true, user_id: 234567890, remark: '项目联系人' }
```

失败时返回 `ok: false`。成功后可通过 [`get_friend_list`](/api/get_friend_list) 查询好友的 `remark`。
