# WebSocket API 格式

本页说明插件与 Meng Ka 之间的请求、响应和事件格式。插件可以使用任意语言，按以下 JSON 格式收发 WebSocket 文本消息。

## API 请求

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

| 字段 | 说明 |
| --- | --- |
| `type` | 固定为 `action` |
| `id` | 请求标识；需要响应时必须提供，省略时 Meng Ka 不回复 |
| `action` | API 名称 |
| `params` | API 参数对象 |

## 请求大小限制

每条 API 请求的完整 JSON 按 UTF-8 计算，最多 **4 MiB（4,194,304 字节）**，包含 `type`、`id`、`action`、`params` 等所有字段。

插件应在发送前自行检查大小。直接发送超限消息会被关闭连接（关闭码 `1009`），并影响该连接上其他尚未完成的调用。

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

插件使用 `id` 关联请求与响应，同一连接上尚未完成的请求应使用不同的 `id`。插件应自行设置等待超时：建议默认 30 秒，媒体、红包、头像和批量任务等 API 适当延长。不需要结果时可以省略 `id`，Meng Ka 仍会执行请求，但不会回复，执行失败也无法得知。

同一连接上的 action 会并发执行，当前每连接最多同时运行 16 个；响应顺序不保证与请求顺序一致，必须按 `id` 匹配结果。

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

正向与反向连接均使用 WebSocket Ping/Pong 控制帧维持连接。请确认所用 WebSocket 库能自动回复 Pong 控制帧。

## API 作用域

账号管理和登录类 API 可以操作绑定节点下的离线或登录中账号。其余 Bot API
需要通过 `self_id` 指定在线 Bot。带 `self_id` 的请求必须同时传入 `protocol_id`。
调用时必须满足：

- Bot 属于插件服务绑定的节点。
- 需要 `self_id` 的 API 传入有效账号，以及对应的 非负整数 `protocol_id`（允许为 `0`）。
- 非账号管理和登录类 API 对应的 Bot 当前在线。

不满足条件时会收到 `ok: false` 的 `action_result`。
