# qqpet_report_daily_share

上报宠物每日分享结果。仅支持 `android` 账号。

只有在目标消息已经由调用方确认发送成功后，才应调用本接口。`share_token` 必须来自 [qqpet_get_daily_share_ark](./qqpet_get_daily_share_ark.md) 的同一次响应。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_report_daily_share",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "share_token": "SHARE_TOKEN",
      "target_uin": "987654321"
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
| `share_token` | string | 是 | `qqpet_get_daily_share_ark` 返回的 `response.share_token`，必须原样传递 |
| `target_uin` | string | 是 | 实际接收分享的好友或群 QQ 号，使用字符串传递 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response.panel` | object | 上报后的每日分享面板，服务端未下发时省略 |

### panel

返回面板结构与 [qqpet_get_daily_share_panel](./qqpet_get_daily_share_panel.md#panel) 相同。

## 使用说明

- 不要自行构造 `share_token`。
- 请求超时不能确定上报是否成功；如需重试，应先重新查询每日分享面板确认当前状态。
- 本接口只负责上报，不负责发送分享消息。
