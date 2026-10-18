# set_group_special_title

设置或清除群聊成员的专属头衔。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.set_group_special_title(
  self_id,
  platform,
  group_id,
  user_id,
  title,
)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/set_group_special_title' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "group_id": 987654321,
  "user_id": 234567890,
  "title": "示例头衔"
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `group_id` | number | 是 | 群聊 ID |
| `user_id` | number | 是 | 目标成员 QQ 号 |
| `title` | string | 是 | 专属头衔，传空字符串清除头衔 |

省略 `title` 或传 `null` 会报错。清除头衔必须显式传空字符串。

## 返回值

```js
{
  success: true,
}
```
