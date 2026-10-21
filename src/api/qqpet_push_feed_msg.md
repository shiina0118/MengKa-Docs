# qqpet_push_feed_msg

推送宠物喂食消息。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_push_feed_msg",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "pet_master_uin": "123456789",
      "field_4": 1,
      "field_5": 1
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_push_feed_msg' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "pet_master_uin": "123456789",
    "field_4": 1,
    "field_5": 1
  }
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | object | 否 | 本次操作的参数，默认 `{}` |

### request

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `request.pet_master_uin` | string | 否 | 宠物主人 QQ 号 |
| `request.nick` | string | 否 | 昵称 |
| `request.avatar_url` | string | 否 | 头像地址 |
| `request.field_4` | number | 否 | 扩展参数，说明待补充 |
| `request.field_5` | number | 否 | 扩展参数，说明待补充 |
| `request.food_id` | string | 否 | 本次累计喂食使用的食物 ID |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |
