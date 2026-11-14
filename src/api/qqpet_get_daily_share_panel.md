# qqpet_get_daily_share_panel

查询宠物每日分享面板。仅支持 `android` 账号。

本接口返回当前每日分享状态及后续操作所需的 `share_key`。`share_key` 必须使用本次响应中的值，不要自行构造或长期缓存。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_daily_share_panel",
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
| `response.panel` | object | 每日分享面板 |

### panel

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `share_key` | string | 后续调用 `qqpet_get_daily_share_ark` 所需的上下文值，须原样传递 |
| `card` | object | 分享卡片展示信息，服务端未下发时省略 |
| `reward` | object | 奖励展示信息，服务端未下发时省略 |
| `button` | object | 当前操作按钮状态 |

### card

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `image_url` | string | 卡片图片地址 |

### reward

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `icon_url` | string | 奖励图标地址 |
| `count` | string | 奖励数量展示值 |
| `text` | string | 奖励说明 |
| `share_text` | string | 分享相关展示文案 |

### button

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `status` | number | 服务端按钮状态值 |
| `text` | string | 服务端按钮文案 |

## 使用流程

1. 调用本接口获取 `response.panel.share_key`。
2. 使用该值调用 [qqpet_get_daily_share_ark](./qqpet_get_daily_share_ark.md)。
3. 后续是否可以上报或领取，以服务端返回的按钮状态和接口结果为准。
