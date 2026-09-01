# get_friend_list

获取 Bot 的完整好友列表。萌卡NT会自动完成分页。

## 调用

```js
const result = await api.get_friend_list(self_id, platform)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |

## 返回值

```js
{
  friends: [],
  total_count: 0,
  self_uin: 123456789,
}
```
