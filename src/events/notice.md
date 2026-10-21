# 通知事件

## 群聊通知

以事件帧推送，`data.post_type` 为 `group_notice`，`sub_type` 区分具体通知。需要在认证时声明 `group_event` 权限。

### apply

入群申请事件：

| 字段 | 说明 |
| --- | --- |
| `group_id`, `group_name` | 目标群 |
| `user_id`, `nickname` | 申请者 |
| `comment` | 申请附言，可能省略 |
| `request_id` | 请求 ID |
| `request_type` | 请求类型 |
| `request_extra` | 附加请求标识，可能省略 |
| `invitor_id`, `invitor_nickname` | 邀请者，邀请入群时可能出现 |

`request_*` 字段可直接用于 `approve_group_apply` 或 `reject_group_apply`。

### increase

成员进群事件包含 `group_id`、`group_name`、`user_id`、`nickname`，还可能包含邀请者与处理人：

```js
{
  invitor_id,
  invitor_nickname,
  handler_id,
  handler_nickname,
  request_id,
  request_type,
}
```

### decrease

成员退群或被移出群：

| 字段 | 说明 |
| --- | --- |
| `user_id`, `nickname` | 离群聊成员 |
| `operator_id`, `operator_nickname` | 操作者，主动退群时可能省略 |
| `request_id`, `request_type` | 对应请求信息 |

### mute

```js
{
  self_id,
  post_type: 'group_notice',
  sub_type: 'mute',
  group_id,
  group_name,
  operator: { user_id, nickname },
  target: { user_id, nickname },
  body: {
    duration: 600,
    status: true
  }
}
```

`duration` 为秒数，`status` 表示当前是否处于禁言状态。

### recall

```js
{
  operator: { user_id, nickname },
  target: { user_id, nickname },
  body: {
    msg_seq,
    msg_time,
    msg_random,
    prompt_text,
    original
  }
}
```

`original` 在可取得时包含原消息发送者、结构化消息段与文本摘要。

## 好友通知

以事件帧推送，`data.post_type` 为 `friend_notice`，`sub_type` 区分具体通知。需要在认证时声明 `friend_event` 权限。

### like

好友点赞：

```js
{
  self_id,
  post_type: 'friend_notice',
  sub_type: 'like',
  operator: { user_id, nickname },
  body: {
    text: '点赞内容',
    count: 1
  }
}
```
