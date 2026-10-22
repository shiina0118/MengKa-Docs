# qmate_report_task_action

上报聊天精灵任务动作，例如原库任务按钮触发的提醒动作。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qmate_report_task_action",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890,
    "task_id": 123,
    "action_id": "ACTION_ID"
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qmate_report_task_action' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "user_id": 234567890,
  "task_id": 123,
  "action_id": "ACTION_ID"
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
| `task_id` | number | 是 | 任务 ID，使用 qmate_get_tasks 返回的 task_id；正 uint32 整数 |
| `action_id` | string | 是 | 非空动作 ID，使用任务返回的 action_id |

## 返回值

以下为响应 `data` 字段。`ok: true` 表示已取得并解析服务端响应，还需检查 `data.success`。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 请求成功时为 true；有额外业务结果的接口还需检查相应字段 |
| `error_code` | number | OIDB 返回码，成功时为 0 |
| `error_message` | string | 失败说明，空字符串时省略 |

服务端拒绝请求时，外层为 `ok: true`，`data.success` 为 `false`。参数无效、Bot 未在线、网络或 SSO 请求失败、响应损坏时，返回 `ok: false`。


先调用 [`qmate_get_tasks`](/api/qmate_get_tasks) 获取任务及其按钮动作信息。示例中的任务和动作 ID 仅为占位值，不能当作固定任务使用。上报成功后重新查询任务状态；领取奖励使用 [`qmate_claim_task_reward`](/api/qmate_claim_task_reward)。

对应 SSO：`OidbSvcTrpcTcp.0x9adf_0`。
