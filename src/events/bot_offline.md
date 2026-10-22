# Bot 离线

当绑定节点下的 Bot 离线时，插件可接收 `bot_offline`。需要在认证时声明 `bot_offline` 权限。

所有事件都包含 `self_id`、`protocol_id` 和 `post_type`，详见[事件概述](/events/#公共字段)。

## 事件内容

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 离线 Bot QQ 号 |
| `protocol_id` | number | 离线账号的协议 ID，允许为 `0` |
| `post_type` | string | 固定为 `bot_offline` |
| `err_msg` | string | 离线原因；可能为空字符串 |
| `offline_reason` | string | 离线原因分类，见下表 |

### offline_reason

| `offline_reason` | 说明 |
| --- | --- |
| `active` | 主动离线 |
| `login_timeout` | 登录等待超时，已取消登录 |
| `kicked` | 账号在其他设备登录，当前连接被断开 |
| `authentication_failed` | 身份验证失败，需要重新登录 |
| `cache_invalid` | 登录缓存失效，需要重新登录 |
| `network_lost` | 网络断开 |
