# 成员加入

以事件帧推送，`post_type` 为 `group_notice`，`sub_type` 为 `increase`。需要在认证时声明 `group_event` 权限。

所有事件都包含 `self_id`、`protocol_id` 和 `post_type`，详见[事件概述](/events/#公共字段)。

## 事件内容

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | Bot QQ 号 |
| `protocol_id` | number | 接收账号的协议 ID，允许为 `0` |
| `post_type` | string | 固定为 `group_notice` |
| `sub_type` | string | 固定为 `increase` |
| `group_id` | number | 群聊 ID |
| `group_name` | string | 群聊名称，可能省略 |
| `user_id` | number | 加入成员的 QQ 号 |
| `nickname` | string | 加入成员的真实网名，未知时为 `""` |
| `card` | string | 加入成员在当前群的名片，为空时省略 |
| `invitor_id` | number | 邀请者 QQ 号，无可用数据时省略 |
| `invitor_nickname` | string | 邀请者真实网名，无可用数据时省略 |
| `invitor_card` | string | 邀请者在当前群的名片，为空时省略 |
| `handler_id` | number | 处理人 QQ 号，无可用数据时省略 |
| `handler_nickname` | string | 处理人真实网名，无可用数据时省略 |
| `handler_card` | string | 处理人在当前群的名片，为空时省略 |
| `request_id` | number | 对应请求 ID |
| `request_type` | number | 对应请求类型 |

## 名称示例

事件 `data` 中的部分字段：

```json
{
  "user_id": 234567890,
  "nickname": "小明",
  "card": "技术组小明",
  "invitor_id": 345678901,
  "invitor_nickname": "小李",
  "invitor_card": "邀请人小李",
  "handler_id": 456789012,
  "handler_nickname": "小张",
  "handler_card": "管理员小张"
}
```

每个角色均使用自己的名片优先展示，其次使用网名；名片为空时，相应的 `*_card` 或 `card` 字段省略。
