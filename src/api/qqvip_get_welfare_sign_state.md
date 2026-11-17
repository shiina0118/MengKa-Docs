# 查询 QQ 会员福利签到状态

`qqvip_get_welfare_sign_state`：查询当前 Bot 在 QQ 会员首页“福利签到”中的周期进度、每日奖励和补签卡数量。仅支持 `android` 账号。

本接口只查询，不签到、不领取奖励、不消耗补签卡，也不重新开始周期。执行普通签到使用 [qqvip_welfare_sign](./qqvip_welfare_sign)。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "qqvip_get_welfare_sign_state",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

无需其他业务参数。仅查询所选账号自身的会员首页福利签到，不支持指定其他账号、切换签到入口或传入其他操作。

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 签到状态 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `is_svip` | boolean | 服务端返回的超级会员状态 |
| `today` | number | 服务端当天日期值；具体表示格式暂未明确，不要假定为 Unix 时间戳 |
| `cycle_start` | number | 周期起始值；具体表示格式暂未明确 |
| `current_day` | number | 当前处于周期的第几天，不是日期 |
| `status` | number | 总体签到状态，见下表 |
| `days` | [SignDay[]](#sign-day) | 周期内每日的签到状态和奖励；无内容时为 `[]` |
| `card_num` | number | 补签卡数量；本接口不会使用补签卡 |
| `missed_days` | number | 漏签天数 |

正常返回时，`response` 和 `days[]` 记录中的数值字段均保留，未提供时为 `0`；`is_svip` 始终返回，未提供时为 `false`。

总体签到状态：

| `status` | 含义 |
| --- | --- |
| `0` | 可签到 |
| `1` | 已签到 |
| `2` | 已断签 |

### 每日记录（SignDay） {#sign-day}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `day` | number | 周期中的天数编号 |
| `field_2` | number | 含义暂未明确 |
| `status` | number | 该天状态，见下表 |
| `reward` | [WelfareReward](#welfare-reward) | 该天的奖励信息；未返回时省略 |

每日记录与总体状态使用不同取值：

| `days[].status` | 含义 |
| --- | --- |
| `0` | 未解锁 |
| `1` | 已签到 |
| `2` | 已补签 |
| `3` | 漏签 |
| `4` | 今天尚未签到 |

<!--@include: ../../snippets/qqvip/welfare_reward.md-->

## 调用建议与错误处理

1. 查询后结合 `current_day` 和对应 `days[]` 记录判断今天是否已签，不要将总体状态与每日状态混用。
2. 确认可签到后，调用 [qqvip_welfare_sign](./qqvip_welfare_sign) 一次，再重新查询状态。
3. 已签到或已断签时，不要循环执行普通签到；这两个接口均不提供补签或重开周期操作。

账号离线、非 Android 账号、账号或协议标识不匹配、参数格式错误以及服务端拒绝时，调用会报错。遇到未列出的状态值时保留其原值，不要直接视为可签到。空奖励列表不代表一定有奖励，也不代表查询失败。
