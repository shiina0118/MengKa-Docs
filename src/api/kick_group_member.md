# kick_group_member

将指定成员移出群聊，可同时拒绝该成员后续的加群申请。

## 调用

```js
const result = await api.kick_group_member(
  self_id,
  group_id,
  user_id,
  reject_add_request,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 群聊 ID |
| `user_id` | number | 是 | 被移出成员的 QQ 号 |
| `reject_add_request` | boolean | 是 | `true` 表示同时拒绝该成员后续的加群申请 |

## 返回值

```js
{
  success: true,
}
```
