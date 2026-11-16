# qqpet_claim_ad_gift

领取当前账号宠物的广告礼包。仅支持 `android` 账号，每次调用领取一个礼包。

本接口不播放视频，领取流程包含 **30 秒等待**，无需调用方播放广告或自行计时。等待时长固定，不支持修改。是否领取成功请以响应中的 `success` 为准。

## 调用流程

1. 调用 [qqpet_get_user_pet](./qqpet_get_user_pet.md)，将 `response.pet.field_101` 保存为 `pet_id`。
2. 调用 [qqpet_get_gifts](./qqpet_get_gifts.md)，选择 `operation_tag.type === 5` 且 `claim_status === 1` 的礼包。
3. 将同一个 `pet_id` 和所选礼包的 `gift_id` 传入本接口。
4. 检查响应中的 `success`、`stage`、`code` 和 `message`。需要确认最终状态时，重新查询礼包和相应物品库存。

正常领取流程需要等待 30 秒，另有礼包查询和网络请求耗时；参数校验或礼包检查失败时可能提前返回。建议客户端等待超时设为 **130 秒或更长**。请勿因为尚未收到结果而重复调用。

调用时会重新检查该礼包是否存在、是否属于广告礼包、是否仍可领取。检查或广告加载失败时不领取。免费礼包请使用 [qqpet_claim_gift](./qqpet_claim_gift.md)。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_claim_ad_gift",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "pet_id": "example-pet-id",
      "gift_id": "123"
    }
  }
}
```

`pet_id` 和 `gift_id` 均为演示值，调用时替换为当前账号实际查询到的值。无需提供 Cookie 或广告领取凭据。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | object | 是 | 领取参数 |

### request

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `pet_id` | string | 是 | 当前账号的宠物 ID，不能为空或纯空白 |
| `gift_id` | string | 是 | [礼包查询](./qqpet_get_gifts.md) 返回的广告礼包 ID；正 uint64 十进制字符串，不接受 JSON 数字 |

## 返回值

以下为响应 `data` 字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `gift_id` | string | 本次领取的礼包 ID |
| `success` | boolean | 本次领取是否成功；加载广告成功不等于领取成功 |
| `stage` | string | 本次结果所属阶段：`load` 为广告加载，`submit` 为奖励提交 |
| `code` | number | 所属阶段的服务端业务结果码；`0` 表示该阶段成功，其他值为服务端拒绝或失败 |
| `message` | string | 所属阶段的服务端说明，未提供时为空字符串 |
| `submitted` | boolean | 是否已进入奖励提交阶段 |
| `playback_simulated` | boolean | 固定为 `true`，表示本次未实际播放视频 |
| `elapsed_time_ms` | number | 固定为 `30000`，表示完成时长为 30 秒，单位毫秒 |

成功示例：

```json
{
  "self_id": 123456789,
  "gift_id": "123",
  "success": true,
  "stage": "submit",
  "code": 0,
  "message": "",
  "submitted": true,
  "playback_simulated": true,
  "elapsed_time_ms": 30000
}
```

外层 `ok: true` 只表示已取得并解析服务端响应，仍须检查 `data.success`。领取成功后，可重新查询礼包状态和相应物品库存，更新本地展示。

## 限制与错误处理

- 参数无效、账号不在线、账号类型不受支持、礼包未找到、已领取、已失效、不是广告礼包或暂不可领取时，返回接口错误。
- 广告加载或奖励提交被服务端拒绝时，返回 `success: false`，并通过 `stage`、`code`、`message` 指明失败阶段和原因。
- 广告设备信息缺失、未返回可用广告、领取信息不完整或响应无效时，返回接口错误。
- 每次调用只处理一个礼包；加载和提交各执行一次，不自动重试，不批量循环领取。
- 不要并发或重复领取同一礼包。客户端超时或断开连接不代表领取已取消。
- 提交超时、连接中断或提交响应无法解析时，领取结果可能不确定。**先查询礼包状态和库存，不要直接重试。**
