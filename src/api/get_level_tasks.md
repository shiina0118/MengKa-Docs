# get_level_tasks

刷新并获取当前 Bot 的 QQ 等级加速面板。

当前按账号绑定协议的 `platform` 分支：Android 执行，PC 暂时跳过，不发送对应业务请求。PC 返回的数据为 `{ self_id, protocol_id, skipped: true, reason: "PC 平台暂时跳过此功能" }`，调用方应先检查 `skipped`。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "get_level_tasks",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

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
