# set_group_admin

设置或取消群聊管理员。

## 调用

```js
const result = await api.set_group_admin(
  self_id,
  group_id,
  target_uin,
  set_admin,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 群聊 ID |
| `target_uin` | number | 是 | 目标成员 QQ 号 |
| `set_admin` | boolean | 是 | `true` 设置，`false` 取消 |

## 返回值

```js
{
  group_id: 987654321,
  target_uin: 112233445,
  set_admin: true,
}
```
