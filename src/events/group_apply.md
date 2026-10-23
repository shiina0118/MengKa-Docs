# 入群申请

以事件帧推送，`post_type` 为 `group_notice`，`sub_type` 为 `apply`。需要在认证时声明 `group_event` 权限。

所有事件都包含 `self_id`、`protocol_id` 和 `post_type`，详见[事件概述](/events/#公共字段)。

## 事件内容

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | Bot QQ 号 |
| `protocol_id` | number | 接收账号的协议 ID，允许为 `0` |
| `post_type` | string | 固定为 `group_notice` |
| `sub_type` | string | 固定为 `apply` |
| `group_id` | number | 目标群 ID |
| `group_name` | string | 目标群名称，可能省略 |
| `user_id` | number | 申请者 QQ 号 |
| `nickname` | string | 申请者真实网名，未知时为 `""` |
| `card` | string | 申请者在当前群的名片，无可用数据时省略 |
| `comment` | string | 申请附言，可能省略 |
| `request_id` | number | 请求 ID |
| `request_type` | number | 请求类型 |
| `request_extra` | number | 附加请求标识，为 `0` 时省略 |
| `invitor_id` | number | 邀请者 QQ 号，邀请入群且有可用数据时出现 |
| `invitor_nickname` | string | 邀请者真实网名，邀请入群且有可用数据时出现 |
| `invitor_card` | string | 邀请者在当前群的名片，邀请入群且有可用数据时出现 |

`request_*` 字段可直接用于 [`approve_group_apply`](/api/approve_group_apply) 或 [`reject_group_apply`](/api/reject_group_apply)。

## 名称示例

以下为事件 `data` 中的部分字段。申请者尚无可用名称时，`nickname` 仍保留为空字符串；邀请者的网名和群名片分别推送：

```json
{
  "user_id": 234567890,
  "nickname": "",
  "invitor_id": 345678901,
  "invitor_nickname": "小李",
  "invitor_card": "管理员小李"
}
```

展示邀请者时优先使用 `invitor_card`，其次使用 `invitor_nickname`。
