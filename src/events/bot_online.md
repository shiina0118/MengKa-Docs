# Bot 上线

绑定节点下的 Bot 登录成功时推送 `bot_online`，密码登录、验证后登录、缓存登录和扫码登录都会触发。需要在认证时声明 `bot_online` 权限。

所有事件都包含 `self_id`、`protocol_id` 和 `post_type`，详见[事件概述](/events/#公共字段)。

## 事件内容

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 上线 Bot QQ 号 |
| `protocol_id` | number | 上线账号的协议 ID，允许为 `0` |
| `post_type` | string | 固定为 `bot_online` |
