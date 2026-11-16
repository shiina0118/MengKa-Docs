# qqpet_get_gifts

查询宠物礼包列表及当前领取状态，包括免费礼包和看视频领取的礼包。仅支持 `android` 账号。

先通过 [qqpet_get_user_pet](./qqpet_get_user_pet.md) 获取当前宠物，将返回的 `response.pet.field_101` 作为本接口的 `request.pet_id`。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_gifts",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "pet_id": "example-pet-id"
    }
  }
}
```

`example-pet-id` 为演示值，调用时须替换为实际返回的宠物 ID。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | object | 是 | 查询参数 |

### request

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `pet_id` | string | 是 | 当前宠物 ID，不能为空或纯空白；来源见上文 |
| `field_100` | number | 否 | 扩展整数参数，默认 `0`，含义暂未明确 |
| `field_101` | number | 否 | 扩展整数参数，默认 `0`，含义暂未明确 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 查询结果 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `gifts` | [GiftItem[]](#giftitem) | 本次返回的礼包列表，无礼包时为 `[]` |
| `has_more` | boolean | 服务端是否标记还有更多礼包，默认 `false` |

本接口只返回本次查询结果，不自动获取更多礼包。`has_more=true` 时，不应把当前列表视为完整列表。

### GiftItem

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `gift_id` | string | 礼包 ID，使用十进制字符串保留精度 |
| `name` | string | 礼包名称 |
| `sub_title` | string | 礼包副标题 |
| `description` | string | 礼包说明 |
| `operation_tag` | [OperationTag](#operationtag) | 领取类型及标签展示信息，服务端未下发时省略 |
| `claim_status` | number | 当前领取状态，取值见下表 |
| `claim_code` | number | 服务端领取结果码，具体取值含义暂未明确 |
| `claim_remain` | number | 剩余领取次数；可领取资格以 `claim_status` 为准 |
| `cover_url` | string | 礼包封面地址 |
| `act_id` | string | 关联活动标识 |
| `rule_id` | string | 关联活动规则标识 |
| `aid` | string | 活动关联值，具体含义暂未明确 |

未提供的字符串字段返回空字符串，`gift_id` 默认 `"0"`，数字字段默认 `0`。响应对象可能带有 `_unknown_fields`（string[]）兼容性附加数据，判断领取状态时无需读取。

### OperationTag

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `type` | number | `4`：免费领取；`5`：看视频领取；其他值暂不支持据此判断领取方式 |
| `resource_url` | string | 标签图片地址，未提供时为空字符串 |

### 领取状态

| `claim_status` | 含义 |
| --- | --- |
| `1` | 当前可领取，需结合 `operation_tag.type` 判断领取方式 |
| `2` | 今日已领取 |
| `3` | 礼包已失效 |
| `0` 或其他值 | 暂不可领取 |

## 判断免费与广告礼包

以下代码中的 `response` 是本接口返回的查询结果：

```javascript
const freeGifts = response.gifts.filter(
  gift => gift.claim_status === 1 && gift.operation_tag?.type === 4
);
const videoGifts = response.gifts.filter(
  gift => gift.claim_status === 1 && gift.operation_tag?.type === 5
);
```

`freeGifts.length > 0` 表示当前有可免费领取的礼包；`videoGifts.length > 0` 表示当前有具备看视频领取资格的礼包。实际广告播放还受客户端模式和广告加载结果影响。

查询不会领取礼包或播放广告。状态可能变化，需要最新状态时重新查询。

领取免费礼包可使用 [qqpet_claim_gift](./qqpet_claim_gift.md)，传入本次查询使用的 `pet_id` 和选中礼包的 `gift_id`。该接口不支持广告礼包。

领取广告礼包可使用 [qqpet_claim_ad_gift](./qqpet_claim_ad_gift.md)，传入本次查询使用的 `pet_id` 和选中礼包的 `gift_id`。该接口包含 30 秒等待，请按接口说明设置客户端超时。

## 错误处理

- 缺少 `request.pet_id`、值为空或纯空白时，返回 `request.pet_id 不能为空`。
- 参数类型错误或 `request` 中包含不支持的字段时，请按参数表修正后重试。
- 账号不在线、未授权给插件或账号类型不受支持时，请检查 `self_id`、`protocol_id`、插件授权及账号类型。
- 请求超时或服务端查询失败会返回接口错误；不要将请求失败当作没有可领取礼包。成功且 `gifts=[]` 才表示本次未返回礼包。
