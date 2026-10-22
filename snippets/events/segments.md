## 消息段 Segment {#segment}

`Segment[]` 表示由多个 `Segment` 对象组成的数组，数组顺序就是消息内容顺序。引用摘要和撤回原消息中的 `message` 也使用此结构。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `type` | string | 消息段类型，见下表 |
| `data` | [SegmentData](#segment-types) | 与 `type` 对应的消息段数据，点击下表中的类型查看完整字段 |

### 消息段类型 {#segment-types}

| `type` | `data` 类型 | 说明 |
| --- | --- | --- |
| `text` | [TextData](#segment-text) | 文本 |
| `image` | [ImageData](#segment-image) | 图片 |
| `voice` | [VoiceData](#segment-voice) | 语音 |
| `video` | [VideoData](#segment-video) | 视频及封面 |
| `mention` | [MentionData](#segment-mention) | 群聊中 @ 某人 |
| `mention_all` | [MentionAllData](#segment-mention-all) | 群聊中 @ 全体成员 |
| `reply` | [ReplyData](#segment-reply) | 引用消息摘要及标识 |
| `ark` | [ArkData](#segment-ark) | Ark 卡片 |
| `face` | [FaceData](#segment-face) | 普通表情或资源表情 |
| `red_packet` | [QQRedPacketData](#segment-red-packet) | QQ 红包 |

撤回消息通过[群聊消息撤回](/events/group_recall)或[好友消息撤回](/events/friend_recall)事件推送。

### 文本 TextData {#segment-text}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `text` | string | 文本内容 |

### 图片 ImageData {#segment-image}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `file_id` | string | 图片的短期发送标识，使用期限见[媒体有效期](/guide/message-segments#媒体有效期) |
| `url` | string | 图片下载地址，有值时出现 |
| `width` | number | 图片宽度，非零时出现 |
| `height` | number | 图片高度，非零时出现 |

### 语音 VoiceData {#segment-voice}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `file_id` | string | 语音的短期发送标识 |
| `url` | string | 语音下载地址，有值时出现 |
| `duration` | number | 协议提供的语音时长，非零时出现 |
| `waveform` | [VoiceWaveform](#segment-voice-waveform) | 语音波形，有可用数据时出现 |

#### 语音波形 VoiceWaveform {#segment-voice-waveform}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `size` | number | 波形大小 |
| `amplitudes` | number[] | 波形振幅数组 |

### 视频 VideoData {#segment-video}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `file_id` | string | 视频的短期发送标识 |
| `url` | string | 视频下载地址，有值时出现 |
| `name` | string | 视频文件名，有值时出现 |
| `md5` | string | 视频 MD5，有值时出现 |
| `sha1` | string | 视频 SHA1，有值时出现 |
| `size` | number | 视频文件大小，非零时出现 |
| `width` | number | 视频宽度，非零时出现 |
| `height` | number | 视频高度，非零时出现 |
| `duration` | number | 协议提供的视频时长，非零时出现 |
| `thumb_file_id` | string | 封面文件标识，有值时出现 |
| `thumb_url` | string | 封面下载地址，有值时出现 |
| `thumb_name` | string | 封面文件名，有值时出现 |
| `thumb_md5` | string | 封面 MD5，有值时出现 |
| `thumb_sha1` | string | 封面 SHA1，有值时出现 |
| `thumb_size` | number | 封面文件大小，非零时出现 |
| `thumb_width` | number | 封面宽度，非零时出现 |
| `thumb_height` | number | 封面高度，非零时出现 |

### 提及 MentionData {#segment-mention}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_id` | number | 被 @ 用户的 QQ 号 |
| `display` | string | 展示文案，有值时出现 |

### 全体成员 MentionAllData {#segment-mention-all}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| — | — | `data` 为空对象，没有子字段 |

### 引用 ReplyData {#segment-reply}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `message_id` | string | 被引用消息 UID 的十进制字符串，保留完整精度；协议未提供 UID 时为空字符串 |
| `msg_seq` | number | 被引用消息的普通序号，非零时提供 |
| `nt_msg_seq` | number | 被引用消息的 NT 序号，非零时提供；与 `msg_seq` 分别保留 |
| `user_id` | number | 被引用消息发送者的 QQ 号 |
| `text` | string | 引用内容摘要，包含文本与表情文案；没有可解析的摘要时为空字符串 |
| `time` | number | 被引用消息的 Unix 秒时间戳，为 `0` 时省略 |
| `message` | [Segment[]](#segment) | 按顺序保留引用摘要中的 [text](#segment-text)、[face](#segment-face) 消息段，没有可解析的摘要时省略 |

这些标识属于被引用消息，当前消息的标识见事件外层的 `msg`。纯表情引用也会保留 `reply` 段。`message` 只表示协议携带的引用摘要，不保证包含完整原消息。

### 卡片 ArkData {#segment-ark}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `app` | string | 卡片应用标识 |
| `desc` | string | 卡片描述，有值时出现 |
| `prompt` | string | 卡片提示文案 |
| `view` | string | 卡片视图标识 |
| `meta` | [JSON](#segment-ark-payload) | 卡片业务数据，有值时出现 |
| `extra` | [JSON](#segment-ark-payload) | 卡片扩展数据，有值时出现 |
| `config` | [JSON](#segment-ark-payload) | 卡片配置，有值时出现 |
| `bizsrc` | string | 业务来源，有值时出现 |
| `ver` | string | 卡片版本，有值时出现 |

#### 卡片动态数据 {#segment-ark-payload}

`meta`、`extra`、`config` 保留卡片携带的 JSON 值，其内容由 `app`、`view` 和卡片版本决定，没有统一的子字段表。解析卡片时，先根据 `app`、`view` 判断业务类型，再读取相应数据。

### 表情 FaceData {#segment-face}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `kind` | string | `qq_face` 为普通表情，`super_face` 为资源表情 |
| `type` | number | 表情协议类型，例如 `2`、`33`、`37`，非零时出现 |
| `category_id` | number | 资源表情分类 ID，非零时出现 |
| `face_id` | string | 表情 ID |
| `face_code` | string | 普通表情的原始编码，十六进制字符串，有值时出现 |
| `package_id` | number | 资源表情包或资源 ID，非零时出现 |
| `text` | string | 展示文案，例如“[表情]” |

### 红包 QQRedPacketData {#segment-red-packet}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `title` | string | 红包标题 |
| `listid` | string | 红包标识 |
| `authkey` | string | 红包认证信息 |
| `channel` | number | 红包渠道 |
| `pay_flag` | number | 支付标记 |
| `hb_from` | number | 红包来源标记 |
| `msg_random` | number | 口令消息随机数，有值时出现 |
| `client_seq` | number | 口令消息客户端序号，有值时出现 |
| `grab_uin_list` | number[] | 协议提供的领取用户 QQ 号列表，有数据时出现 |
