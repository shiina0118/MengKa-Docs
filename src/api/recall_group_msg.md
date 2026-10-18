# recall_group_msg

撤回群聊消息。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.recall_group_msg(
  self_id,
  platform,
  group_id,
  msg_seq,
  msg_random,
)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/recall_group_msg' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "group_id": 987654321,
  "msg_seq": 123,
  "msg_random": 456
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
| `msg_seq` | number | 是 | 消息序列号 |
| `msg_random` | number | 是 | 消息随机数 |

消息标识可来自 `send_group_msg` 返回值、群聊消息事件或撤回事件。

## 返回值

```js
{ success: true }
```
