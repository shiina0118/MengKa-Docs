# qqpet_snatch_coin_bag

领取宠物福袋金币。仅支持 `android` 账号。

自己的福袋和好友福袋使用同一个接口。`pet_id` 始终填写当前账号自己的宠物 ID，`coinbag_id` 填待领取的福袋 ID。

先通过 [数值查询](./qqpet_get_numeric_metrics.md#coin-bag) 获取福袋 ID，再用 [福袋详情](./qqpet_get_coin_bag_detail.md) 检查状态。该操作会实际领取金币，是否可领取由服务端判断。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_snatch_coin_bag",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "pet_id": "MY_PET_ID",
      "coinbag_id": "COINBAG_ID"
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_snatch_coin_bag' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "pet_id": "MY_PET_ID",
      "coinbag_id": "COINBAG_ID"
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
| `request` | [Request](#request) | 是 | 本次操作的业务参数 |

### request（Request） {#request}

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pet_id` | string | 当前账号自己的宠物 ID，不能填好友宠物 ID 或 QQ 号 |
| `coinbag_id` | string | 待领取的福袋 ID |
| `field_2` | string | 保留字段，含义尚未确认；原版主页调用留空，通常省略 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次领取结果 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `detail` | [CoinBagDetail](./qqpet_get_coin_bag_detail.md#detail) | 领取后的福袋详情，服务端未下发时省略 |
| `snatch_info` | [SnatchInfo](./qqpet_get_coin_bag_detail.md#snatch-info) | 本次领取记录；`coins` 为领取金币数，使用十进制整数字符串 |

## 状态与错误

`opened_by_me = true`、福袋 `status = 3` 或 `status = 4` 时，不应再次领取。不能仅凭福袋存在就认为一定可以领取。

原版客户端针对以下服务端错误码有专门处理；后端会按现有 OIDB 错误格式返回错误，不会将其包装为领取成功：

| 错误码 | 原版处理含义 |
| --- | --- |
| `135097` | 需要先成为好友 |
| `135098` | 达到领取上限 |
| `135091`、`135092`、`135096` | 主人已经收走等不可继续领取状态 |

每次调用只发送一次领取请求，不自动重试。请求超时后先查询福袋详情，确认是否已领取，再决定后续操作。

## 协议与验证

使用 `OidbSvcTrpcTcp.0x9d71_0`，仅支持 OIDB 路由。字段和命令来自 ADB 提取的 `pet_home/11800` 原版模块，并已通过原版编码器样本校验。尚未验证在线服务端领取结果。
