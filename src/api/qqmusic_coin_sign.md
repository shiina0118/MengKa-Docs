# qqmusic_coin_sign

使用已保存的 QQ 音乐登录票据，查询或执行当前在线 Bot 自己在金币中心的每日签到（金币签到）。

金币签到与 [qqmusic_daily_sign](/api/qqmusic_daily_sign)（会员成长值签到）是两个不同的签到：本接口签到后获得的是金币，可在金币中心兑换。签到后当天不能重复领取，重复调用不会重复发放。只能操作 Bot 账号自己，票据来自 [qqmusic_login](/api/qqmusic_login) 或 [qqmusic_refresh_ticket](/api/qqmusic_refresh_ticket) 的返回值，本接口不会保存票据。目前仅支持 Android 账号。

## 调用

`action` 为 `query` 时只查询状态，不改动账号；为 `sign` 时执行签到。示例中的票据需替换为实际保存的值。

```json
{
  "type": "action",
  "id": "1",
  "action": "qqmusic_coin_sign",
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
| `action` | string | 是 | - | `query` 查询今天是否已签到；`sign` 执行金币签到 |

## 返回值

`data` 为签到服务返回的 JSON，原样透传，示例（今天已签到时查询）：

```js
{
  retCode: 0,
  retMsg: '',
  Info: {
    IsSignIn: 1,
    WeekSignInCount: 1,
    MonthSignInCount: 1,
    YearSignInCount: 1,
    AccSignInCount: 1,
    ContinueSignInCount: 1,
    LastSignInDay: 1793721600,
    ByDaySignInDayBits: 0,
    ByDaySignInDayIndex: 0,
    MaxSignContinueDays: 1,
    PeriodAccSignInCount: 0,
    ActDataProgress: 0,
    GlobalAccCount: 1,
    GlobalContinueCount: 1
  }
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `retCode` | number | 业务返回码，`0` 表示成功；非 `0` 时接口直接返回 `error` 并带服务端文案 |
| `retMsg` | string | 业务返回说明，成功时为空 |
| `Info` | object | 签到统计 |
| `Info.IsSignIn` | number | `1` 表示今天已签到 |
| `Info.ContinueSignInCount` | number | 连续签到天数 |
| `Info.MonthSignInCount` | number | 本月签到天数 |
| `Info.YearSignInCount` | number | 本年签到天数 |
| `Info.AccSignInCount` | number | 累计签到天数 |
| `Info.LastSignInDay` | number | 最近签到日期，Unix 时间戳（秒），当天 0 点 |
| `Info.MaxSignContinueDays` | number | 历史最长连续签到天数 |
| `Info` 其余字段 | number | 活动相关的统计值，含义尚未完整确认，原样返回 |
| `signInState` | number | 仅 `action` 为 `sign` 时出现，签到状态值，含义尚未确认 |

`sign` 成功后返回同样的统计字段；今天已签到时 `Info.IsSignIn` 仍为 `1`，不会重复发放金币。查询且今天尚未签到时 `Info.IsSignIn` 为 `0`，可再以 `action: "sign"` 调用完成签到。

## 失败处理

- `action` 不是 `query` 或 `sign` 时直接返回参数错误。
- `musickey` 为空时直接返回参数错误。
- 票据无效或已过期时，`error` 中包含「票据无效或已过期」，此时需调用 [qqmusic_login](/api/qqmusic_login) 重新获取票据。
- 签到活动不可用等业务失败时，`error` 为 `QQ音乐金币签到失败: <服务端文案>`，可稍后重试。
- Bot 不在线或不是 Android 账号时返回失败结果，`error` 中说明原因。

`musickey` 是账号凭据，请勿写入日志或转发给不可信方。
