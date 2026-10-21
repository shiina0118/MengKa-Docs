# 反向 WebSocket

反向模式下，插件作为 WebSocket 服务端监听地址，Meng Ka 作为客户端主动连接。

## 后台配置

在插件服务中选择“反向 WS”，填写：

| 字段 | 示例 | 说明 |
| --- | --- | --- |
| WebSocket 地址 | `ws://127.0.0.1:3002/` | 插件的监听地址，必须使用 `ws://` 或 `wss://` |
| 服务令牌 | `TOKEN` | 插件用来校验连接的共享令牌 |
| 节点 | 当前节点 | 限定事件与 API 范围 |
| 重连间隔 | `5` | 取值 1 到 300 秒 |

连接失败或断开后，Meng Ka 会按重连间隔再次连接。

## 连接认证

Meng Ka 发起握手时会携带以下请求头：

| 请求头 | 内容 |
| --- | --- |
| `Authorization` | `Bearer TOKEN` |
| `X-Meng-Ka-Token` | 服务令牌 |
| `X-Meng-Ka-Service` | 服务名称 |
| `X-Meng-Ka-Node-ID` | 绑定节点 ID |

插件优先校验 `Authorization`，未提供时才读取 `X-Meng-Ka-Token`；已提供的令牌错误或为空时直接拒绝。

插件校验令牌后完成 WebSocket 握手；校验失败时应拒绝握手（例如返回 HTTP `401`），Meng Ka 会在重连间隔后重试。

## 就绪帧

握手完成后，Meng Ka 首先发送：

```json
{
  "type": "ready",
  "service": "service-name",
  "node_id": 1,
  "mode": "reverse"
}
```

收到 `ready` 后即可发送 API 请求。反向连接不需要发送认证消息，默认接收全部六类事件。API 和事件帧格式与正向模式一致，见 [WebSocket API 格式](/guide/protocol)。

Meng Ka 会定期发送 WebSocket Ping 控制帧，插件所用的 WebSocket 库需要正确回复 Pong，否则连接会被判定失效并断开。
