# 正向 WebSocket

正向模式下，Meng Ka 监听一个 WebSocket 端口，插件作为客户端连接该端口。

## 后台配置

在插件服务中选择“正向 WS”，填写服务名称、访问模式、监听端口、服务令牌和绑定节点。新建服务默认选择“本地模式”，监听 `127.0.0.1:PORT`，仅允许本机连接；选择“外部访问”则监听 `0.0.0.0:PORT`，其他设备使用 Meng Ka 所在主机的 IP 或域名连接。停止服务后可编辑并切换访问模式，启停服务不会改变该设置。插件连接地址为：

```text
ws://HOST:PORT/
```

同一端口只能由一个插件服务使用。

## SDK 配置

```js
const api = createAPI({
  host: '127.0.0.1',
  port: 3001,
  token: 'TOKEN',
  name: 'plugin-name',
  version: '1.0.0',
  author: 'developer',
})
```

| 字段 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `host` | 否 | `127.0.0.1` | Meng Ka 所在主机 |
| `port` | 否 | `3001` | 管理后台配置的监听端口 |
| `token` | 是 | - | 服务令牌 |
| `name` | 是 | - | 插件名称，显示在连接列表中 |
| `version` | 是 | - | 插件版本 |
| `author` | 是 | - | 插件作者 |

## 连接生命周期

```js
api.on('friend_message', handleFriendMessage)

await api.connect()

// 退出时
api.disconnect()
```

正向 SDK 不主动重连。需要持续运行的插件应在连接断开后按自身策略重新调用 `connect()`。

## 事件权限

SDK 在认证时根据已注册的监听器声明权限：

| 监听器 | 权限字段 |
| --- | --- |
| `group_message` | `group_message` |
| `friend_message` | `friend_message` |
| `group_notice` | `group_event` |
| `friend_notice` | `friend_event` |
| `bot_offline` | `bot_offline` |

在 `connect()` 之后新增监听器不会更新本次连接的权限声明。需要新增事件类型时，断开并重新连接。

## 认证消息

使用其他语言实现客户端时，连接建立后 10 秒内发送：

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
    "bot_offline": true
  }
}
```

认证成功：

```json
{ "type": "auth_ok" }
```

认证失败：

```json
{ "type": "auth_failed", "message": "令牌错误" }
```

后续消息格式见 [WebSocket API 格式](/guide/protocol)。
