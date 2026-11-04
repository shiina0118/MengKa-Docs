# qqmusic_get_song_url

使用已保存的 QQ 音乐登录票据，换取单曲的播放/下载地址（CDN `sip` + `purl` + `vkey`）。

地址由服务端按账号权限下发；没有试听/播放权限时 `purl` 为空，原因见返回中的 `errtype`、`tips`。一次换一首歌。票据来自 [qqmusic_login](/api/qqmusic_login) 或 [qqmusic_refresh_ticket](/api/qqmusic_refresh_ticket) 的返回值，本接口不会保存票据。目前仅支持 Android 账号。

## 调用

示例中的票据需替换为实际保存的值。

```json
{
  "type": "action",
  "id": "1",
  "action": "qqmusic_get_song_url",
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
| `song_mid` | string | 是 | - | 歌曲 MID，可从 [qqmusic_search_song](/api/qqmusic_search_song) 的 `body.item_song[].mid` 获取 |
| `song_type` | number | 否 | `0` | 歌曲类型，通常不传或传 `0` |
| `filename` | string | 否 | - | 指定音质文件名，不传则由服务端按账号权限选择 |

`filename` 的格式是「音质前缀 + 歌曲 MID + 扩展名」，常用值：

| 音质 | filename 示例 |
| --- | --- |
| 128k（m4a，默认） | `C4000039MnYb0qxYhV.m4a` |
| 320k（mp3） | `M5000039MnYb0qxYhV.mp3` |
| 无损（flac） | `F0000039MnYb0qxYhV.flac` |
| 无损（ape） | `A0000039MnYb0qxYhV.ape` |
| Hi-Res | `RS010039MnYb0qxYhV.flac` |

账号无对应音质权限时，`purl` 可能为空，以返回的 `errtype`、`tips` 为准。

## 返回值

`data` 为 vkey 服务返回的 JSON，原样透传，示例（默认音质，部分字段）：

```js
{
  sip: ['http://aqqmusic.tc.qq.com/', 'http://sjy6.stream.qqmusic.qq.com/'],
  midurlinfo: [
    {
      songmid: '0039MnYb0qxYhV',
      filename: 'C400003Qui1q2u1Zho.m4a',
      purl: 'C400003Qui1q2u1Zho.m4a?guid=...&vkey=...&uin=1577159758&fromtag=120032&redirect=1',
      vkey: '436257B9...',
      errtype: '',
      isbuy: 0,
      pneedbuy: 0,
      isonly: 0,
      result: 0,
      tips: ''
    }
  ]
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `sip[]` | array | 可用 CDN 服务器地址列表 |
| `midurlinfo[]` | array | 每首歌的地址信息，顺序与请求的 `songmid` 一致 |
| `midurlinfo[].songmid` | string | 歌曲 MID |
| `midurlinfo[].filename` | string | 服务端实际下发的文件名（含音质前缀） |
| `midurlinfo[].purl` | string | 相对地址；为空表示没有可用链接 |
| `midurlinfo[].vkey` | string | 本次链接的 vkey |
| `midurlinfo[].errtype` | string | 失败原因标记，成功为空字符串 |
| `midurlinfo[].tips` | string | 服务端提示文案 |
| `midurlinfo[].isbuy` / `pneedbuy` / `isonly` / `result` | number | 购买、试听等标记，原样返回 |

**播放/下载地址 = `sip[0] + purl`**，例如：

```js
'http://aqqmusic.tc.qq.com/' + 'C400003Qui1q2u1Zho.m4a?guid=...&vkey=...'
```

链接带时效，通常用于当次播放或下载；过期后重新调用本接口换取。其余字段（`testfile2g`、`servercheck`、`expiration` 等）原样返回，含义未在文档中逐一确认。

## 失败处理

- `song_mid` 为空时直接返回参数错误。
- `musickey` 为空时直接返回参数错误。
- 歌曲不存在时，`error` 中包含服务端返回码。
- 票据无效或已过期时，`error` 中包含「票据无效或已过期」，此时需调用 [qqmusic_login](/api/qqmusic_login) 重新获取票据。
- `purl` 为空但接口本身成功时，`data` 正常返回，原因看 `errtype`、`tips`（如需要购买、无版权等）。
- Bot 不在线或不是 Android 账号时返回失败结果，`error` 中说明原因。

`musickey` 是账号凭据，请勿写入日志或转发给不可信方。
