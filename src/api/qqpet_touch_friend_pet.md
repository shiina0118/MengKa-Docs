# qqpet_touch_friend_pet

上报“摸一摸好友宠物”事件。仅支持 `android` 账号。

该接口对应 `OidbSvcTrpcTcp.0x96a6_1`，内部固定上报：

```text
page=1000 (E_PET_MAINPAGE)
event_type=300 (E_EVENT_HANDS)
sub_event=301 (E_SUBEVENT_HANDS_TOUCH)
```

## 调用

`pet_id` 使用好友宠物资料中的真实宠物 ID，不能自行构造。可先调用
[qqpet_get_other_user_pet](/api/qqpet_get_other_user_pet) 获取好友宠物资料，
再使用返回的宠物 ID。

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_touch_friend_pet",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "friend_uin": "987654321",
      "pet_id": "PET_ID"
    }
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request.friend_uin` | string | 是 | 好友 QQ 号，使用十进制字符串 |
| `request.pet_id` | string | 是 | 好友宠物 ID |

## 返回值

成功时返回 QQ 宠物行为上报接口的响应：

```json
{
  "self_id": 123456789,
  "command": "OidbSvcTrpcTcp.0x96a6_1",
  "transport": "oidb",
  "response": {
    "field_1": []
  }
}
```
