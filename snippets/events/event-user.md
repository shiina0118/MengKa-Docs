## 事件参与人（EventUser） {#event-user}

通知事件中的 `operator`、`target` 使用此结构。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_id` | number | 用户 QQ 号，无法解析时可能为 `0` |
| `nickname` | string | 用户昵称或群名片；无可用昵称时可能使用 UID、QQ 号等代替 |
