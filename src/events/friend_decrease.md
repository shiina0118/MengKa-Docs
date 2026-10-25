# 好友关系移除

收到好友关系移除通知时，上报 `post_type: "friend_notice"`、`sub_type: "decrease"`。认证时需要声明 `friend_event` 权限。

此事件只表示好友关系被移除，不区分由谁执行删除。不要据此认定“对方删除了 Bot”。

## 事件内容

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | Bot QQ 号 |
| `protocol_id` | number | 接收账号的协议 ID，允许为 `0` |
| `post_type` | string | 固定为 `friend_notice` |
| `sub_type` | string | 固定为 `decrease` |
| `user_id` | number | 被移除好友的 QQ 号，未知时省略 |
| `user_uid` | string | 被移除好友的 UID |
| `target` | object | 被移除的好友信息，见下表 |

### target

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_id` | number | 好友 QQ 号，未知时为 `0` |
| `nickname` | string | 好友真实网名，未知时为 `""` |
| `remark` | string | 当前 Bot 为该好友设置的备注；为空时省略 |

`target` 表示被移除的好友。事件不提供 `operator`，无法判断删除操作者。

## 示例

```json
{
  "type": "event",
  "data": {
    "self_id": 123456789,
    "protocol_id": 0,
    "post_type": "friend_notice",
    "sub_type": "decrease",
    "user_id": 234567890,
    "user_uid": "u_example_friend",
    "target": {
      "user_id": 234567890,
      "nickname": "小王",
      "remark": "同事"
    }
  }
}
```

## 使用说明

QQ 号未知时仍会上报事件，插件可使用 `user_uid` 识别好友。展示名称可优先使用 `target.remark`，其次为 `target.nickname`，两者均不可用时使用 QQ 号或 UID。

一条通知涉及多个好友时，会分别上报事件。重复收到同一好友的移除事件时，插件应允许重复处理，不能将事件次数直接作为移除人数。

主动删除好友使用 [delete_friend](/api/delete_friend)。本事件本身不表示由该接口触发，也不提供删除原因。
