# get_group_system_notifications

获取 Bot 的群聊系统通知列表。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.get_group_system_notifications(self_id, platform)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_group_system_notifications' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android"
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |

## 返回值

```js
{
  notifications: [{
    request_id: 1001,
    type: 1,
    status: 0,
    group_id: 987654321,
    group_name: '示例群',
    subject_name: '申请者',
    comment: '希望加入群聊',
    request_key: {
      request_id: 2001,
      group_id: 987654321,
      type: 1,
      extra: 0,
    },
  }],
  total_count: 1,
}
```

以上为常用字段示例。`notifications` 为空数组时表示没有通知。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `request_id` | number | 通知标识 |
| `type`, `status` | number | 通知类型与处理状态，不应作为审批参数直接使用 |
| `group_id`, `group_name` | number / string | 通知所属群号和群名 |
| `subject_name` | string | 通知涉及的用户名称 |
| `actor_name`, `handler_name` | string | 操作者、处理人名称，可能省略 |
| `comment` | string | 申请附言，可能省略 |
| `handled_at` | number | 处理时间，可能省略 |
| `request_key` | object | 用于后续处理的请求标识，字段映射见下表 |
| `presentation` | object | 展示信息，结构见下表 |

| 展示字段 | 类型 | 说明 |
| --- | --- | --- |
| `presentation.master`, `presentation.inviter`, `presentation.handler`, `presentation.outed_member` | object | 对应人员，使用 `user_id` 和 `name` 表示 QQ 号与名称 |
| `presentation.group` | object | 对应群聊，使用 `group_id` 和 `name` 表示群号与群名 |
| `presentation.nav_title` | string | 通知展示标题 |

没有对应信息时，标识为 `0`、名称或标题为空字符串。

## 处理入群申请

列表包含多种通知。选择需要处理的入群申请后，从该条通知的 `request_key` 提取参数：

| API 参数 | 通知字段 |
| --- | --- |
| `group_id` | `request_key.group_id` |
| `request_id` | `request_key.request_id` |
| `request_type` | `request_key.type` |
| `request_extra` | `request_key.extra`，可能省略 |

```js
// notice 是已选中的入群申请通知
const key = notice.request_key
if (!key?.group_id || !key.request_id || !key.type) {
  throw new Error('该通知缺少可用的审批标识')
}
await api.approve_group_apply(
  self_id, platform, key.group_id, key.request_id, key.type, key.extra,
)
```

不要把通知顶层的 `request_id`、`type` 当作审批标识。实时 `group_notice/apply` 事件已经提供 `request_id`、`request_type`、`request_extra`，其取值方式与本列表不同。
