# set_group_special_title

设置或清除群聊成员的专属头衔。目标成员昵称由服务端通过 QQ 名片接口自动获取。

## 调用

```js
const result = await api.set_group_special_title(
  self_id,
  platform,
  group_id,
  user_id,
  title,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `group_id` | number | 是 | 群聊 ID |
| `user_id` | number | 是 | 目标成员 QQ 号 |
| `title` | string | 是 | 专属头衔，传空字符串清除头衔 |

## 返回值

```js
{
  success: true,
}
```
