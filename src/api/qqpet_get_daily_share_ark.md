# qqpet_get_daily_share_ark

获取宠物每日分享所需的数据。仅支持 `android` 账号。

本接口只返回分享数据，不执行消息发送。`share_key` 必须来自 [qqpet_get_daily_share_panel](./qqpet_get_daily_share_panel.md) 的同一次有效响应。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_daily_share_ark",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "share_key": "SHARE_KEY"
    }
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | [Request](#request) | 是 | 本次操作的参数 |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `share_key` | string | 是 | `qqpet_get_daily_share_panel` 返回的 `response.panel.share_key`，必须原样传递 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `ark_data` | string | Base64 编码的分享数据；按原值保存和传递，不要自行修改 |
| `share_token` | string | 后续调用 `qqpet_report_daily_share` 所需的关联值，必须原样传递 |

## 使用说明

- `ark_data` 为空时，不要继续执行后续分享流程。
- `share_token` 与 `share_key` 不是同一个值，不要混用。
- 本接口不会自动发送消息，也不会自动上报分享结果。
