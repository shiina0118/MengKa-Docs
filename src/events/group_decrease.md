# 成员退出

以事件帧推送，`post_type` 为 `group_notice`，`sub_type` 为 `decrease`。需要在认证时声明 `group_event` 权限。

所有事件都包含 `self_id`、`protocol_id` 和 `post_type`，详见[事件概述](/events/#公共字段)。

## 事件内容

成员主动退群或被移出群时推送。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | Bot QQ 号 |
| `protocol_id` | number | 接收账号的协议 ID，允许为 `0` |
| `post_type` | string | 固定为 `group_notice` |
| `sub_type` | string | 固定为 `decrease` |
| `group_id` | number | 群聊 ID |
| `group_name` | string | 群聊名称，可能省略 |
| `user_id` | number | 离群成员的 QQ 号 |
| `nickname` | string | 离群成员的真实网名，未知时为 `""` |
| `card` | string | 离群成员在当前群的名片，为空时省略 |
| `operator_id` | number | 操作者 QQ 号，主动退群或无可用数据时可能省略 |
| `operator_nickname` | string | 操作者真实网名，主动退群或无可用数据时省略 |
| `operator_card` | string | 操作者在当前群的名片，为空时省略 |
| `request_id` | number | 对应请求 ID |
| `request_type` | number | 对应请求类型 |

## 名称示例

事件 `data` 中的部分字段：

```json
{
  "user_id": 234567890,
  "nickname": "小明",
  "card": "技术组小明",
  "operator_id": 345678901,
  "operator_nickname": "小李",
  "operator_card": "管理员小李"
}
```

展示离群成员时使用 `card → nickname`，展示操作者时使用 `operator_card → operator_nickname`。无可用名称时由客户端展示对应 QQ 号。
