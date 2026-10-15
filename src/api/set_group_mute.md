# set_group_mute

设置或取消群聊成员禁言。

## 调用

```js
const result = await api.set_group_mute(
  self_id,
  platform,
  group_id,
  user_id,
  duration_sec,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `group_id` | number | 是 | 群聊 ID |
| `user_id` | number | 是 | 目标成员 QQ 号 |
| `duration_sec` | number | 是 | 禁言秒数，`0` 取消禁言 |

必须明确传入 `duration_sec`。省略或传 `null` 会报错；解除禁言请显式传 `0`。

## 返回值

```js
{
  group_id: 987654321,
  user_id: 112233445,
  duration_sec: 600,
}
```
