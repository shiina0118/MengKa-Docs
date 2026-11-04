# qqmusic_daily_sign

使用已保存的 QQ 音乐登录票据，查询或执行当前在线 Bot 自己的会员每日签到。

每日签到可获得成长值，签到成功后当天不能重复领取；重复调用不会重复发放。只能操作 Bot 账号自己，票据来自 [qqmusic_login](/api/qqmusic_login) 或 [qqmusic_refresh_ticket](/api/qqmusic_refresh_ticket) 的返回值，本接口不会保存票据。目前仅支持 Android 账号。

金币中心的签到是另一个接口，见 [qqmusic_coin_sign](/api/qqmusic_coin_sign)。

## 调用

`action` 为 `query` 时只查询状态，不改动账号；为 `sign` 时执行签到领取。示例中的票据需替换为实际保存的值。

```json
{
  "type": "action",
  "id": "1",
  "action": "qqmusic_daily_sign",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "musickey": "MUSICKEY",
    "action": "sign"
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `self_id` | number | 是 | - | 在线 Bot QQ 号，须与票据所属账号一致 |
| `protocol_id` | number | 是 | - | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `musickey` | string | 是 | - | 最近一次登录或刷新返回的 `musickey` |
| `action` | string | 是 | - | `query` 查询当天签到状态；`sign` 执行签到 |

## 返回值

`data` 为签到服务返回的 JSON，原样透传，示例（今天已签到后重复签到）：

```js
{
  Ret: 20019,
  Msg: '今天已经领取过',
  Info: {
    PubTime: 0,
    Score: 0,
    CvtScore: 0,
    YYYYMMDD: '',
    Rank: 0,
    Orders: null,
    Index: 0
  },
  Myrank: { encryptUin: '', nick: '', logo: '', value: 0, rank: 0, dissID: '' },
  Ranks: null,
  Total: 0,
  Drlist: { Vec: null }
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `Ret` | number | 返回码：`0` 表示签到成功；`20019` 表示今天已经领取过 |
| `Msg` | string | 服务端文案，如「今天已经领取过」 |
| `Total` | number | 本次签到获得的成长值；已领取或仅查询时为 `0` |
| `Info` | object | 成长值相关信息；非签到成功场景下多为空值，含义尚未完整确认 |
| `Myrank` | object | 自己的排名信息；非签到成功场景下多为空值 |
| `Ranks` | object / null | 排行榜数据，通常为 `null` |
| `Drlist` | object | 其他返回数据，通常为空 |

判断今天是否已签到看 `Ret`：`20019` 表示已经领取过；其他取值结合 `Msg` 处理，再用 `action: "sign"` 尝试签到。

## 失败处理

- `action` 不是 `query` 或 `sign` 时直接返回参数错误。
- `musickey` 为空时直接返回参数错误。
- 票据无效或已过期时，`error` 中包含「票据无效或已过期」，此时需调用 [qqmusic_login](/api/qqmusic_login) 重新获取票据。
- 请求失败或服务返回错误时，`error` 中说明原因；重复签到不会报错，而是返回 `Ret: 20019`。
- Bot 不在线或不是 Android 账号时返回失败结果，`error` 中说明原因。

`musickey` 是账号凭据，请勿写入日志或转发给不可信方。
