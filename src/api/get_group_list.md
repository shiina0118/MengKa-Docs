# get_group_list

获取 Bot 的完整群聊列表。萌卡NT会自动完成分页。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.get_group_list(self_id, platform)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_group_list' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android"
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |

## 返回值

```js
{
  groups: [{
    group_id: 987654321,
    group_name: '示例群',
    group_remark: '',
    member_count: 50,
    max_member_count: 500,
    create_time: 1710000000,
    description: '交流群',
    question: '',
    announcement: '',
  }],
  total_count: 1,
  self_id: 123456789,
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `groups` | object[] | 群数组，没有群时为 `[]` |
| `total_count` | number | 本次返回的群数量 |
| `self_id` | number | 当前 Bot QQ 号 |
| `groups[].group_id` | number | 群号 |
| `groups[].group_name` | string | 群名 |
| `groups[].group_remark` | string | 群备注 |
| `groups[].member_count`, `groups[].max_member_count` | number | 当前人数、人数上限 |
| `groups[].create_time` | number | 创建时间，Unix 秒 |
| `groups[].description` | string | 群介绍 |
| `groups[].question` | string | 入群问题 |
| `groups[].announcement` | string | 群公告 |

没有对应内容或未取得信息时，文本字段可能为空字符串，数字字段可能为 `0`。
