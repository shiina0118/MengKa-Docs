# yuanbao_delete_conversation

使用保存的元宝登录票据删除会话。目前仅支持 Android 账号。

## 调用

票据按返回值原样传入，不要自行构造或修改。示例中的票据需替换为实际保存的值。

```json
{
  "type": "action",
  "id": "1",
  "action": "yuanbao_delete_conversation",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "token": "TOKEN",
    "user_id": "USER_ID",
    "conversation_ids": ["CONVERSATION_ID_1", "CONVERSATION_ID_2"]
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `self_id` | number | 是 | - | 在线 Bot QQ 号，须与票据所属账号一致 |
| `protocol_id` | number | 是 | - | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `token` | string | 是 | - | 最近一次 [yuanbao_login](/api/yuanbao_login) 或 [yuanbao_refresh_ticket](/api/yuanbao_refresh_ticket) 返回的 `token` |
| `user_id` | string | 是 | - | 同一次返回的 `user_id` |
| `conversation_ids` | string[] | 是 | - | 要删除的会话 ID，来自 [yuanbao_create_conversation](/api/yuanbao_create_conversation) 返回的 `conversation_ids` |

## 返回值

成功时 `data` 为 `null`：

```json
{ "type": "action_result", "id": "1", "ok": true, "data": null }
```

## 失败处理

- 票据无效或已过期时，`error` 为 `删除元宝会话失败: 票据无效或已过期`，此时请先调用 [yuanbao_refresh_ticket](/api/yuanbao_refresh_ticket)；刷新也失败时调用 [yuanbao_login](/api/yuanbao_login) 重新获取票据。
- `token` 或 `user_id` 为空时直接返回参数错误。
- Bot 不在线或不是 Android 账号时返回失败结果，`error` 中说明原因。
- `conversation_ids` 为空时直接返回参数错误。
