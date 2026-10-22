# qmate_get_info

查询聊天精灵状态、孵化进度、外观与道具摘要。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qmate_get_info",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qmate_get_info' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "user_id": 234567890
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号协议 ID，与 self_id 共同定位实例；允许为 0 |
| `user_id` | number | 是 | 另一位合养用户的 QQ 号，必须大于 0，不接受 UID |
| `appearance_last_fetch_time` | number | 否 | 外观上次获取时间，非负 int64，默认 0 |
| `item_last_fetch_time` | number | 否 | 道具上次获取时间，非负 int64，默认 0 |

## 返回值

以下为响应 `data` 字段。`ok: true` 表示已取得并解析服务端响应，还需检查 `data.success`。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 请求成功时为 true；有额外业务结果的接口还需检查相应字段 |
| `error_code` | number | OIDB 返回码，成功时为 0 |
| `error_message` | string | 失败说明，空字符串时省略 |
| `info` | object | 可选，精灵信息 |
| `benefit_entry_summary` | object | 可选，权益入口摘要 |
| `actions` | string[] | 服务端动作列表 |
| `appearance_summary` | object | 可选，外观摘要 |
| `item_summary` | object | 可选，道具摘要 |

服务端拒绝请求时，外层为 `ok: true`，`data.success` 为 `false`。参数无效、Bot 未在线、网络或 SSO 请求失败、响应损坏时，返回 `ok: false`。


## info

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `qmate_type` | number | 精灵类型 |
| `status` | number | 精灵状态原值 |
| `level` | number | 精灵等级 |
| `active_days` | number | 活跃天数 |
| `health_status` | number | 健康状态原值 |
| `name` | string | 精灵名称 |
| `incubation` | object | 可选，孵化信息 |
| `health_status_v2` | number | 新版健康状态原值 |
| `active_days_info` | object | 可选，活跃天数详情 |

## incubation

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `current_days` | number | 当前孵化天数 |
| `required_days` | number | 所需孵化天数 |
| `stage` | number | 孵化阶段原值 |
| `avatar` | object | 可选，外观信息 |
| `rarity` | number | 稀有度原值 |
| `current_days_v2` | number | 新版当前孵化天数，浮点数 |
| `remaining_days_v2` | number | 新版剩余孵化天数，浮点数 |
| `combo_capped` | boolean | 孵化连击是否达到限制 |

## active_days_info

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `active_days` | number | 活跃天数 |
| `clear_after_days` | number | 距离清除的天数 |
| `previous_active_days` | number | 此前活跃天数 |

## 外观信息 avatar

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `skeleton_id` | string | 骨架 ID |
| `sub_type` | string | 外观子类型 |
| `items` | object[] | 外观部件，见下表 |

## 外观部件 items 条目

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `part_type` | number | 部件类型原值 |
| `item_id` | string | 部件 ID |
| `aigc_id` | string | AIGC ID |
| `occupancy` | number[] | 占用部位枚举原值 |

## benefit_entry_summary

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `grant_revision` | number | 权益发放修订值 |
| `sync_status` | number | 同步状态原值 |
| `next_benefit_level` | number | 下一权益等级 |

## appearance_summary / item_summary

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `recent_items` | object[] | 近期物品，结构见[背包物品](/api/qmate_get_inventory#物品结构) |
| `default_text` | string | 默认提示文字 |
| `new_arrival` | object | 可选，新到达提示 |
| `new_acquired` | object | 可选，新获得提示 |

## new_arrival / new_acquired

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `visible` | boolean | 是否展示提示 |
| `count` | number | 提示数量 |
| `latest_event_at` | number | 最新事件时间原值 |

首次查询可省略两个获取时间参数。接口会请求外观和道具摘要；不存在的可选对象会省略。孵化操作见 [`qmate_hatch`](/api/qmate_hatch)，互动上报见 [`qmate_report_incubation_combo`](/api/qmate_report_incubation_combo)。

对应 SSO：`OidbSvcTrpcTcp.0x99d2_0`。
