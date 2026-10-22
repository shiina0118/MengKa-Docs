# 新增好友

收到已成为好友的推送时，上报 `post_type: "friend_notice"`、`sub_type: "increase"`。认证时需要声明 `friend_event` 权限。

## 事件内容

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | Bot QQ 号 |
| `protocol_id` | number | 接收账号的协议 ID，允许为 `0` |
| `post_type` | string | 固定为 `friend_notice` |
| `sub_type` | string | 固定为 `increase` |
| `user_id` | number | 新增好友的 QQ 号，无法从推送或已有缓存取得时省略 |
| `user_uid` | string | 新增好友的 UID，无法取得时省略 |
| `operator` | object | 新增好友信息，见下表 |

### operator

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_id` | number | 好友 QQ 号，未知时为 `0` |
| `nickname` | string | 推送昵称，缺省时依次使用缓存昵称、QQ 号或 UID |

`operator` 表示新增的好友，不用于判断由谁发起申请。

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
      "nickname": "新朋友"
    }
  }
}
```

## 身份缓存

后端将消息路由中的 UIN/UID 与业务体中的好友身份匹配，优先直接使用推送携带的 QQ 号和 UID，也可读取已有的本地映射缓存。取得完整映射后，会在发布事件前写入双向缓存，并缓存昵称，供后续发送好友消息等 API 使用。

只有 UID 且本地缓存未命中时仍会上报事件，但不写入不完整映射，也不发起额外查询。

对应 SSO：`trpc.msg.olpush.OlPushService.MsgPush`，`MsgType = 528 (0x210)`、`SubType = 179 (0xB3)`。
