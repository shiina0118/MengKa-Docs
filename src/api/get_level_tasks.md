# get_level_tasks

刷新并获取当前 Bot 的 QQ 等级加速面板。

## 调用

```js
const result = await api.get_level_tasks(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |

## 返回值

```js
{
  uin: '123456789',
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

任务对象包含 `title`、`sub_title`、`is_done`、`speed_days`、`jump_url` 等字段。执行任务时使用任务的完整 `title`。
