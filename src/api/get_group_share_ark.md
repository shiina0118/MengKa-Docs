# get_group_share_ark

获取普通群资料页的分享 ARK 卡片，直接返回可用于发送的 `ark` 消息段。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "get_group_share_ark",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `group_id` | number | 是 | 目标群号，必须为大于 `0` 的整数，直接传数字即可 |

## 返回值

成功时外层为 `ok: true`，`data` 为标准 `ark` 消息段对象：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `type` | string | 固定为 `"ark"` |
| `data` | object | 服务端返回的完整 ARK 卡片 JSON 对象；发送时请原样传递，不要自行构造、删减或修改内部字段 |

成功时的 `data` 示例（卡片内容仅作格式演示，调用时须使用接口实际返回值）：

```json
{
  "type": "ark",
  "data": {
    "app": "com.tencent.troopsharecard",
    "view": "contact",
    "ver": "1.0.0.30",
    "prompt": "[推荐群聊]",
    "meta": {
      "contact": {}
    }
  }
}
```

参数无效、Bot 未在线、服务端拒绝请求或响应缺少有效卡片时，返回 `ok: false`，`error` 包含原因。

## 发送卡片

获取成功后，可直接将 `result.data` 放入 [`send_group_msg`](/api/send_group_msg) 或 [`send_friend_msg`](/api/send_friend_msg) 的 `message` 数组中发送：

```js
// result 是 get_group_share_ark 的完整响应。
if (result.ok) {
  const params = {
    self_id: 123456789,
    protocol_id: 0,
    group_id: 987654321,
    message: [result.data]
  };
  // 使用 params 调用 send_group_msg（或改为 user_id 调用 send_friend_msg）。
}
```

本接口仅获取分享卡片，不会自动发送，也不会申请入群。卡片内容、有效期及分享权限由 QQ 服务端决定。
