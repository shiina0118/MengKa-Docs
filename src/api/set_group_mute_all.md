# set_group_mute_all

开启或取消全员禁言。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.set_group_mute_all(self_id, platform, group_id, mute)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/set_group_mute_all' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "group_id": 987654321,
  "mute": true
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
| `mute` | boolean | 是 | `true` 开启，`false` 取消 |

必须明确传入 `mute`。省略或传 `null` 会报错，不会改变全员禁言状态。

## 返回值

```js
{ group_id: 987654321, mute: true }
```
