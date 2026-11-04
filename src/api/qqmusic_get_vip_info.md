# qqmusic_get_vip_info

使用已保存的 QQ 音乐登录票据，查询当前在线 Bot 自己的会员与付费音乐包状态。

只能查询 Bot 账号自己，不支持指定其他 QQ 号。票据来自 [qqmusic_login](/api/qqmusic_login) 或 [qqmusic_refresh_ticket](/api/qqmusic_refresh_ticket) 的返回值，本接口不会保存票据。目前仅支持 Android 账号。

## 调用

示例中的票据需替换为实际保存的值。

```json
{
  "type": "action",
  "id": "1",
  "action": "qqmusic_get_vip_info",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "musickey": "MUSICKEY"
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `self_id` | number | 是 | - | 在线 Bot QQ 号，须与票据所属账号一致 |
| `protocol_id` | number | 是 | - | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `musickey` | string | 是 | - | 最近一次登录或刷新返回的 `musickey` |

## 返回值

`data` 为会员服务返回的 JSON，原样透传（整包），示例（仅列出常用字段，实际返回字段更多）：

```js
{
  curtime: 1793770530,
  infoMap: {
    '123456789': {
      uUin: 123456789,
      iVipFlag: 1,
      sStartDateTime: '2026-11-04 12:27:43',
      sOverDateTime: '2026-12-08 12:27:43',
      iSuperVip: 1,
      superStartTime: '2026-11-04 12:27:43',
      superEndTime: '2026-12-08 12:27:43',
      superAutoPay: 1,
      HugeVip: 1,
      HugeVipStart: '2026-11-04 12:27:43',
      HugeVipEnd: '2026-12-08 12:27:43',
      HugeAutoPay: 1,
      LMFlag: 1,
      LMStart: '2026-11-04 12:27:43',
      LMEnd: '2026-12-08 12:27:43',
      LMAutoPay: 1,
      ieight: 1,
      eightStartTime: '2026-11-04 12:27:43',
      eightEndTime: '2026-12-08 12:27:43',
      itwelve: 0,
      twelveStartTime: '',
      twelveEndTime: '',
      iCurLevel: 1,
      iNextLevel: 2,
      iNextValue: 600,
      LvScore: 315,
      iDayValue: 20,
      iUpGradeDay: 15,
      iUpGradePec: 4750
    }
  }
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `curtime` | number | 服务端当前时间戳（秒） |
| `infoMap` | object | 会员信息，键为 QQ 号字符串；本接口只会返回 Bot 自己的那条 |
| `infoMap.*.uUin` | number | 账号 QQ 号 |
| `infoMap.*` 其余字段 | - | 会员、音乐包、成长等级等明细，见下表 |

`infoMap` 中每条记录包含以下明细（未列出的字段如 `Ffb*`、`AdVipFlag`、`ExpVip` 等也原样返回，含义尚未完全确认）：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `iVipFlag` | number | 绿钻（普通会员）是否有效：`1` 有效，`0` 未开通 |
| `sStartDateTime` | string | 绿钻开通时间 |
| `sOverDateTime` | string | 绿钻到期时间 |
| `iSuperVip` | number | 豪华绿钻是否有效 |
| `superStartTime` | string | 豪华绿钻开通时间 |
| `superEndTime` | string | 豪华绿钻到期时间 |
| `superAutoPay` | number | 豪华绿钻是否自动续费 |
| `HugeVip` | number | 超级会员是否有效 |
| `HugeVipStart` | string | 超级会员开通时间 |
| `HugeVipEnd` | string | 超级会员到期时间 |
| `HugeAutoPay` | number | 超级会员是否自动续费 |
| `LMFlag` | number | 听书会员是否有效 |
| `LMStart` | string | 听书会员开通时间 |
| `LMEnd` | string | 听书会员到期时间 |
| `LMAutoPay` | number | 听书会员是否自动续费 |
| `ieight` | number | 8 元档付费音乐包是否有效 |
| `eightStartTime` | string | 8 元档付费音乐包开通时间 |
| `eightEndTime` | string | 8 元档付费音乐包到期时间 |
| `itwelve` | number | 12 元档付费音乐包是否有效；与 8 元档同一时刻只有一档生效 |
| `twelveStartTime` | string | 12 元档付费音乐包开通时间 |
| `twelveEndTime` | string | 12 元档付费音乐包到期时间 |
| `iCurLevel` | number | 当前绿钻等级 |
| `iNextLevel` | number | 下一等级 |
| `iNextValue` | number | 升级到下一等级所需成长值 |
| `LvScore` | number | 当前成长值 |
| `iDayValue` | number | 每日成长值；未开通绿钻时可能为负数 |
| `iUpGradeDay` | number | 距升级所需天数 |
| `iUpGradePec` | number | 升级进度，按万分比表示，`4750` 即 47.5% |

时间字段为 `YYYY-MM-DD HH:MM:SS` 字符串，未开通时为空字符串。超级会员通常同时包含豪华绿钻与绿钻权益，因此多个 `*Flag` 可能同时为 `1` 且时间相同；请以各字段本身为准。

## 失败处理

- `musickey` 为空时直接返回参数错误。
- 票据无效或已过期时，`error` 为 `获取QQ音乐会员信息失败: 票据无效或已过期`，此时需调用 [qqmusic_login](/api/qqmusic_login) 重新获取票据。
- 请求失败或服务返回错误时，`error` 中说明原因，可稍后重试。
- Bot 不在线或不是 Android 账号时返回失败结果，`error` 中说明原因。

`musickey` 是账号凭据，请勿写入日志或转发给不可信方。
