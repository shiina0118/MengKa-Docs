# QQ 会员福利签到

`qqvip_welfare_sign`：为当前 Bot 执行一次 QQ 会员首页“福利签到”，返回签到结果和实际奖励。仅支持 `android` 账号。

只执行普通签到，**不会使用补签卡、重新开始周期、开通会员或自动续费**。奖励资格和数量由服务端确认，不保证每天固定获得 30 成长值。

## 调用流程

1. 先调用 [qqvip_get_welfare_sign_state](./qqvip_get_welfare_sign_state)，检查总体状态及今天的记录。
2. 确认今天尚未签到后，调用本接口一次。
3. 检查 `response.success` 和 `response.result`，成功时按 `response.rewards[]` 展示实际奖励。
4. 再查询签到状态，确认周期进度。不要只根据动画、固定奖励文案或接口调用完成就认定已领取。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "qqvip_welfare_sign",
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

无需其他业务参数。只操作所选账号自身的会员首页普通签到，不接受指定奖励数量、其他签到入口、补签或重开周期参数。

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次签到的业务结果 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 仅 `result = 0` 时为 `true`；“已经签到”不是本次新增签到成功 |
| `result` | number | 签到结果，见下表 |
| `current_day` | number | 当前周期天数 |
| `rewards` | [WelfareReward[]](#welfare-reward) | 服务端返回的实际奖励；无内容时为 `[]`，不要自行补上默认奖励 |
| `card_num` | number | 返回的补签卡数量 |
| `card_granted` | boolean | 本次是否发放补签卡；不表示已经使用补签卡 |
| `missed_days` | number | 返回的漏签天数 |
| `can_guide_auto_pay` | boolean | 是否可展示自动续费引导；只是状态信息，不会自动开通或续费 |

正常返回时，上述数值字段均保留，未提供时为 `0`；`card_granted` 和 `can_guide_auto_pay` 始终返回，未提供时为 `false`。`success` 始终返回，并按 `result == 0` 计算。

| `result` | 含义 | 建议处理 |
| --- | --- | --- |
| `0` | 签到成功 | 展示实际奖励，刷新状态 |
| `1` | 今天已经签到 | 不重复计奖，刷新状态 |
| `2` | 已断签 | 停止普通签到，不自动补签或重开周期 |
| `-1` | 签到失败 | 查询状态并确认资格，不循环重试 |

未知结果值会原样返回，`success` 为 `false`。接口请求正常返回不等于签到成功，必须检查上述业务结果。

<!--@include: ../../snippets/qqvip/welfare_reward.md-->

## 限制与错误处理

- 缺少或填写错误的账号、协议标识，传入不支持的参数，账号离线、非 Android 账号及服务端拒绝时，调用会报错。
- 接口不自动重试，不自动改用其他操作；也不会代替调用方定时签到。
- 超时、断线或响应无法确认时，签到可能已经发生。应先查询状态，再决定是否再次操作，不要立即重复提交。
- 奖励列表、会员资格和活动状态以服务端处理为准，不把空列表解释为固定奖励已经到账。
