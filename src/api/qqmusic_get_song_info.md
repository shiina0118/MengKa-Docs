# qqmusic_get_song_info

使用已保存的 QQ 音乐登录票据，按歌曲 MID 或数字 ID 查询单曲信息（歌曲名、歌手、专辑、时长、音质文件、付费标记、歌曲资料等）。

一次查询一首歌。票据来自 [qqmusic_login](/api/qqmusic_login) 或 [qqmusic_refresh_ticket](/api/qqmusic_refresh_ticket) 的返回值，本接口不会保存票据。目前仅支持 Android 账号。

## 调用

`song_mid` 与 `song_id` 二选一，都填也可以。示例中的票据需替换为实际保存的值。

```json
{
  "type": "action",
  "id": "1",
  "action": "qqmusic_get_song_info",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "musickey": "MUSICKEY",
    "song_mid": "0039MnYb0qxYhV"
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `self_id` | number | 是 | - | 在线 Bot QQ 号，须与票据所属账号一致 |
| `protocol_id` | number | 是 | - | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `musickey` | string | 是 | - | 最近一次登录或刷新返回的 `musickey` |
| `song_mid` | string | 否 | - | 歌曲 MID，可从 [qqmusic_search_song](/api/qqmusic_search_song) 的 `body.item_song[].mid` 获取 |
| `song_id` | number | 否 | - | 歌曲数字 ID，可从搜索结果 `body.item_song[].id` 获取 |
| `song_type` | number | 否 | `0` | 歌曲类型，通常不传或传 `0` |

`song_mid` 与 `song_id` 至少填一个，都为空时返回参数错误；两者都传时以服务端返回为准（实测结果一致）。

## 返回值

`data` 为歌曲服务返回的 JSON，原样透传，结构为 `{ track_info, info, extras }`。示例（`song_mid: "0039MnYb0qxYhV"`，只列出部分字段）：

```js
{
  track_info: {
    id: 97773,
    type: 1,
    mid: '0039MnYb0qxYhV',
    name: '晴天',
    title: '晴天',
    subtitle: '',
    singer: [{ id: 4558, mid: '0025NhlN2yWrP4', name: '周杰伦', title: '周杰伦' }],
    album: { id: 8220, mid: '000MkMni19ClKG', name: '叶惠美', title: '叶惠美', time_public: '2003-07-31' },
    mv: { id: 293791, vid: 'w0026q7f01a' },
    interval: 269,
    language: 0,
    genre: 0,
    time_public: '2003-07-31',
    file: { media_mid: '003Qui1q2u1Zho', size_128mp3: 4317292, size_flac: 36226753 },
    pay: { pay_play: 1, pay_down: 1, pay_month: 1, price_track: 200, pay_status: 0 }
  },
  info: [
    { title: '演唱者', type: 'JUMP_TO_SINGER', content: [{ value: '周杰伦' }] },
    { title: '作词', type: 'lyricist', content: [{ value: '徐若瑄' }] }
  ],
  extras: { name: '晴天', transname: '', subtitle: '', from: '', wikiurl: '' }
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `track_info` | object | 歌曲主体信息，字段见下表 |
| `info` | array | 歌曲资料分组（演唱者、作词、作曲、编曲、制作人、语种、唱片公司等），每项含 `title`、`type`、`content[]`；顺序与内容由服务端下发 |
| `extras` | object | 名称、译名、副标题、简介链接等附加信息 |

`track_info` 主要字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 歌曲数字 ID |
| `mid` | string | 歌曲 MID |
| `name` / `title` | string | 歌曲名 |
| `subtitle` | string | 副标题 |
| `singer[]` | array | 歌手列表，含 `id` / `mid` / `name` |
| `album` | object | 专辑，含 `id` / `mid` / `name` / `time_public` |
| `mv` | object | 关联 MV，含 `id` / `vid`；无 MV 时字段为空 |
| `interval` | number | 时长（秒） |
| `language` | number | 语种标记 |
| `genre` | number | 流派标记 |
| `time_public` | string | 发行日期 |
| `file` | object | 各音质文件信息，如 `media_mid`、`size_128mp3`、`size_flac` |
| `pay` | object | 付费标记，如 `pay_play`、`pay_down`、`pay_month`、`price_track` |

其余字段（`action`、`bpm`、`version`、`status` 等）原样返回，含义未在文档中逐一确认。

## 封面

歌曲封面不单独返回 URL，用 `track_info.album.mid`（专辑 MID）拼 QQ 音乐图片 CDN 地址即可：

```
https://y.gtimg.cn/music/photo_new/T002R{尺寸}x{尺寸}M000{albumMid}.jpg
```

尺寸可用 `300`、`500`、`800`。例如晴天（`album.mid = "000MkMni19ClKG"`）：

```
https://y.gtimg.cn/music/photo_new/T002R500x500M000000MkMni19ClKG.jpg
```

## 失败处理

- `song_mid` 与 `song_id` 都为空时直接返回参数错误。
- `musickey` 为空时直接返回参数错误。
- 歌曲不存在时，`error` 中包含服务端返回码（如 `req_code=400`），`data` 不会返回。
- 票据无效或已过期时，`error` 中包含「票据无效或已过期」，此时需调用 [qqmusic_login](/api/qqmusic_login) 重新获取票据。
- 请求失败时，`error` 中说明原因，可稍后重试。
- Bot 不在线或不是 Android 账号时返回失败结果，`error` 中说明原因。

`musickey` 是账号凭据，请勿写入日志或转发给不可信方。
