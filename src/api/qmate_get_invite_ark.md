# qmate_get_invite_ark

获取聊天精灵（秋秋人）的好友合养邀请 ARK 卡片。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qmate_get_invite_ark",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890,
    "qmate_type": 1
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qmate_get_invite_ark' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "user_id": 234567890,
  "qmate_type": 1
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `user_id` | number | 是 | 目标好友 QQ 号，必须大于 `0`，不接受 UID |
| `qmate_type` | number | 否 | 精灵类型，默认 `1`（原库合养页面的初始值）；取值为 `1` 至 `2147483647` 的整数，具体类型是否可用由服务端决定 |

## 返回值

以下为响应 `data` 的字段。`ok: true` 表示取得并解析了服务端响应，还需检查 `data.success`。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 成功取得有效 ARK JSON 时为 `true` |
| `ark` | string | 完整 ARK JSON 字符串，保留服务端返回的签名和额外字段；失败时省略 |
| `error_code` | number | 请求结果码，成功时为 `0` |
| `error_message` | string | 失败说明，空字符串时省略 |

服务端拒绝请求时，外层为 `ok: true`，但 `data.success` 为 `false`，具体原因见 `error_code` 和 `error_message`。

参数无效、Bot 未在线、请求失败、响应损坏或缺少有效卡片时，返回 `ok: false`，`error` 包含原因。

## 发送卡片

获取成功后，将 `data.ark` 原样作为 [`send_friend_msg`](/api/send_friend_msg) 的 ARK 消息段内容，并使用同一 Bot 和同一个目标好友：

```js
// result 是 qmate_get_invite_ark 的完整响应。
if (result.ok && result.data.success) {
  const params = {
    self_id: 123456789,
    protocol_id: 0,
    user_id: 234567890,
    message: [{ type: "ark", data: result.data.ark }]
  };
  // 使用 params 调用 send_friend_msg。
}
```

本接口只获取邀请卡片，不会自动发送。卡片发送成功后，使用相同的 `self_id`、`protocol_id`、`user_id` 和 `qmate_type` 调用 [`qmate_confirm_invite`](/api/qmate_confirm_invite) 确认发起邀请，再等待好友接受。发送失败时不要调用确认接口。接受方可使用 [`qmate_accept_invite`](/api/qmate_accept_invite)，获取或发送卡片不等于完成合养。
