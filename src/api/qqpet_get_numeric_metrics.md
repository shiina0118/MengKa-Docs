# qqpet_get_numeric_metrics

获取宠物数值指标。仅支持 `android` 账号。

按指标类型读取结果。每项 `payload` 是该类型的数据，保留 Base64 字符串；不同类型的数据结构不同。`msg_type = 14` 的福袋数据另外提供结构化的 `coin_bag` 字段。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_numeric_metrics",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "pet_id": "PET_ID",
      "msg_types": [
        3,
        5,
        9
      ]
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_numeric_metrics' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "pet_id": "PET_ID",
    "msg_types": [
      3,
      5,
      9
    ]
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
| `request` | [Request](#request) | 否 | 本次操作的参数，默认 `{}` |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |
| `msg_types` | number[] | 否 | 需要查询的指标类型列表，例如 `3` 为等级、`5` 为金币、`9` 为照料状态、`14` 为福袋 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `items` | [Item[]](#response-items) | 条目列表 |
| `field_2` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_3` | string | 扩展数据，说明待补充；十进制整数字符串 |

### response.items[]（Item） {#response-items}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `msg_type` | number | 本次操作的msg_type数据 |
| `payload` | string | 该指标类型对应的数据，使用标准 Base64 字符串返回 |
| `coin_bag` | [CoinBag](./qqpet_get_coin_bag_detail.md#coin-bag) | 仅 `msg_type = 14` 且解析成功时返回，包含福袋 ID、过期时间和领取状态 |
| `coin_bag_decode_error` | string | 仅福袋数据解析失败时返回；原始 `payload` 和其他指标仍保留，此时不要据此发起领取 |

## 获取福袋 ID {#coin-bag}

调用本接口时使用以下业务参数。自己的福袋填写自己的宠物 ID；好友福袋填写好友的宠物 ID。

```json
{
  "pet_id": "TARGET_PET_ID",
  "msg_types": [14]
}
```

从 `response.items` 中找到 `msg_type = 14` 的项，读取 `coin_bag.coinbag_id`，再调用 [查询福袋详情](./qqpet_get_coin_bag_detail.md) 或 [领取福袋金币](./qqpet_snatch_coin_bag.md)。不要将 Base64 `payload` 当作福袋 ID。

没有返回类型 `14` 的项、`coinbag_id` 为空、`status = 4` 或 `end_ts` 已到期时，本次没有可用福袋；`opened_by_me = true` 或 `status = 3` 表示已领取或已收走。最终是否可领取以服务端结果为准。
