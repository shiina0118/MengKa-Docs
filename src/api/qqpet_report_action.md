# qqpet_report_action

上报宠物行为。仅支持 `android` 账号。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_report_action",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "action_id": "ACTION_ID",
      "action_scene": "ACTION_SCENE",
      "bubble_source": "SOURCE",
      "timestamp_ms": "1792500000000",
      "bubble_id": "BUBBLE_ID"
    }
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | [Request](#request) | 否 | 本次操作的参数，默认 `{}` |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `action_id` | string | 否 | 行为 ID |
| `action_scene` | string | 否 | 行为场景 |
| `bubble_source` | string | 否 | 气泡来源 |
| `timestamp_ms` | string | 否 | 时间，Unix 毫秒 |
| `bubble_id` | string | 否 | 气泡 ID |

较长的 ID 或序号请使用字符串，避免 JavaScript 数字精度丢失。

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展结果，说明待补充 |
