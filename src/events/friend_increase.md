# 新增好友

收到已成为好友的推送时，上报 `post_type: "friend_notice"`、`sub_type: "increase"`。认证时需要声明 `friend_event` 权限。

## 事件内容

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | Bot QQ 号 |
| `protocol_id` | number | 接收账号的协议 ID，允许为 `0` |
| `post_type` | string | 固定为 `friend_notice` |
| `sub_type` | string | 固定为 `increase` |
| `user_id` | number | 新增好友的 QQ 号，未知时省略 |
| `user_uid` | string | 新增好友的 UID，无法取得时省略 |
| `operator` | object | 新增好友信息，见下表 |

### operator

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_id` | number | 好友 QQ 号，未知时为 `0` |
| `nickname` | string | 好友真实网名；未知时为 `""` |
| `remark` | string | 当前 Bot 为该好友设置的备注；为空时省略 |

`operator` 表示新增的好友，不用于判断由谁发起申请。

展示时优先使用 `remark`，其次使用 `nickname`；两者均不可用时，客户端可显示 QQ 号或 `user_uid`。`nickname` 本身不会填入备注、QQ 号或 UID。

## 示例

```json
{
  "type": "event",
  "data": {
    "self_id": 123456789,
    "protocol_id": 0,
    "post_type": "friend_notice",
    "sub_type": "increase",
    "user_id": 234567890,
    "user_uid": "u_example_friend",
    "operator": {
      "user_id": 234567890,
      "nickname": "新朋友",
      "remark": "小王"
    }
  }
}
```

## 使用说明

好友身份信息不完整时，仍会发送此事件。插件应检查 `user_id`、`user_uid` 等实际返回字段，再执行需要完整好友身份的操作。
