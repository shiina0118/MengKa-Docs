# yuanbao_create_conversation

使用保存的元宝登录票据创建空会话，返回会话 ID。目前仅支持 Android 账号。

会话创建后会保留在元宝账号中，不再使用时请调用 [yuanbao_delete_conversation](/api/yuanbao_delete_conversation) 删除。

## 调用

票据按返回值原样传入，不要自行构造或修改。示例中的票据需替换为实际保存的值。

```json
{
  "type": "action",
  "id": "1",
  "action": "yuanbao_create_conversation",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "token": "TOKEN",
    "user_id": "USER_ID",
    "count": 1
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
| `count` | number | 否 | `1` | 创建的会话数量，取值 `1` 到 `10` |

## 返回值

成功时 `data` 示例（会话 ID 为演示值）：

```js
{
  conversation_ids: ['CONVERSATION_ID_1', 'CONVERSATION_ID_2']
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `conversation_ids` | string[] | 新建会话的 ID，删除会话时作为 `conversation_ids` 传入 |

## 失败处理

- 票据无效或已过期时，`error` 为 `创建元宝会话失败: 票据无效或已过期`，此时请先调用 [yuanbao_refresh_ticket](/api/yuanbao_refresh_ticket)；刷新也失败时调用 [yuanbao_login](/api/yuanbao_login) 重新获取票据。
- `token` 或 `user_id` 为空时直接返回参数错误。
- Bot 不在线或不是 Android 账号时返回失败结果，`error` 中说明原因。
- 元宝账号已被封禁时，`error` 为 `创建元宝会话失败: 元宝账号已被封禁`。
- `count` 不在 `1` 到 `10` 之间时直接返回参数错误。
