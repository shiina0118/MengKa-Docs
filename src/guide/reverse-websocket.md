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

## 滑块页面地址配置

通过反向 WS 调用 [`register_captcha`](/api/register_captcha) 时，需要在运行 **萌卡服务端** 的环境中设置 `MENGKA_PUBLIC_URL`，然后重启服务。例如：

```bash
MENGKA_PUBLIC_URL=https://bot.example.com ./mengka
```

Windows PowerShell：

```powershell
$env:MENGKA_PUBLIC_URL = 'https://bot.example.com'
.\mengka.exe
```

使用 systemd 时，在萌卡服务的配置中加入：

```ini
[Service]
Environment="MENGKA_PUBLIC_URL=https://bot.example.com"
```

修改后执行 `systemctl daemon-reload`，再重启对应服务。

地址须使用 `http://` 或 `https://`，可以包含端口，不带路径、查询参数或账号密码。它应指向用户浏览器能访问的萌卡 HTTP 服务；如果经过域名反代，需要转发 `/openapi/captcha/` 下的 GET、POST 请求。这不是插件的 WS 监听地址。

未配置或地址格式无效时，`register_captcha` 返回 `ok: false` 并提示设置 `MENGKA_PUBLIC_URL`。其他登录接口和心跳查询不受影响。

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

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `type` | string | 固定为 `ready` |
| `service` | string | 服务名称 |
| `node_id` | number | 绑定节点 ID |
| `mode` | string | 固定为 `reverse` |

收到 `ready` 后即可发送 API 请求。反向连接不需要发送认证消息，默认接收全部六类事件。API 和事件帧格式与正向模式一致，见 [WebSocket API 格式](/guide/protocol)。

Meng Ka 会定期发送 WebSocket Ping 控制帧，插件所用的 WebSocket 库需要正确回复 Pong，否则连接会被判定失效并断开。
