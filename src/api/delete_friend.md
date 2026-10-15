# delete_friend

删除指定好友。

## 调用

```js
const result = await api.delete_friend(self_id, platform, user_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `user_id` | number | 是 | 要删除的好友 QQ 号 |

## 返回值

```js
{ success: true, user_id: 112233445 }
```
