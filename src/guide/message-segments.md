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

好友消息当前支持 `text` 段。成功返回结构与群聊消息一致。

## 发送消息段

### text

```js
{ type: 'text', data: { text: '你好' } }
```

### at

仅用于群聊消息。`uin` 使用字符串；`all` 表示全体成员。

```js
{ type: 'at', data: { uin: '123456789' } }
{ type: 'at', data: { uin: 'all' } }
```

### image

```js
{ type: 'image', data: { file_id: 'FILE_ID' } }
```

`file_id` 可来自收到的群聊图片，但缓存时间有限；更稳定的方式是先调用 `upload_group_image`。

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

`face_code` 为可选的十六进制原始表情码。资源表情使用 `kind: 'super_face'`，并按收到的 `face` 消息段传递 `type`、`category_id`、`face_id`、`package_id` 和 `text`。

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

`file_path` 支持本地路径、`file://` 和 `http://`/`https://` 地址。文件名和图片类型由后端自动生成。返回值可直接作为消息段使用：

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

好友图片的文件名和图片类型由后端自动生成，返回值可直接作为好友消息段使用。

## upload_group_voice

```js
const voice = await api.upload_group_voice(self_id, platform, group_id, file_path)
await api.send_group_msg(self_id, platform, group_id, [voice])
```

输入音频须为已支持的 MP3。后端使用纯 Go 解码、转换为 QQ 语音所需的单声道 24kHz PCM、编码为 Silk 并生成波形，返回值可直接作为 `voice` 消息段使用。AAC/M4A、WAV、FLAC 等其他音频格式会返回未支持错误。

## upload_group_video

```js
const video = await api.upload_group_video(self_id, platform, group_id, file_path)
await api.send_group_msg(self_id, platform, group_id, [video])
```

输入文件必须为 MP4 格式。后端纯 Go 读取视频信息、解码首帧并生成 PNG 封面。支持独立 JPEG/PNG 帧、H.264 Baseline/Main/High 8 位 IDR，以及 HEVC Main/Main Intra/Main10 8/10 位 IRAP I 首帧；AVC/HEVC 要求逐行扫描、4:2:0。H.264 包含 CAVLC/CABAC、4×4/8×8 与自定义缩放矩阵，HEVC 支持默认矩阵、WPP 和多个 slice。10 位 HEVC 封面保存为 16 位 PNG。

支持匹配首帧的 CTTS/edit 时间线和 nclx/nclc 中已支持的 SDR 颜色描述。未支持的 codec/位深、需要参考链的首帧、HEVC 自定义矩阵、HDR/ICC、复杂编辑、分片或旋转等直接返回明确错误。返回值可直接作为 `video` 消息段使用，视频原始内容不转码。

## 合并转发

读取收到的合并转发消息：

```js
const result = await api.get_group_forward_msg(self_id, platform, sender_uin, res_id)
// { res_id, messages }
```

创建仅包含文本的合并转发消息：

```js
const result = await api.send_group_forward_msg(self_id, platform, group_id, [
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

发送段与接收段的类型并非完全对称。例如发送群 @ 使用 `at` 和 `uin`，接收时使用 `mention` 和 `user_id`。
