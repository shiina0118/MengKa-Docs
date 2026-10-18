# get_level_tasks

刷新并获取当前 Bot 的 QQ 等级加速面板。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.get_level_tasks(self_id, platform)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_level_tasks' \
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
  self_id: 123456789,
  overall_info: {
    total_days: 12.5,
    vip_speed: 2,
    base_days: 10,
    extra_days: 2,
  },
  vip_info: { vip_list: [] },
  base_info: { base_task_list: [] },
  extra_info: { extra_task_list: [] },
  is_freeze: false,
}
```

`self_id` 为当前 Bot QQ 号，类型为 number。

任务对象包含 `title`、`sub_title`、`is_done`、`speed_days`、`jump_url` 等字段。执行任务时使用任务的完整 `title`，且须属于 [`execute_level_tasks`](/api/execute_level_tasks) 列出的支持范围；面板中可能出现尚未支持执行的任务。
