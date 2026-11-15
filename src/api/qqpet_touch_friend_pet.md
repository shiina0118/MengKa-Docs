# 摸一摸好友宠物

`qqpet_touch_friend_pet`：提交一次摸一摸好友宠物的互动事件。仅支持 `android` 账号。

## 调用流程

1. 调用 [qqpet_get_other_user_pet](./qqpet_get_other_user_pet)，传入好友 QQ 号。
2. 保存返回的 `response.pet.field_101`，作为本接口的 `pet_id`。
3. 使用同一个好友 QQ 号和宠物 ID 调用本接口。

`pet_id` 必须使用好友宠物资料返回的真实值，不能自行构造、解析或修改。

## 调用

示例中的 `PET_ID` 须替换为 [qqpet_get_other_user_pet](./qqpet_get_other_user_pet) 返回的实际值。

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
| `request` | [Request](#request) | 是 | 本次互动的目标 |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `friend_uin` | string | 是 | 好友 QQ 号，使用十进制字符串 |
| `pet_id` | string | 是 | [qqpet_get_other_user_pet](./qqpet_get_other_user_pet) 返回的 `response.pet.field_101` |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `command` | string | 本次请求的命令标识，仅用于问题排查 |
| `transport` | string | 本次请求使用的传输方式 |
| `response` | [Response](#response) | 本次互动的返回数据 |
| `raw_response` | string | 原始响应的 Base64 字符串，通常使用 `response` 即可 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string[] | 服务端返回的结果列表，具体内容以实际响应为准 |

## 使用限制与错误处理

- 本接口只提交一次互动事件，不负责获取好友宠物资料或播放客户端动画。
- `friend_uin` 和 `pet_id` 不能为空；`pet_id` 必须来自目标好友宠物资料。
- 请求失败或超时不会自动重试。超时不能证明事件是否已被服务端处理，请先确认实际状态后再决定是否重试。
