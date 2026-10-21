# 事件概述

WebSocket 连接（正向和反向）支持相同的六类事件，正向 HTTP 不推送事件：

| `post_type` | 正向认证权限字段 | 说明 |
| --- | --- | --- |
| `group_message` | `group_message` | 群聊消息 |
| `friend_message` | `friend_message` | 好友消息 |
| `group_notice` | `group_event` | 入群、退群、禁言、撤回等群聊通知 |
| `friend_notice` | `friend_event` | 好友点赞等通知 |
| `bot_online` | `bot_online` | Bot 上线 |
| `bot_offline` | `bot_offline` | Bot 离线 |

## 事件帧

事件以 `type` 为 `event` 的消息推送，事件内容位于 `data`，按 `data.post_type` 分发：

```json
{
  "type": "event",
  "data": {
    "self_id": 123456789,
    "protocol_id": 0,
    "post_type": "group_message",
    "group_id": 987654321,
    "alt_message": "你好"
  }
}
```

::: tip 正向连接
正向连接只推送认证消息 `permissions` 中声明为 `true` 的事件，连接期间不能修改。反向连接默认接收全部六类事件。
:::

## 公共字段

所有事件都包含：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 接收事件的 Bot QQ 号 |
| `protocol_id` | number | 接收事件的账号协议 ID，允许为 `0` |
| `post_type` | string | 事件大类 |

通知事件额外包含 `sub_type`，用于区分具体通知。

事件中的 `self_id + protocol_id` 精确定位接收实例。回复消息时直接使用这两个字段，避免同一 QQ 的手机、平板、手表账号混用。

## 处理建议

事件与 API 结果共用同一个连接。耗时的事件处理应异步进行，不要阻塞读取循环，否则会延迟后续事件和 API 结果的接收。
