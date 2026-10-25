# qmate_confirm_invite

合养邀请 ARK 卡片发送成功后，确认发起邀请，随后等待好友接受。

## 调用


```json
{
  "type": "action",
  "id": "3",
  "action": "qmate_confirm_invite",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890,
    "qmate_type": 1
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 发送邀请卡片的 Bot QQ 号 |
| `protocol_id` | number | 是 | 发送卡片所用的协议 ID；允许为 `0` |
| `user_id` | number | 是 | 收到邀请卡片的好友 QQ 号，必须大于 `0`，不接受 UID |
| `qmate_type` | number | 否 | 默认 `1`，必须与获取邀请卡片时一致；取值为 `1` 至 `2147483647` 的整数 |

## 返回值

以下为响应 `data` 的字段。`ok: true` 表示已取得并解析服务端响应，还需检查 `data.success`。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 服务端确认发起邀请成功时为 `true` |
| `error_code` | number | 请求结果码，成功时为 `0` |
| `error_message` | string | 失败说明，空字符串时省略 |

成功响应：

```json
{
  "ok": true,
  "data": {
    "success": true,
    "error_code": 0
  }
}
```

服务端拒绝时，外层为 `ok: true`，`data.success` 为 `false`，具体原因见 `error_code` 和 `error_message`。参数无效、Bot 未在线、请求失败、响应损坏时，返回 `ok: false`。

## 调用顺序

1. 调用 [`qmate_get_invite_ark`](/api/qmate_get_invite_ark)，取得 `data.ark`。
2. 调用 [`send_friend_msg`](/api/send_friend_msg)，将 `data.ark` 作为 `ark` 段发给目标好友。
3. 确认发送响应的 `ok` 和 `data.success` 都为 `true`，再调用本接口。Bot、协议、好友和精灵类型应与前两步一致。
4. 本接口成功后等待好友接受；若接受方也是 Bot，可由接受方调用 [`qmate_accept_invite`](/api/qmate_accept_invite)，将 `user_id` 设为邀请方 QQ 号。

本接口不会发送卡片，也不会代替好友接受邀请。调用方应确保卡片发送成功后再确认；请求只需要好友 QQ 号和精灵类型，不需要传入 `msg_seq`、ARK 内容或签名。
