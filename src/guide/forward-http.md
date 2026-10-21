# 正向 HTTP

正向 HTTP 服务在独立端口提供现有全部插件 API，每次请求携带服务令牌，直接返回 JSON 结果。

## 后台配置

打开 `/admin/plugins` 的“正向 HTTP”分页，添加服务并填写名称、访问权限、监听端口和绑定节点。创建时自动生成令牌，创建成功后立即启动监听。停止服务后可编辑配置、切换访问权限、修改令牌或删除服务。

新建服务默认选择“本地”，监听 `127.0.0.1:PORT`，仅允许本机连接；选择“全部”则监听 `0.0.0.0:PORT`，其他设备使用 Meng Ka 所在主机的 IP 或域名连接。编辑时显示已保存的访问权限，启停服务不会改变该设置。

端口不能与管理后台、WebSocket 服务或其他程序共用。HTTP 服务随后端启动自动恢复，只能操作绑定节点下的 Bot。

## 路由和鉴权

```http
POST http://HOST:PORT/api/{action}
Authorization: Bearer TOKEN
Content-Type: application/json
```

`{action}` 为接口名称，例如：

| 路由 | 用途 |
| --- | --- |
| `POST /api/get_bot_list` | 获取当前节点的 Bot 列表 |
| `POST /api/get_bot_info` | 获取 Bot 信息 |
| `POST /api/send_group_msg` | 发送群消息 |
| `POST /api/send_friend_msg` | 发送好友消息 |
| `POST /api/get_group_list` | 获取群列表 |
| `POST /api/upload_group_image` | 上传群图片 |
| `POST /api/login_account` | 登录账号 |

所有 API（包括查询类 API）均使用 POST；路由没有版本前缀。请求体直接使用对应 API 的 `params` 对象，无需外层 `type`、`id`、`action`、`params` 包装。无参数时传 `{}`。账号相关接口按原有约定传 `self_id` 和 `protocol_id`。

未提供 `Authorization` 时，可使用 `X-Meng-Ka-Token: TOKEN`。已提供的 `Authorization` 错误、为空或格式非法时直接拒绝。URL 查询参数和请求体中的令牌不用于认证。

## 调用示例

```bash
curl -X POST 'http://127.0.0.1:3003/api/get_bot_list' \
  -H 'Authorization: Bearer TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{}'
```

```js
const response = await fetch('http://127.0.0.1:3003/api/get_group_list', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer TOKEN',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ self_id: 123456789, protocol_id: 0 }),
})
const result = await response.json()
if (!response.ok || !result.ok) throw new Error(result.error)
console.log(result.data)
```

成功响应的 `data` 为后端业务结果，API 页“调用”区域可切换到 HTTP 查看对应请求示例：

```json
{ "ok": true, "data": [] }
```

HTTP 响应的 `data` 与 WebSocket `action_result` 中的 `data` 一致。HTTP 总会等待处理完成后返回结果。不要将业务数据里的 `code`、`success` 等字段与外层的 `ok` 混淆。

失败响应：

```json
{ "ok": false, "error": "令牌缺失或错误" }
```

| HTTP 状态码 | 含义 |
| --- | --- |
| 200 | 调用成功，业务结果见 `data` |
| 400 | JSON 格式、参数校验、节点校验或 action 执行失败 |
| 401 | 令牌缺失或错误 |
| 404 | 路由或 action 不存在 |
| 405 | 请求方法不是 POST |
| 413 | 请求体超过 4 MiB |
| 415 | Content-Type 不是 application/json |
| 429 | 服务已有 16 个请求正在处理，请稍后重试 |
| 500 | 响应编码失败 |

HTTP 服务不建立插件会话，不推送事件；需要接收消息和通知时使用 WebSocket 服务。媒体参数、节点限制及业务字段与现有 API 一致。连接中断或超时不代表业务操作已撤销，发送消息等操作应先确认结果再重试。
