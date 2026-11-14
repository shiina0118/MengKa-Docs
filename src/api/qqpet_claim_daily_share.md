# qqpet_claim_daily_share

领取宠物每日分享奖励。仅支持 `android` 账号。

是否可以领取由服务端判断。建议先查询 [qqpet_get_daily_share_panel](./qqpet_get_daily_share_panel.md) 获取当前按钮状态。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_claim_daily_share",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {}
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | object | 否 | 本接口无请求参数，默认 `{}` |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response.panel` | object | 领取后的每日分享面板，服务端未下发时省略 |
| `response.award_panel` | object | 奖励面板，服务端未下发时省略 |

### panel

返回面板结构与 [qqpet_get_daily_share_panel](./qqpet_get_daily_share_panel.md#panel) 相同。

### award_panel

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `items` | object[] | 奖励项目列表 |

### items

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `icon_url` | string | 奖励图标地址 |
| `desc` | string | 奖励描述 |

## 使用说明

- 领取结果以服务端响应为准，不要根据本地按钮状态自行判定成功。
- 每次调用只发送一次领取请求；请求超时后，先重新查询面板确认状态，再决定是否继续。
