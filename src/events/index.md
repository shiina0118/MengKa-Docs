# 事件概述

插件通过 `on(eventType, handler)` 注册事件处理函数。正向和反向 SDK 支持相同的五类事件：

| 监听器 | `post_type` | 说明 |
| --- | --- | --- |
| `group_message` | `group_message` | 群聊消息 |
| `friend_message` | `friend_message` | 好友消息 |
| `group_notice` | `group_notice` | 入群、退群、禁言、撤回等群聊通知 |
| `friend_notice` | `friend_notice` | 群聊邀请、好友点赞等通知 |
| `bot_offline` | `bot_offline` | Bot 离线 |

## 注册监听器

```js
api.on('group_message', event => {
  console.log(event.self_id)
  console.log(event.group_id)
  console.log(event.alt_message)
})
```

每种事件只能注册一个处理函数；再次调用 `on()` 会替换该类型已有的处理函数。

::: tip 正向连接
正向 SDK在认证时根据已注册的监听器声明权限，因此监听器应在 `connect()` 前注册。
:::

## 公共字段

所有事件都包含：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 接收事件的 Bot QQ 号 |
| `post_type` | string | 事件大类 |

通知事件额外包含 `sub_type`，用于区分具体通知。

## 回调异常

SDK会捕获事件回调中的同步异常并输出日志，不会因此断开 WebSocket。异步回调中的异常仍应由插件自行处理。

```js
api.on('friend_message', event => {
  void handleMessage(event).catch(console.error)
})
```
