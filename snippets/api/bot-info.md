## Bot 信息（BotInfo） {#bot-info}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | Bot QQ 号 |
| `protocol` | [BotProtocol](#bot-protocol) | 账号使用的协议 |
| `device` | [BotDevice](#bot-device) | 账号使用的设备配置 |
| `nickname` | string | 昵称 |
| `status` | number | `0` 离线、`1` 在线、`2` 登录中 |
| `login_time` | number | 最近一次登录成功的 Unix 秒时间戳，尚未登录时为 `0` |
| `online_time` | number | 最近一次上线的 Unix 秒时间戳，尚未上线时为 `0` |
| `level` | number | QQ 等级 |
| `friend_count` | number | 好友数量 |
| `group_count` | number | 群数量 |
| `received` | number | 收到的消息数量 |
| `sent` | number | 发送的消息数量 |
| `extra_info` | string | 运行状态附加说明，可能为空字符串 |

### protocol（BotProtocol） {#bot-protocol}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 协议 ID，对应请求参数 `protocol_id` |
| `platform` | string | 所属平台：`Android` 或 `PC` |
| `type` | string | 平台类型，如 `Phone`、`Pad`、`Linux` |
| `version` | string | 协议版本 |

### device（BotDevice） {#bot-device}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 设备配置 ID，对应请求参数 `device_profile_id` |
| `name` | string | 设备配置名称 |
| `brand` | string | 品牌 |
| `model` | string | 型号 |
| `android_id` | string | Android ID |
| `guid` | string | GUID |
| `qimei36` | string | 36 位 QIMEI，尚未获取时为空字符串 |
| `qimei16` | string | SDK 的 QIMEI16 字段，服务端可能返回 16 或 36 位，按原值与 QIMEI36 一起保存；尚未获取时为空字符串 |
| `qimeiUpdatedAt` | number | 最近一次成功获取并保存 QIMEI 的 Unix 毫秒时间戳，尚未获取时为 `0` |

QIMEI 会在登录前和后台自动维护。缺少 `qimei36` 时申请，已有号码在跨天或满 24 小时后携带旧号码对刷新；成功后一起更新两个号码和时间。失败时保留缓存并退避重试，在线账号后续请求会使用更新后的号码。
