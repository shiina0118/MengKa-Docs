# 消息结构

消息标识、发送者和消息段的字段表也展示在[群聊消息](/events/group_message)、[好友消息](/events/friend_message)等对应事件页面，点击类型列即可在本页查看嵌套字段。

## 群聊消息

事件为 `group_message`，完整字段见[群聊消息](/events/group_message)。

## 好友消息

事件为 `friend_message`，完整字段见[好友消息](/events/friend_message)。

<!--@include: ../../snippets/events/msg.md-->

<!--@include: ../../snippets/events/sender.md-->

<!--@include: ../../snippets/events/event-user.md-->

<!--@include: ../../snippets/events/original.md-->

## 消息段

消息段由 `type` 和 `data` 组成，具体字段见下表。

<!--@include: ../../snippets/events/segments.md-->
