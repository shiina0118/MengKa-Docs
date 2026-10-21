# 消息段

## send_group_msg

```js
const result = await api.send_group_msg(self_id, platform, group_id, message)
```

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 在线 Bot QQ 号 |
| `platform` | string | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `group_id` | number | 目标群聊 ID |
| `message` | Segment[] | 消息段数组 |

成功返回：

```js
{ success: true, msg_seq: 123, msg_random: 456 }
```

`msg_seq` 与 `msg_random` 可用于 [`recall_group_msg`](/api/recall_group_msg)。

## send_friend_msg

```js
const result = await api.send_friend_msg(self_id, platform, user_id, message)
```

好友消息当前支持 `text` 和 `image` 段。成功返回结构与群聊消息一致。

## 发送消息段

### text

```js
{ type: 'text', data: { text: '你好' } }
```

### at

仅用于群聊消息。`user_id` 使用数字；字符串 `all` 表示全体成员。

```js
{ type: 'at', data: { user_id: 123456789 } }
{ type: 'at', data: { user_id: 'all' } }
```

### image

```js
{ type: 'image', data: { file_id: 'FILE_ID' } }
```

群聊图片的 `file_id` 可来自刚收到的群聊图片，或 [`upload_group_image`](/api/upload_group_image) 的返回值；好友图片使用 [`upload_friend_image`](/api/upload_friend_image) 的返回值。使用期限见[媒体有效期](#媒体有效期)。

### voice

```js
{ type: 'voice', data: { file_id: 'FILE_ID' } }
```

语音段应使用 `upload_group_voice` 的返回值，且只能发送到上传时指定的群。

### video

```js
{ type: 'video', data: { file_id: 'FILE_ID' } }
```

视频段应使用 `upload_group_video` 的返回值，并作为一条独立消息发送。

### face

QQ 原生表情：

```js
{
  type: 'face',
  data: {
    kind: 'qq_face',
    face_id: '14'
  }
}
```

普通表情可按 `face_id` 发送。资源表情使用 `kind: 'super_face'`，并按收到的 `face` 消息段原样传递 `type`、`category_id`、`face_id`、`package_id` 和 `text`。

## 媒体有效期

图片、语音、视频的 `file_id` 是短期发送标识。请在上传成功或收到图片后的 **2 分钟内**使用；超过期限或 Meng Ka 重启后，旧标识可能无法发送，需要重新上传。不要将 `file_id` 当作永久资源地址保存。

上传后尽快发送。语音和视频应发送到上传时指定的群；好友图片使用好友图片上传接口。

## upload_group_image

```js
const image = await api.upload_group_image(
  self_id,
  platform,
  group_id,
  file_path,
)

await api.send_group_msg(self_id, platform, group_id, [image])
```

`file_path` 支持后端可访问的本地路径、`file://` 和 `http://`/`https://` 地址。返回值可直接作为消息段使用：

```js
{ type: 'image', data: { file_id: 'FILE_ID' } }
```

## upload_friend_image

```js
const image = await api.upload_friend_image(
  self_id,
  platform,
  user_id,
  file_path,
)

await api.send_friend_msg(self_id, platform, user_id, [image])
```

返回值可直接作为好友消息段使用。

## upload_group_voice

```js
const voice = await api.upload_group_voice(self_id, platform, group_id, file_path)
await api.send_group_msg(self_id, platform, group_id, [voice])
```

输入支持 MP3、WAV 和 QQ Silk 文件，返回值可直接作为 `voice` 消息段使用。支持的输入方式见 [`upload_group_voice`](/api/upload_group_voice)。

## upload_group_video

```js
const video = await api.upload_group_video(self_id, platform, group_id, file_path)
await api.send_group_msg(self_id, platform, group_id, [video])
```

输入文件必须为支持的 MP4 格式，无需额外提供封面。文件要求见 [`upload_group_video`](/api/upload_group_video)。返回值可直接作为 `video` 消息段使用，并须作为唯一消息段单独发送。

## 合并转发

读取收到的合并转发消息：

```js
const result = await api.get_group_forward_msg(self_id, platform, sender_id, res_id)
// { res_id, messages }
```

创建仅包含文本的合并转发消息：

```js
const result = await api.upload_group_forward_msg(self_id, platform, group_id, [
  {
    user_id: 123456789,
    nickname: '示例用户',
    time: Math.floor(Date.now() / 1000),
    message: [{ type: 'text', data: { text: '第一条消息' } }],
  },
])

await api.send_group_msg(self_id, platform, group_id, result.message)
```

`time` 为 Unix 秒。非 `text` 消息段会被忽略，返回值包含已上传和被忽略的数量。

## 接收消息段

消息事件的 `message` 数组可能包含：

| 类型 | 常用数据字段 |
| --- | --- |
| `text` | `text` |
| `image` | `file_id`, `url`, `width`, `height` |
| `voice` | `file_id`, `url`, `duration` |
| `video` | `file_id`, `url`, `name`, `size`, `width`, `height`, `duration` |
| `mention` | `user_id`, `display` |
| `mention_all` | 空对象 |
| `reply` | `message_id`, `user_id`, `text`, `time` |
| `recall` | 操作者、消息标识和可选原消息 |
| `ark` | Ark 卡片字段 |
| `face` | `kind`, `type`, `face_id`, `text` 等 |
| `red_packet` | `title`, `listid`, `authkey`, `channel`, `pay_flag`, `hb_from` |

发送段与接收段的类型并非完全对称。例如发送群 @ 使用 `at` 和 `user_id`，接收时使用 `mention` 和 `user_id`。
