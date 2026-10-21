# 系统事件

## Bot 上线 {#bot-online}

绑定节点下的 Bot 登录成功时推送 `bot_online`，密码登录、验证后登录、缓存登录和扫码登录都会触发。需要在认证时声明 `bot_online` 权限。

```json
{
  "self_id": 123456789,
  "protocol_id": 0,
  "post_type": "bot_online"
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 上线 Bot QQ 号 |
| `protocol_id` | number | 上线账号的协议 ID |
| `post_type` | string | 固定为 `bot_online` |

## Bot 离线 {#bot-offline}

当绑定节点下的 Bot 离线时，插件可接收 `bot_offline`。需要在认证时声明 `bot_offline` 权限。

```json
{
  "self_id": 123456789,
  "protocol_id": 0,
  "post_type": "bot_offline",
  "err_msg": "离线原因",
  "offline_reason": "kicked"
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 离线 Bot QQ 号 |
| `protocol_id` | number | 离线账号的协议 ID |
| `post_type` | string | 固定为 `bot_offline` |
| `err_msg` | string | 离线原因；可能为空字符串 |
| `offline_reason` | string | 离线原因分类，见下表 |

| `offline_reason` | 说明 |
| --- | --- |
| `active` | 主动离线 |
| `login_timeout` | 登录等待超时，已取消登录 |
| `kicked` | 账号在其他设备登录，当前连接被断开 |
| `authentication_failed` | 身份验证失败，需要重新登录 |
| `cache_invalid` | 登录缓存失效，需要重新登录 |
| `network_lost` | 网络断开 |
