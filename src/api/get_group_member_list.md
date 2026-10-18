# get_group_member_list

获取指定群的完整成员列表。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.get_group_member_list(self_id, platform, group_id)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_group_member_list' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "group_id": 987654321
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

## 返回值

```js
{
  group_id: 987654321,
  members: [{
    user_id: 234567890,
    nickname: '示例成员',
    card: '群名片',
    role: 0,
    level: 10,
    title: '',
    join_time: 1710000000,
    last_speak_time: 1710003600,
  }],
  total_count: 1,
}
```

`group_id` 为查询的群号，`total_count` 为返回成员数量，`members` 为成员数组，无结果时为 `[]`。

| 成员字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_id` | number | 成员 QQ 号 |
| `nickname` | string | 昵称 |
| `card` | string | 群名片，未设置时可能为空字符串 |
| `role` | number | `0` 普通成员、`1` 管理员、`2` 群主 |
| `level` | number | 群等级 |
| `title` | string | 专属头衔，可能为空字符串 |
| `join_time` | number | 入群时间，Unix 秒 |
| `last_speak_time` | number | 最近发言时间，Unix 秒；未取得时可能为 `0` |
