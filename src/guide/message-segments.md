# 消息段

## send_group_msg

[`send_group_msg`](/api/send_group_msg) 的参数：

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 在线 Bot QQ 号 |
| `protocol_id` | number | 账号的协议 ID，与 `self_id` 共同定位实例 |
| `group_id` | number | 目标群聊 ID |
| `message` | [Segment[]](#发送消息段) | 消息段数组 |

成功返回：

```json
{ "success": true, "msg_seq": 123, "msg_random": 456, "client_seq": 789, "msg_time": 1700000000 }
```

`msg_seq` 与 `msg_random` 可用于 [`recall_group_msg`](/api/recall_group_msg)。

## send_friend_msg

[`send_friend_msg`](/api/send_friend_msg) 以 `user_id` 代替 `group_id`，其余参数相同。好友消息当前支持 `text` 和 `image` 段。成功返回结构与群聊消息一致。

好友消息可通过 [`recall_friend_msg`](/api/recall_friend_msg) 撤回。将同一次发送结果的 `msg_seq`、`msg_random`、`client_seq`、`msg_time` 原样传入，`msg_time` 单位为 Unix 秒。

## 发送消息段

### text

```json
{ "type": "text", "data": { "text": "你好" } }
```

### at

仅用于群聊消息。`user_id` 使用数字；字符串 `all` 表示全体成员。

```json
{ "type": "at", "data": { "user_id": 123456789 } }
```

```json
{ "type": "at", "data": { "user_id": "all" } }
```

### image

```json
{ "type": "image", "data": { "file_id": "FILE_ID" } }
```

群聊图片的 `file_id` 可来自刚收到的群聊图片，或 [`upload_group_image`](/api/upload_group_image) 的返回值；好友图片使用 [`upload_friend_image`](/api/upload_friend_image) 的返回值。使用期限见[媒体有效期](#媒体有效期)。

### voice

```json
{ "type": "voice", "data": { "file_id": "FILE_ID" } }
```

语音段应使用 `upload_group_voice` 的返回值，且只能发送到上传时指定的群。

### video

```json
{ "type": "video", "data": { "file_id": "FILE_ID" } }
```

视频段应使用 `upload_group_video` 的返回值，并作为一条独立消息发送。

### face

QQ 原生表情：

```json
{
  "type": "face",
  "data": {
    "kind": "qq_face",
    "face_id": "14"
  }
}
```

普通表情可按 `face_id` 发送。资源表情使用 `"kind": "super_face"`，并按收到的 `face` 消息段原样传递 `type`、`category_id`、`face_id`、`package_id` 和 `text`。

## 媒体有效期

图片、语音、视频的 `file_id` 是短期发送标识。请在上传成功或收到图片后的 **2 分钟内**使用；超过期限或 Meng Ka 重启后，旧标识可能无法发送，需要重新上传。不要将 `file_id` 当作永久资源地址保存。

上传后尽快发送。语音和视频应发送到上传时指定的群；好友图片使用好友图片上传接口。

## 上传媒体

上传接口只返回消息段，不会发出消息。把返回的 `data` 原样放进发送接口的 `message` 数组即可，例如把 `upload_group_image` 的结果发到群里：

```json
{
  "type": "action",
  "id": "2",
  "action": "send_group_msg",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "message": [{ "type": "image", "data": { "file_id": "FILE_ID" } }]
  }
}
```

| 接口 | 目标参数 | 说明 |
| --- | --- | --- |
| [`upload_group_image`](/api/upload_group_image) | `group_id` | `file_path` 支持后端可访问的本地路径、`file://` 和 `http://`/`https://` 地址，返回 `image` 消息段 |
| [`upload_friend_image`](/api/upload_friend_image) | `user_id` | 返回值作为好友消息的 `image` 段 |
| [`upload_group_voice`](/api/upload_group_voice) | `group_id` | 输入支持 MP3、WAV 和 QQ Silk 文件，返回 `voice` 消息段 |
| [`upload_group_video`](/api/upload_group_video) | `group_id` | 输入必须为支持的 MP4 格式，无需额外提供封面；返回的 `video` 段须作为唯一消息段单独发送 |

## 合并转发

读取收到的合并转发消息：调用 [`get_group_forward_msg`](/api/get_group_forward_msg)，返回 `res_id` 和 `messages`。

```json
{ "self_id": 123456789, "protocol_id": 0, "sender_id": 234567890, "res_id": "RES_ID" }
```

创建仅包含文本的合并转发消息：调用 [`upload_group_forward_msg`](/api/upload_group_forward_msg)，再把返回的 `message` 原样作为 `send_group_msg` 的 `message` 参数发送。

```json
{
  "self_id": 123456789,
  "protocol_id": 0,
  "group_id": 987654321,
  "messages": [
    {
      "user_id": 123456789,
      "nickname": "示例用户",
      "time": 1765432100,
      "message": [{ "type": "text", "data": { "text": "第一条消息" } }]
    }
  ]
}
```

`time` 为 Unix 秒。非 `text` 消息段会被忽略，返回值包含已上传和被忽略的数量。

## 接收消息段

消息事件的 `message` 是 [Segment[]](#segment)，每个元素都有 `type` 和 `data`。点击类型列可在本页查看各消息段的嵌套字段。

发送段与接收段的类型并非完全对称。例如发送群 @ 使用 `at` 和 `user_id`，接收时使用 `mention` 和 `user_id`。

### 引用消息段

引用段的 `type` 为 `reply`，完整字段见本页的 [ReplyData](#segment-reply)。其中 `message_id`、`msg_seq`、`nt_msg_seq` 属于被引用消息，当前消息的标识位于事件外层的 `msg`。

<!--@include: ../../snippets/events/segments.md-->
