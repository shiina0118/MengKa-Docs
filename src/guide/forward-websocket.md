# 正向 WebSocket

正向模式下，Meng Ka 监听一个 WebSocket 端口，插件作为客户端连接该端口。

## 后台配置

在插件服务中选择“正向 WS”，填写服务名称、访问权限、监听端口、服务令牌和绑定节点。新建服务默认选择“本地”，监听 `127.0.0.1:PORT`，仅允许本机连接；选择“全部”则监听 `0.0.0.0:PORT`，其他设备使用 Meng Ka 所在主机的 IP 或域名连接。停止服务后可编辑并切换访问权限，启停服务不会改变该设置。插件连接地址为：

```text
ws://HOST:PORT/
```

同一端口只能由一个插件服务使用。

## 认证消息

连接建立后 10 秒内发送：

```json
{
  "type": "auth",
  "token": "TOKEN",
  "name": "plugin-name",
  "version": "1.0.0",
  "author": "developer",
  "permissions": {
    "group_message": true,
    "friend_message": true,
    "group_event": true,
    "friend_event": true,
    "bot_offline": true,
    "bot_online": true
  }
}
```

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `type` | string | 是 | 固定为 `auth` |
| `token` | string | 是 | 服务令牌 |
| `name` | string | 是 | 插件名称，显示在连接列表中 |
| `version` | string | 是 | 插件版本 |
| `author` | string | 是 | 插件作者 |
| `permissions` | [Permissions](#permissions) | 否 | 需要接收的事件；省略的事件不会推送 |

认证成功：

```json
{ "type": "auth_ok" }
```

认证失败后连接会被关闭：

```json
{ "type": "auth_failed", "message": "令牌错误" }
```

超时未发送认证消息、消息格式不正确或缺少插件信息时同样会认证失败。

## 事件权限（Permissions） {#permissions}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `group_message` | boolean | 为 `true` 时推送 `group_message` 事件 |
| `friend_message` | boolean | 为 `true` 时推送 `friend_message` 事件 |
| `group_event` | boolean | 为 `true` 时推送 `group_notice` 事件 |
| `friend_event` | boolean | 为 `true` 时推送 `friend_notice` 事件 |
| `bot_offline` | boolean | 为 `true` 时推送 `bot_offline` 事件 |
| `bot_online` | boolean | 为 `true` 时推送 `bot_online` 事件 |

权限在认证时确定，连接期间不能修改。需要新增事件类型时，断开并重新连接。

## 连接生命周期

Meng Ka 不会主动重连正向连接。需要持续运行的插件应在连接断开后按自身策略重新连接并认证。

后续消息格式见 [WebSocket API 格式](/guide/protocol)。
