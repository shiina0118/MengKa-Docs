## 事件参与人（EventUser） {#event-user}

通知事件中的 `operator`、`target` 使用此结构。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_id` | number | 用户 QQ 号，无法解析时可能为 `0` |
| `nickname` | string | 用户真实网名；未知时为 `""`，不使用备注、群名片、QQ 号或 UID 替代 |
| `remark` | string | 好友事件中，当前 Bot 为该用户设置的好友备注；为空时省略 |
| `card` | string | 群事件中，该用户在当前 Bot 所在群内的群名片；为空时省略 |

好友事件展示使用 `remark → nickname`，群事件使用 `card → nickname`。名称都不可用时，客户端可显示 QQ 号或事件提供的 UID。备注和名片分别按接收账号、接收账号与群区分。
