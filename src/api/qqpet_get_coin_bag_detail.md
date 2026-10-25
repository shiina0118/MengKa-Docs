# qqpet_get_coin_bag_detail

查询宠物福袋详情。仅支持 `android` 账号。

对应宠物主页地上的金币福袋。查询自己的福袋时，`pet_id` 和 `other_pet_id` 都填自己的宠物 ID；查询好友福袋时，`pet_id` 填自己的宠物 ID，`other_pet_id` 填好友的宠物 ID。查询本身不领取金币。

先调用 [qqpet_get_numeric_metrics](./qqpet_get_numeric_metrics.md#coin-bag)，传目标宠物 ID 和 `msg_types: [14]`，从 `items[].coin_bag.coinbag_id` 获取福袋 ID。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_coin_bag_detail",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "pet_id": "MY_PET_ID",
      "other_pet_id": "MY_PET_ID",
      "coinbag_id": "COINBAG_ID",
      "source": 1
    }
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | [Request](#request) | 是 | 本次操作的业务参数 |

### request（Request） {#request}

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pet_id` | string | 当前账号自己的宠物 ID，不能用 QQ 号代替 |
| `other_pet_id` | string | 福袋所属宠物 ID；查自己的福袋时与 `pet_id` 相同 |
| `coinbag_id` | string | 从数值查询获取的福袋 ID |
| `source` | number | 查询来源：`1` 自己主页，`2` 好友主页，`3` 消息入口 |
| `field_10` | boolean | 保留字段，含义尚未确认；原版主页调用不设置，通常省略 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次查询结果 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `exists` | boolean | 福袋是否存在；为 `false` 时不要继续领取 |
| `detail` | [CoinBagDetail](#detail) | 福袋详情，服务端未下发时省略 |

### detail（CoinBagDetail） {#detail}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `coin_bag` | [CoinBag](#coin-bag) | 福袋基本信息 |
| `snatch_infos` | [SnatchInfo[]](#snatch-info) | 领取记录列表 |
| `page` | [CoinBagPage](#page) | 详情页展示信息，服务端未下发时省略 |

### coin_bag（CoinBag） {#coin-bag}

64 位整数使用十进制字符串返回；时间戳单位为秒。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `coinbag_id` | string | 福袋 ID |
| `field_2` | string | 保留的 64 位整数字段，含义尚未确认 |
| `near_end_ts` | string | 开始显示即将过期状态的时间戳 |
| `end_ts` | string | 福袋过期时间戳 |
| `status` | number | 原始状态值；原版将 `3` 作为已收走、`4` 作为已过期处理，其他值不保证可领取 |
| `field_6` | string | 保留字段，含义尚未确认 |
| `pet_id` | string | 福袋所属宠物 ID |
| `field_8` | string | 保留字段，含义尚未确认 |
| `activity_type` | number | 活动类型；原版识别 `6100` 为学习、`6400` 为打工 |
| `total_coins` | string | 福袋总金币数 |
| `field_12` | string | 保留的 64 位整数字段，含义尚未确认 |
| `total_times` | number | 总领取次数 |
| `left_times` | number | 剩余领取次数 |
| `field_30` | boolean | 保留字段，含义尚未确认 |
| `opened_by_me` | boolean | 当前账号是否已经领取过 |

### snatch_info（SnatchInfo） {#snatch-info}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `uin` | string | 领取者 QQ 号 |
| `pet_id` | string | 领取者宠物 ID |
| `timestamp` | string | 领取时间戳，秒，十进制整数字符串 |
| `coins` | string | 本次领取金币数，十进制整数字符串 |
| `is_owner` | boolean | 是否为福袋主人领取 |
| `nickname` | string | 领取者展示昵称 |
| `field_7` | string | 保留字段，含义尚未确认 |
| `field_8` | string | 保留的展示文案字段 |
| `field_9` | string | 保留的头像展示字段 |
| `level` | number | 宠物等级 |

### page（CoinBagPage） {#page}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `coins` | string | 当前账号领取金币的展示数值，十进制整数字符串 |
| `message` | string | 服务端展示文案 |
| `status` | number | 详情页状态值，与 `coin_bag.status` 属于不同枚举；含义尚未完整确认 |
| `can_share` | boolean | 是否允许分享福袋 |
| `message_tips` | string | 服务端提示文案 |

## 使用流程

1. 调用 `qqpet_get_numeric_metrics`，传目标宠物的 `pet_id` 和 `msg_types: [14]`。
2. 读取 `msg_type = 14` 项的 `coin_bag`。没有该项、ID 为空或已经过期时，本次没有可用福袋。
3. 使用福袋 ID 调用本接口查看详情；已领取、已收走或过期时不要再次领取。
4. 调用 [qqpet_snatch_coin_bag](./qqpet_snatch_coin_bag.md) 领取，以服务端返回结果为准。

## 使用说明

领取结果尚未经过在线验证。
