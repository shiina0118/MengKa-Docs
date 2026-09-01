# 通信协议

官方 Node.js SDK 已封装本页协议。其他语言可以按照以下 JSON 帧实现 WebSocket 客户端或服务端。

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

正向 Node.js SDK每 30 秒发送应用层心跳：

```json
{ "type": "ping" }
```

萌卡NT返回：

```json
{ "type": "pong" }
```

反向模式同时使用 WebSocket Ping/Pong 控制帧维持连接。自定义实现应正确响应控制帧。

## API 作用域

账号管理和登录类 API 可以操作绑定节点下的离线或登录中账号。其余 Bot API
需要通过 `self_id` 指定在线 Bot。带 `self_id` 的请求必须同时传入 `platform`。
调用时必须满足：

- Bot 属于插件服务绑定的节点。
- 需要 `self_id` 的 API 传入有效账号，以及对应的 `platform`（`linux` 或 `android`）。
- 非账号管理和登录类 API 对应的 Bot 当前在线。

不满足条件时会收到 `ok: false` 的 `action_result`。
