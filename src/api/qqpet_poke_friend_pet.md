# qqpet_poke_friend_pet

踩一踩好友宠物。仅支持 `android` 账号。

向好友发送关心宠物的提醒，会产生互动效果。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_poke_friend_pet",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "friend_uin": "987654321",
      "pat_type": 1
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_poke_friend_pet' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "friend_uin": "987654321",
    "pat_type": 1
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
| `request.friend_uin` | string | 否 | 好友 QQ 号，使用十进制字符串 |
| `request.pat_type` | number | 否 | 提醒类型，使用当前场景返回的值 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

成功时 `response` 为空对象。
