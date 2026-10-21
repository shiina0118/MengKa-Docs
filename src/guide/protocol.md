# WebSocket API 格式

本页说明插件与 Meng Ka 之间的请求、响应和事件格式。官方 Node.js SDK 已封装这些消息；使用其他语言时，可以按以下 JSON 格式接入。

## API 请求

```json
{
  "type": "action",
  "id": "1",
  "action": "get_group_list",
  "params": {
    "self_id": 123456789,
    "platform": "android"
  }
}
```

| 字段 | 说明 |
| --- | --- |
| `type` | 固定为 `action` |
| `id` | 请求标识；需要响应时必须提供 |
| `action` | API 名称 |
| `params` | API 参数对象 |

## 请求大小限制

每条 API 请求的完整 JSON 按 UTF-8 计算，最多 **4 MiB（4,194,304 字节）**，包含 `type`、`id`、`action`、`params` 等所有字段。

官方 Node.js SDK 会在发送前检查大小，超限时直接报错并保留连接。等待响应的 API 返回失败；不等待响应的 API 同步抛出错误。自定义客户端也应检查大小，直接发送超限消息会被关闭连接（关闭码 `1009`），并影响该连接上其他尚未完成的调用。

Base64 音频必须连同请求字段一起计算；3 MiB 的原始音频编码后再加上 JSON 字段会超限。较大文件应使用后端可访问的 HTTP(S) 地址或后端本地路径。

## API 响应

成功：

```json
{
  "type": "action_result",
  "id": "1",
  "ok": true,
  "data": {}
}
```

失败：

```json
{
  "type": "action_result",
  "id": "1",
  "ok": false,
  "error": "bot 未在线"
}
```

SDK使用 `id` 关联请求。默认超时为 30 秒，媒体、红包、头像和批量任务等 API 会设置更长超时。`like_qzone_feed` 和 `unlike_qzone_feed` 是无需响应的 API，SDK发送时不附带 `id`。

同一连接上的 action 会并发执行，当前每连接最多同时运行 16 个；响应顺序不保证与请求顺序一致。SDK根据 `id` 匹配 Promise，因此调用方可以安全地使用 `Promise.all`。连续 `await` 仍会由调用方形成串行。

## 事件帧

```json
{
  "type": "event",
  "data": {
    "self_id": 123456789,
    "post_type": "group_message"
  }
}
```

`data.post_type` 决定事件类型。事件结构见[事件参考](/events/)。

## 心跳

正向与反向连接均使用 WebSocket Ping/Pong 控制帧维持连接。官方 Node.js SDK 使用的 WebSocket 库会自动响应；使用其他语言时，应确认所用库能正确处理这些控制帧。

## API 作用域

账号管理和登录类 API 可以操作绑定节点下的离线或登录中账号。其余 Bot API
需要通过 `self_id` 指定在线 Bot。带 `self_id` 的请求必须同时传入 `platform`。
调用时必须满足：

- Bot 属于插件服务绑定的节点。
- 需要 `self_id` 的 API 传入有效账号，以及对应的 `platform`（`linux` 或 `android`）。
- 非账号管理和登录类 API 对应的 Bot 当前在线。

不满足条件时会收到 `ok: false` 的 `action_result`。
