# 事件概述

WebSocket 连接（正向和反向）支持账号、好友、群聊相关事件，正向 HTTP 不推送事件。侧栏按与 API 一致的分类组织，每个具体事件都有独立页面。

## 账号相关

### 状态类

| 事件 | `post_type` | 正向认证权限 |
| --- | --- | --- |
| [Bot 上线](/events/bot_online) | `bot_online` | `bot_online` |
| [Bot 离线](/events/bot_offline) | `bot_offline` | `bot_offline` |

## 好友相关

### 消息类

| 事件 | `post_type` | `sub_type` | 正向认证权限 |
| --- | --- | --- | --- |
| [好友消息](/events/friend_message) | `friend_message` | — | `friend_message` |
| [好友消息撤回](/events/friend_recall) | `friend_notice` | `recall` | `friend_event` |

### 通知类

| 事件 | `post_type` | `sub_type` | 正向认证权限 |
| --- | --- | --- | --- |
| [好友点赞](/events/friend_like) | `friend_notice` | `like` | `friend_event` |
| [新增好友](/events/friend_increase) | `friend_notice` | `increase` | `friend_event` |

## 群聊相关

### 消息类

| 事件 | `post_type` | `sub_type` | 正向认证权限 |
| --- | --- | --- | --- |
| [群聊消息](/events/group_message) | `group_message` | — | `group_message` |
| [群聊消息撤回](/events/group_recall) | `group_notice` | `recall` | `group_event` |

### 通知类

| 事件 | `post_type` | `sub_type` | 正向认证权限 |
| --- | --- | --- | --- |
| [入群申请](/events/group_apply) | `group_notice` | `apply` | `group_event` |
| [成员加入](/events/group_increase) | `group_notice` | `increase` | `group_event` |
| [成员退出](/events/group_decrease) | `group_notice` | `decrease` | `group_event` |
| [成员禁言](/events/group_mute) | `group_notice` | `mute` | `group_event` |

## 事件帧

事件以 `type` 为 `event` 的消息推送，事件内容位于 `data`，按 `data.post_type` 分发：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `type` | string | 固定为 `event` |
| `data` | [Event](#账号相关) | 事件内容，包含下方公共字段及各具体事件的字段 |

各事件页面的“事件内容”表格描述 `data` 内的字段。

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

## 名称字段

消息和通知事件将真实网名、好友备注、群名片分开推送：

| 字段 | 含义 | 无可用数据时 |
| --- | --- | --- |
| `nickname` | 用户真实网名 | 保留字段，值为 `""` |
| `remark` | 当前账号设置的好友备注 | 省略 |
| `card` | 当前账号、当前群内的群名片 | 省略 |
| `invitor_nickname`、`handler_nickname`、`operator_nickname` | 对应事件角色的真实网名 | 省略 |
| `invitor_card`、`handler_card`、`operator_card` | 对应事件角色在当前群的名片 | 省略 |

备注按 `self_id + user_id` 区分，群名片按 `self_id + group_id + user_id` 区分；真实网名按 `user_id` 共享。以上规则也适用于撤回、禁言、入退群、入群申请、好友新增和点赞事件。撤回原消息使用 `user_name` 表示真实网名，并单独提供 `remark` 或 `card`；`user_name` 为空时省略。

客户端展示好友时使用 `remark → nickname → user_id`，展示群成员时使用 `card → nickname → user_id`。例如：

```js
const friendName = user.remark || user.nickname || String(user.user_id)
const groupMemberName = user.card || user.nickname || String(user.user_id)
```

旧版插件若直接把 `nickname` 当作展示名称，需要调整为上述取值顺序。后端不会再把备注、群名片、QQ 号或 UID 填进 `nickname`，也不会用网名补齐空的 `card`。当身份只提供 UID 时，可使用事件中的 UID 展示。

## 处理建议

事件与 API 结果共用同一个连接。耗时的事件处理应异步进行，不要阻塞读取循环，否则会延迟后续事件和 API 结果的接收。
