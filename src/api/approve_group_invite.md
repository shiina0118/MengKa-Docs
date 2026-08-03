# approve_group_invite

同意好友发来的群聊邀请。

## 调用

```js
const result = await api.approve_group_invite(self_id, group_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 邀请加入的群聊 ID |

`group_id` 来自 `friend_notice/group_invite` 事件的 `body.group_id`。

## 返回值

返回邀请处理结果。
