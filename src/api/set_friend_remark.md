# set_friend_remark

设置或清除指定好友的备注。

## 调用

```js
const result = await api.set_friend_remark(self_id, platform, user_id, remark)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `user_id` | number | 是 | 目标好友 QQ 号 |
| `remark` | string | 是 | 新备注；传空字符串清除备注 |

`remark` 不可省略或传 `null`。目标必须是该 Bot 的好友。

## 返回值

```js
{ success: true, user_id: 234567890, remark: '项目联系人' }
```

失败时 Promise 拒绝。成功后可通过 [`get_friend_list`](/api/get_friend_list) 查询好友的 `remark`。

## 示例

```js
await api.set_friend_remark(self_id, platform, 234567890, '项目联系人')
await api.set_friend_remark(self_id, platform, 234567890, '') // 清除备注
```
