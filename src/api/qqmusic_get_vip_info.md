# qqmusic_get_vip_info

使用已保存的 QQ 音乐登录票据，查询当前在线 Bot 自己的会员与付费音乐包状态，包含各类会员的开通情况和起止时间、绿钻成长等级，以及付费音乐包的档位与到期时间。

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

成功时 `data` 示例：

```js
{
  green: {
    is_vip: true,
    start_time: '2026-11-04 12:27:43',
    end_time: '2026-12-08 12:27:43'
  },
  luxury_green: {
    is_vip: true,
    start_time: '2026-11-04 12:27:43',
    end_time: '2026-12-08 12:27:43',
    auto_renew: true
  },
  super_vip: {
    is_vip: true,
    start_time: '2026-11-04 12:27:43',
    end_time: '2026-12-08 12:27:43',
    auto_renew: true
  },
  listen_vip: {
    is_vip: true,
    start_time: '2026-11-04 12:27:43',
    end_time: '2026-12-08 12:27:43',
    auto_renew: true
  },
  paid_music_package: {
    tier: 8,
    start_time: '2026-11-04 12:27:43',
    end_time: '2026-12-08 12:27:43'
  },
  level: {
    current: 1,
    next: 2,
    growth: 300,
    next_growth: 600,
    daily_growth: 20,
    upgrade_days: 15,
    upgrade_percent: 5000
  }
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `green` | object | 绿钻（普通会员）状态 |
| `luxury_green` | object | 豪华绿钻状态 |
| `super_vip` | object | 超级会员状态 |
| `listen_vip` | object | 听书会员状态 |
| `paid_music_package` | object | 付费音乐包状态；账号持有有效音乐包时出现，否则不出现 |
| `level` | object | 绿钻成长等级 |

`green`、`luxury_green`、`super_vip`、`listen_vip` 的字段相同：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `is_vip` | boolean | 是否为该会员 |
| `start_time` | string | 开通时间，格式 `YYYY-MM-DD HH:MM:SS`；未开通时不出现 |
| `end_time` | string | 到期时间，格式 `YYYY-MM-DD HH:MM:SS`；未开通时不出现 |
| `auto_renew` | boolean | 是否自动续费；绿钻没有该信息时不出现，其余会员均有该字段 |

超级会员通常同时包含豪华绿钻与绿钻权益，因此这几类会员可能同时为 `true` 且起止时间相同；请以各字段本身为准，不要用其中一个推断其余。

`paid_music_package` 的字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tier` | number | 音乐包档位：`8` 为付费音乐包，`12` 为豪华付费音乐包；同一时刻只有一档生效 |
| `start_time` | string | 开通时间，格式 `YYYY-MM-DD HH:MM:SS` |
| `end_time` | string | 到期时间，格式 `YYYY-MM-DD HH:MM:SS` |

`level` 的字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `current` | number | 当前绿钻等级 |
| `next` | number | 下一等级 |
| `growth` | number | 当前成长值 |
| `next_growth` | number | 升级到下一等级所需成长值 |
| `daily_growth` | number | 每日成长值；未开通绿钻时可能为负数 |
| `upgrade_days` | number | 距升级所需天数；未开通绿钻时可能为负数 |
| `upgrade_percent` | number | 升级进度，按万分比表示，`5000` 即 50% |

## 失败处理

- `musickey` 为空时直接返回参数错误。
- 票据无效或已过期时，`error` 为 `获取QQ音乐会员信息失败: 票据无效或已过期`，此时需调用 [qqmusic_login](/api/qqmusic_login) 重新获取票据。
- 请求失败、服务返回错误或未返回该账号的会员信息时，`error` 中说明原因，可稍后重试。
- Bot 不在线或不是 Android 账号时返回失败结果，`error` 中说明原因。

`musickey` 是账号凭据，请勿写入日志或转发给不可信方。
