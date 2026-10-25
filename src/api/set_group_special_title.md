# set_group_special_title

设置或清除群聊成员的专属头衔。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "set_group_special_title",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "user_id": 234567890,
    "title": "示例头衔"
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `group_id` | number | 是 | 群聊 ID |
| `user_id` | number | 是 | 目标成员 QQ 号 |
| `title` | string | 是 | 专属头衔，传空字符串清除头衔 |

省略 `title` 或传 `null` 会报错。清除头衔必须显式传空字符串。

## 返回值

```js
{
  success: true,
}
```
