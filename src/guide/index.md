# 快速开始

Meng Ka 支持通过 WebSocket 或正向 HTTP 调用插件 API。WebSocket 还可以接收事件。插件可以使用任意语言实现，只需按本文档收发 JSON 消息。

## 选择连接模式

| 模式 | 连接发起方 | 适用场景 |
| --- | --- | --- |
| [正向 WebSocket](/guide/forward-websocket) | 插件连接 Meng Ka | 插件与 Meng Ka 在同一设备或插件能访问 Meng Ka 端口 |
| [反向 WebSocket](/guide/reverse-websocket) | Meng Ka 连接插件 | 插件有稳定地址，或希望由 Meng Ka 负责断线重连 |
| [正向 HTTP](/guide/forward-http) | 插件向 Meng Ka 发起 HTTP 请求 | 只需调用 API，通过请求头携带令牌 |

三种模式使用相同的 API 参数和业务结果；WebSocket 支持事件推送，HTTP 使用独立端口的 `POST /api/{action}` 路由。

## 配置插件服务

在 Meng Ka 管理后台创建插件服务。三种模式都需要填写：

| 字段 | 说明 |
| --- | --- |
| 名称 | 插件服务的唯一名称 |
| 模式 | 正向 WS、反向 WS 或正向 HTTP |
| 节点 | 插件可访问的 Bot 所属节点 |
| 服务令牌 | 插件与 Meng Ka 之间使用的共享令牌 |
| 启用状态 | 启用后启动监听或连接任务 |

正向 WS 和正向 HTTP 需要各自独立的监听端口；反向 WS 需要 WebSocket 地址和重连间隔。

::: tip 节点范围
插件只能接收绑定节点的事件，也只能操作该节点下的 Bot。`self_id` 指向其他节点时，API 会失败。带 `self_id` 的 API 必须同时传入非负整数 `protocol_id`（允许为 `0`）。
:::

## 正向 WebSocket 流程

1. 连接 `ws://HOST:PORT/`。
2. 10 秒内发送认证消息，在 `permissions` 中声明需要接收的事件：

```json
{
  "type": "auth",
  "token": "与管理后台一致的服务令牌",
  "name": "hello-plugin",
  "version": "1.0.0",
  "author": "developer",
  "permissions": {
    "group_message": true,
    "friend_message": false,
    "group_event": false,
    "friend_event": false,
    "bot_offline": true,
    "bot_online": true
  }
}
```

3. 收到 `{ "type": "auth_ok" }` 后即可发送 API 请求：

```json
{
  "type": "action",
  "id": "1",
  "action": "get_group_list",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```

完整说明见[正向 WebSocket](/guide/forward-websocket)。

## 反向 WebSocket 流程

1. 插件启动一个 WebSocket 服务端，例如监听 `ws://0.0.0.0:3002/`。
2. 在管理后台填写插件的 WebSocket 地址，例如 `ws://127.0.0.1:3002/`。
3. Meng Ka 连接时在请求头中携带服务令牌，插件校验通过后接受连接。
4. 收到 Meng Ka 发送的 `ready` 帧后即可发送 API 请求。

完整说明见[反向 WebSocket](/guide/reverse-websocket)。

## 结果与错误

每个带 `id` 的请求都会收到一条同 `id` 的 `action_result`。`ok` 为 `true` 时读取 `data`；为 `false` 时读取 `error`：

```json
{
  "type": "action_result",
  "id": "1",
  "ok": false,
  "error": "bot 未在线"
}
```

插件应自行设置等待超时，默认建议 30 秒，媒体、红包、头像和批量任务等耗时 API 适当延长。连接断开时，所有尚未收到结果的请求都应视为失败。消息格式详见 [WebSocket API 格式](/guide/protocol)。
