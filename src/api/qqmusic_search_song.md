# qqmusic_search_song

使用已保存的 QQ 音乐登录票据，按关键词搜索 QQ 音乐（单曲、歌手、专辑、歌单、MV）。

只能使用 Bot 账号自己搜索。票据来自 [qqmusic_login](/api/qqmusic_login) 或 [qqmusic_refresh_ticket](/api/qqmusic_refresh_ticket) 的返回值，本接口不会保存票据。目前仅支持 Android 账号。

## 调用

示例中的票据需替换为实际保存的值。

```json
{
  "type": "action",
  "id": "1",
  "action": "qqmusic_search_song",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "musickey": "MUSICKEY",
    "query": "周杰伦",
    "search_type": 0,
    "page": 1,
    "num": 20
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `self_id` | number | 是 | - | 在线 Bot QQ 号，须与票据所属账号一致 |
| `protocol_id` | number | 是 | - | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `musickey` | string | 是 | - | 最近一次登录或刷新返回的 `musickey` |
| `query` | string | 是 | - | 搜索关键词，不能为空 |
| `search_type` | number | 否 | `0` | 搜索类型：`0` 单曲、`1` 歌手、`2` 专辑、`3` 歌单、`4` MV |
| `page` | number | 否 | `1` | 页码，从 `1` 开始 |
| `num` | number | 否 | `20` | 每页条数，取值 `1` 到 `60` |

## 返回值

`data` 为搜索服务返回的 JSON，原样透传。结构为 `{ body, code, meta, ver, ... }`，其中：

- 单曲结果在 `body.item_song[]`（`search_type: 0`）；歌手在 `body.singer[]`、专辑在 `body.item_album[]`、歌单在 `body.item_songlist[]`、MV 在 `body.item_mv[]`。
- 分页信息在 `meta`。

示例（`query: "晴天"`，只列出单曲的关键字段）：

```js
{
  body: {
    item_song: [
      {
        name: '晴天',
        mid: '0039MnYb0qxYhV',
        id: 97773,
        interval: 269,
        singer: [{ id: 4558, mid: '0025NhlN2yWrP4', name: '周杰伦' }],
        album: { id: 8220, mid: '000MkMni19ClKG', name: '叶惠美' },
        file: { media_mid: '003Qui1q2u1Zho', size_128mp3: 4317292, size_flac: 36226753 },
        pay: { pay_play: 1, pay_down: 1, pay_month: 1 }
      }
    ]
  },
  meta: {
    curpage: 1,
    nextpage: 2,
    perpage: 20,
    estimate_sum: 126760
  }
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `body.item_song[]` | array | 单曲列表 |
| `body.item_song[].name` | string | 歌曲名 |
| `body.item_song[].mid` | string | 歌曲 MID，后续接口通常用它标识歌曲 |
| `body.item_song[].id` | number | 歌曲数字 ID |
| `body.item_song[].interval` | number | 时长（秒） |
| `body.item_song[].singer[]` | array | 歌手列表，含 `id` / `mid` / `name` |
| `body.item_song[].album` | object | 专辑，含 `id` / `mid` / `name` |
| `body.item_song[].file` | object | 各音质文件信息，如 `media_mid`、`size_128mp3`、`size_flac` |
| `body.item_song[].pay` | object | 付费相关标记 |
| `meta.curpage` | number | 当前页码 |
| `meta.nextpage` | number | 下一页页码；`-1` 表示没有下一页 |
| `meta.perpage` | number | 本次每页条数 |
| `meta.estimate_sum` | number | 服务端估算的结果总数 |

其余字段（如 `body.singer`、`body.item_album`、`action`、`lyric` 等）原样返回，含义未在文档中逐一确认。

## 翻页

用 `page` 和 `num` 翻页，并根据返回的 `meta.nextpage` 判断是否还有下一页：

- `meta.nextpage` 为 `-1`：已经到底。
- 否则把 `meta.nextpage` 作为下一次的 `page` 再调用。
- `num` 最大 `60`，超过会直接返回参数错误；单关键词最多可翻到约 999 条结果。

## 失败处理

- `query` 为空时直接返回参数错误。
- `num` 超出范围时直接返回参数错误。
- `musickey` 为空时直接返回参数错误。
- 票据无效或已过期时，`error` 中包含「票据无效或已过期」，此时需调用 [qqmusic_login](/api/qqmusic_login) 重新获取票据。
- 请求失败或服务返回错误时，`error` 中说明原因，可稍后重试。
- Bot 不在线或不是 Android 账号时返回失败结果，`error` 中说明原因。

`musickey` 是账号凭据，请勿写入日志或转发给不可信方。
