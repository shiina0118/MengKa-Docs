# execute_level_tasks

按数组顺序执行指定的 QQ 等级加速任务。

## 调用

```js
await api.execute_level_tasks(self_id, platform, tasks)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `tasks` | string[] | 是 | 非空任务标题数组 |

当前支持的任务标题：

- `去日签卡打一次卡`
- `每日登录QQ经典农场`
- `去免费小说看任一本书`
- `体验任一款小游戏15s`
- `发布一条空间说说`
- `点赞一条好友动态`
- `加一位好友`
- `去QQ会员福利社领福利券`

建议从 `get_level_tasks` 返回的任务中选择标题。任务在本次调用内按数组顺序执行；任一任务报错时 Promise 会拒绝并包含任务标题。

## 返回值

全部执行成功时 Promise 解析为 `null`。
