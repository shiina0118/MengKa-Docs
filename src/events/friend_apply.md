# 好友申请

收到待处理的普通好友申请时，推送 `post_type: "friend_notice"`、`sub_type: "apply"`。认证时需要声明 `friend_event` 权限。

## 事件内容

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 接收申请的 Bot QQ 号 |
| `protocol_id` | number | 接收账号的协议 ID，允许为 `0` |
| `post_type` | string | 固定为 `friend_notice` |
| `sub_type` | string | 固定为 `apply` |
| `user_id` | number | 申请者 QQ 号 |
| `user_uid` | string | 申请者 UID，无可用数据时省略 |
| `nickname` | string | 申请者真实网名，未知时为 `""` |
| `comment` | string | 验证附言，可能省略 |
| `request_id` | string | 系统申请序号，以十进制字符串保留完整精度 |
| `request_time` | number | 申请时间，Unix 秒时间戳 |
| `request_type` | number | 申请类型；普通待处理申请为 `1`，处理时原样传入同名参数 |
| `request_sub_type` | number | 申请的附加类型标识，为 `0` 时省略；不能代替 `request_type` |
| `source_id` | number | 申请来源标识，可能为 `0`；处理时原样传入同名参数 |
| `sub_source_id` | number | 申请来源子标识，可能为 `0`；处理时原样传入同名参数 |
| `msg_type` | number | 申请消息类型；普通好友申请为 `1`，处理时原样传入同名参数 |
| `group_msg_type` | number | 申请上下文标识，可能为 `0`；处理时原样传入同名参数 |
| `actions` | array | 服务端提供的动作列表，保留原始顺序 |

`actions` 中每个对象包含：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | string | 服务端提供的动作名称 |
| `type` | number | 动作类型标识，默认值为 `1`；不是动作在数组中的索引 |
| `action_info` | string | 标准 Base64 格式的动作凭据；可能为空字符串，处理申请时仍需原样传入，无需解析或自行构造 |

## 示例

```json
{
  "type": "event",
  "data": {
    "self_id": 123456789,
    "protocol_id": 0,
    "post_type": "friend_notice",
    "sub_type": "apply",
    "user_id": 234567890,
    "user_uid": "u_example_applicant",
    "nickname": "小王",
    "comment": "你好，我是小王",
    "request_id": "9007199254740993",
    "request_time": 1792886400,
    "request_type": 1,
    "source_id": 0,
    "sub_source_id": 0,
    "msg_type": 1,
    "group_msg_type": 0,
    "actions": [
      { "name": "同意", "type": 2, "action_info": "CAI=" },
      { "name": "拒绝", "type": 3, "action_info": "CAM=" }
    ]
  }
}
```

## 使用说明

收到事件后，请保存处理申请所需的上下文：`user_id`、`request_id`、`msg_type`、`request_type`、`source_id`、`sub_source_id`、`group_msg_type`，以及所选动作的完整 `action_info`。示例中的动作类型和 Base64 仅作演示，应使用实际事件提供的值。

普通申请中，`actions[0]` 为同意动作，`actions[1]` 为拒绝动作。调用同意接口前应检查 `actions[0]` 是否存在，将其 `action_info` 原样作为请求参数传入，不要用数组索引或动作类型自行构造凭据。请求的 `request_type` 使用事件同名字段，不能使用字符串 `sub_type: "apply"` 或 `request_sub_type` 代替。

本事件表示普通好友申请仍可处理。已读申请也可能仍待处理；已同意或已拒绝的申请不会作为待处理申请上报。成为好友后由 [新增好友](/events/friend_increase) 事件通知。

事件可能包含较早的待处理申请，请通过 `request_time` 判断申请时间，不要将收到事件的时间视为申请时间。

事件可能延迟到达，未收到事件不代表没有待处理申请。

账号实例重建或服务重启后，同一申请可能再次上报。插件需要跨重启去重时，应保存 `self_id + protocol_id + user_id + request_id`。请保持 `request_id` 为字符串，不要转成 JavaScript `Number`。

同意申请使用 [approve_friend_apply](/api/approve_friend_apply)，将上述上下文和 `actions[0].action_info` 传回。拒绝申请的插件 API 尚未提供。
