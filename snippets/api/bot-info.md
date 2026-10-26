## Bot 信息（BotInfo） {#bot-info}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | Bot QQ 号 |
| `nt` | number | 登录模式：`1` 为 NT，`0` 为 WT；登录时使用对应模式的 API |
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
