# qqpet_claim_gift

领取当前账号宠物的免费礼包。仅支持 `android` 账号，不支持广告礼包，不会播放广告。

## 调用流程

1. 通过 [qqpet_get_user_pet](./qqpet_get_user_pet.md) 获取当前宠物，保存 `response.pet.field_101` 作为 `pet_id`。
2. 调用 [qqpet_get_gifts](./qqpet_get_gifts.md)，选择 `operation_tag.type === 4` 且 `claim_status === 1` 的礼包，保存其 `gift_id`。
3. 将同一个 `pet_id` 和选中的 `gift_id` 传入本接口。`gift_id` 必须使用十进制字符串，不要转成 JavaScript 数字。
4. 收到响应后检查 `success`。成功后可重新调用礼包查询接口更新展示。

每次调用只尝试领取所选的一个免费礼包，不会批量领取。提交前会重新检查礼包是否存在、是否免费以及是否仍可领取；最终结果以服务端返回为准。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_claim_gift",
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

`pet_id`、`gift_id` 均为演示值，调用时替换为当前账号实际查询到的值。无需传入 Cookie、活动标识或领取规则标识。

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
| `gift_id` | string | 是 | [礼包查询](./qqpet_get_gifts.md) 返回的礼包 ID；正 uint64 十进制字符串，不能用礼包名称或食物 ID 代替 |

## 返回值

以下为响应 `data` 字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `gift_id` | string | 本次尝试领取的礼包 ID |
| `success` | boolean | 服务端是否确认本次领取成功；只有结果码为 `0` 时为 `true` |
| `code` | number | 服务端业务结果码；`0` 为成功，`-1018` 表示需要验证码验证，其他值表示领取失败 |
| `message` | string | 服务端返回的说明，未提供时为空字符串 |
| `verification_required` | boolean | 是否需要验证码验证；为 `true` 时 `success` 为 `false` |

成功示例：

```json
{
  "self_id": 123456789,
  "gift_id": "123",
  "success": true,
  "code": 0,
  "message": "",
  "verification_required": false
}
```

外层 `ok: true` 表示已取得并解析领取响应，不一定表示领取成功，仍须检查 `data.success`。

### 验证码

`verification_required === true` 时，本接口不会自动处理验证码或再次提交领取。请在当前账号的 QQ 客户端完成验证及领取操作，然后重新查询礼包状态；不要循环调用本接口。

## 限制与错误处理

- 缺少宠物 ID、礼包 ID 格式错误、未找到礼包、已领取、已失效、不是免费礼包或暂不可领取时，返回接口错误，不提交领取。
- 查询列表不完整且本次未找到指定礼包时，也不会尝试领取。
- 账号不在线、账号类型不受支持或登录态获取失败时，返回接口错误。
- 服务端返回业务失败时，返回 `success: false` 和原始 `code`，由调用方检查 `message`。
- 请求超时、连接中断、响应无法解析等情况可能无法确认领取结果。**先重新查询礼包状态，不要直接重试领取。**
- 接口不会自动重试，也不会自动切换到其他礼包或领取方式。多次主动调用仍可能产生多次请求，不保证重复调用安全。
