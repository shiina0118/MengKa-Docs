# set_group_card

设置或清除机器人自己或指定群聊成员的群名片（群昵称）。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "set_group_card",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "user_id": 123456789,
    "card": "示例群昵称"
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `group_id` | number | 是 | 群聊 ID，必须为大于 `0` 的整数 |
| `user_id` | number | 否 | 目标成员 QQ 号；省略或传 `0` 时默认修改当前 Bot 自己的群名片。修改其他成员时需具备相应群管理权限 |
| `card` | string | 是 | 新的群名片（群昵称），传空字符串 `""` 清除群名片 |

省略 `card` 或传 `null` 会报错。清除群名片必须显式传空字符串 `""`。名片长度限制、内容校验与修改权限由 QQ 服务端决定。

## 返回值

成功时外层为 `ok: true`，`data` 为：

```json
{
  "success": true
}
```

参数无效、Bot 未在线、权限不足或服务端拒绝时，返回 `ok: false`，`error` 包含原因。
