# qmate_get_tasks

查询聊天精灵任务列表及完成进度。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qmate_get_tasks",
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
curl --request POST 'http://127.0.0.1:3003/api/qmate_get_tasks' \
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

## 返回值

以下为响应 `data` 字段。`ok: true` 表示已取得并解析服务端响应，还需检查 `data.success`。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 请求成功时为 true；有额外业务结果的接口还需检查相应字段 |
| `error_code` | number | OIDB 返回码，成功时为 0 |
| `error_message` | string | 失败说明，空字符串时省略 |
| `today_group` | object | 可选，今日任务组 |
| `surprise_group` | object | 可选，惊喜任务组 |
| `incubation_group` | object | 可选，孵化任务组 |
| `trigger_group` | object | 可选，触发任务组 |
| `qmate_stage` | number | 精灵阶段原值 |
| `today_total` | number | 今日任务总数 |
| `today_completed` | number | 今日已完成任务数 |
| `surprise_unlocked` | number | 已解锁惊喜任务数 |
| `has_new_task` | boolean | 是否有新任务 |
| `show_mark_entry` | boolean | 是否显示标记入口 |

服务端拒绝请求时，外层为 `ok: true`，`data.success` 为 `false`。参数无效、Bot 未在线、网络或 SSO 请求失败、响应损坏时，返回 `ok: false`。


## 任务组

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `title` | string | 分组标题 |
| `tasks` | object[] | 任务列表 |
| `key` | number | 分组标识原值 |
| `description` | string | 分组描述 |

## 任务 tasks 条目

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `task_id` | number | 任务 ID；用于上报动作或领取奖励 |
| `name` | string | 任务名称 |
| `description` | string | 任务描述 |
| `exp_reward` | number | 经验奖励 |
| `action` | object | 可选，任务动作 |
| `status` | number | 任务状态原值 |
| `completed_at` | number | 完成时间原值 |
| `unclaimed_exp` | number | 未领取经验 |
| `cycle` | number | 任务周期原值 |
| `completion` | number | 完成情况原值 |
| `task_type` | number | 任务类型原值 |
| `icon_url` | string | 图标地址 |
| `home_bubble_text` | string | 首页气泡文字 |
| `home_action_name` | string | 首页动作名称 |
| `v2_icon_exp_number` | number | 新版图标经验数值 |

## 任务动作 action

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `text` | string | 动作文字 |
| `scheme` | string | 动作跳转地址 |
| `disabled` | boolean | 动作是否禁用 |
| `type` | number | 动作类型原值 |
| `action_id` | string | 动作 ID；上报时原样传入 |
| `is_low_version` | boolean | 是否处于低版本状态 |

需要上报动作时，使用同一任务的 `task_id` 和 `action.action_id` 调用 [`qmate_report_task_action`](/api/qmate_report_task_action)。任务可领取后通过 [`qmate_claim_task_reward`](/api/qmate_claim_task_reward) 领取奖励，再重新查询状态。

对应 SSO：`OidbSvcTrpcTcp.0x99f9_0`。
