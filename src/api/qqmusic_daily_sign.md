# qqmusic_daily_sign

使用已保存的 QQ 音乐登录票据，查询或执行当前在线 Bot 自己的会员每日签到。

每日签到可获得成长值，签到成功后当天不能重复领取；重复调用不会重复发放。只能操作 Bot 账号自己，票据来自 [qqmusic_login](/api/qqmusic_login) 或 [qqmusic_refresh_ticket](/api/qqmusic_refresh_ticket) 的返回值，本接口不会保存票据。目前仅支持 Android 账号。

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

成功时 `data` 示例（查询一个今天已签到过的账号，并用 `sign` 重复签到）：

```js
{
  action: 'sign',
  ret: 20019,
  msg: '今天已经领取过',
  total: 0,
  already_signed: true,
  success: false
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `action` | string | 本次调用的动作，`query` 或 `sign` |
| `ret` | number | 服务端返回码：`0` 表示成功；`20019` 表示今天已经签到过 |
| `msg` | string | 服务端返回的说明文案，有值时出现 |
| `total` | number | 本次签到获得的成长值；已签到或查询时为 `0` |
| `already_signed` | boolean | 今天是否已经签到（`ret` 为 `20019` 时为 `true`） |
| `success` | boolean | 仅在 `action` 为 `sign` 时出现，`ret` 为 `0` 时为 `true` |

查询且今天尚未签到时，`already_signed` 为 `false`，可再以 `action: "sign"` 调用完成签到。

## 失败处理

- `action` 不是 `query` 或 `sign` 时直接返回参数错误。
- `musickey` 为空时直接返回参数错误。
- 请求失败或服务返回错误时，`error` 中说明原因；重复签到不会报错，而是返回 `ret: 20019` 与 `already_signed: true`。
- Bot 不在线或不是 Android 账号时返回失败结果，`error` 中说明原因。

`musickey` 是账号凭据，请勿写入日志或转发给不可信方。
