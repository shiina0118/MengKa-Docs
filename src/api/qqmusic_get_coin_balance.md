# qqmusic_get_coin_balance

使用已保存的 QQ 音乐登录票据，查询当前在线 Bot 自己的金币数量。

只能查询 Bot 账号自己。票据来自 [qqmusic_login](/api/qqmusic_login) 或 [qqmusic_refresh_ticket](/api/qqmusic_refresh_ticket) 的返回值，本接口不会保存票据。目前仅支持 Android 账号。

## 调用

示例中的票据需替换为实际保存的值。

```json
{
  "type": "action",
  "id": "1",
  "action": "qqmusic_get_coin_balance",
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

`data` 为金币服务返回的 JSON，原样透传，示例：

```js
{
  balance: 88,
  coinDeductionQuota: 400000
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `balance` | number | 当前金币数量 |
| `coinDeductionQuota` | number | 金币抵扣额度；含义尚未完全确认，原样返回 |

## 失败处理

- `musickey` 为空时直接返回参数错误。
- 票据无效或已过期时，`error` 为 `获取QQ音乐金币数量失败: 票据无效或已过期`，此时需调用 [qqmusic_login](/api/qqmusic_login) 重新获取票据。
- 请求失败或服务返回错误时，`error` 中说明原因，可稍后重试。
- Bot 不在线或不是 Android 账号时返回失败结果，`error` 中说明原因。

`musickey` 是账号凭据，请勿写入日志或转发给不可信方。
