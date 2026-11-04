# 查询宠物状态

`qqpet_get_pet_status`：查询一只宠物当前是否外出、在做什么、进度如何，以及是否正被别人雇佣。自己和他人的宠物都可以查询，调用方式相同。仅支持 `android` 账号。

## 调用流程

1. 取得要查询的宠物 ID。查询 Bot 自己的宠物时，调用 [qqpet_get_user_pet](./qqpet_get_user_pet)，使用返回的 `response.pet.field_101`（与 `response.pet.profile.field_8` 相同）。
2. 调用本接口，传入该宠物 ID。
3. 根据 `activity` 判断宠物在做什么，根据 `hire_role` 和 `partner` 判断雇佣关系，根据时间字段计算进度。

宠物 ID 须原样传入，不要自行构造。`response.pet.field_1` 不是宠物 ID，传入它不会报错，但只能查到空闲状态。

## 调用

示例中的 `PET_ID` 须替换为实际的宠物 ID。

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_pet_status",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "pet_id": "PET_ID"
    }
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号，用于发起查询；不要求是宠物的主人 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | [Request](#request) | 是 | 要查询的宠物 |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `pet_id` | string | 是 | 宠物 ID，不能为空 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 发起查询的 Bot QQ 号 |
| `pet_id` | string | 本次查询的宠物 ID |
| `activity` | string | 宠物当前在做什么，取值见[活动类型](#activity) |
| `status_code` | number | 宠物当前状态的原始取值；空闲时为 `0` |
| `outdoor` | boolean | 是否外出中；`activity` 不为 `idle` 时为 `true` |
| `hired` | boolean | 是否正被别人雇佣，等同于 `hire_role` 为 `hired` |
| `hire_role` | string | 宠物在雇佣关系中的角色，取值见[雇佣角色](#hire-role) |
| `story_id` | string | 本次外出的标识；未外出时为 `""` |
| `left_seconds` | number | 查询时剩余的秒数；未外出时为 `0` |
| `total_seconds` | number | 本次外出的总时长（秒）；未外出时为 `0` |
| `start_time` | number | 本次外出的开始时间，Unix 时间戳（秒）；未外出时为 `0` |
| `partner` | [HirePartner](#hire-partner) \| null | 雇佣关系中的另一方；不在雇佣关系中时为 `null` |

### 活动类型 {#activity}

| `activity` | `status_code` | 说明 |
| --- | --- | --- |
| `idle` | `0` | 空闲，未外出 |
| `work` | `51` | 打工 |
| `study` | `2` | 学习 |
| `adventure` | `101` | 冒险 |
| `unknown` | 其他值 | 外出中，但类型未识别；`status_code` 保留原始取值 |

### 雇佣角色 {#hire-role}

雇佣只发生在打工中，其他活动的 `hire_role` 均为 `""`，`partner` 为 `null`。

| `hire_role` | 说明 | `partner` |
| --- | --- | --- |
| `hired` | 这只宠物正被别人雇佣打工 | 雇主 |
| `employer` | 这只宠物的主人雇了别人的宠物一起打工 | 被雇佣的一方 |
| `""` | 不在雇佣关系中 | `null` |

### HirePartner {#hire-partner}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `pet_id` | string | 对方宠物的 ID，可直接用于再次调用本接口 |
| `uin` | string | 对方宠物主人的 QQ 号，使用十进制字符串 |
| `pet_avatar` | string | 对方宠物的头像地址 |
| `user_avatar` | string | 对方宠物主人的 QQ 头像地址 |
| `pet_nick` | string | 对方宠物的名称 |
| `user_nick` | string | 对方宠物主人的昵称 |

### 返回示例

被别人雇佣、正在打工的宠物（数值和地址以实际返回为准）：

```json
{
  "self_id": 123456789,
  "pet_id": "PET_ID",
  "activity": "work",
  "status_code": 51,
  "outdoor": true,
  "hired": true,
  "hire_role": "hired",
  "story_id": "STORY_ID",
  "left_seconds": 190,
  "total_seconds": 600,
  "start_time": 1793759201,
  "partner": {
    "pet_id": "EMPLOYER_PET_ID",
    "uin": "10001",
    "pet_avatar": "https://example.com/pet.png",
    "user_avatar": "https://example.com/user.png",
    "pet_nick": "雇主的宠物",
    "user_nick": "雇主昵称"
  }
}
```

正在学习的宠物：

```json
{
  "self_id": 123456789,
  "pet_id": "PET_ID",
  "activity": "study",
  "status_code": 2,
  "outdoor": true,
  "hired": false,
  "hire_role": "",
  "story_id": "STORY_ID",
  "left_seconds": 5322,
  "total_seconds": 8100,
  "start_time": 1793756846,
  "partner": null
}
```

## 计算进度

- 进度：`(total_seconds - left_seconds) / total_seconds`。
- 结束时间：`start_time + total_seconds`。
- `left_seconds` 是查询时刻的剩余时间。做倒计时时，建议用结束时间与当前时间计算，无需反复查询。

剩余时间归零后，活动需要结算才能领取结果；也可以在归零前提前召回宠物。结算和召回都使用 [qqpet_do_after_story_info](./qqpet_do_after_story_info)，并传入本接口返回的 `story_id`。本接口只查询状态，不会结算或召回。

## 使用限制与错误处理

- 缺少或传入空白 `pet_id` 会返回参数错误。
- 传入不存在的宠物 ID 不会报错，会返回空闲状态（`activity` 为 `idle`，时间字段均为 `0`）。本接口无法据此区分“宠物空闲”和“宠物 ID 无效”，请确保宠物 ID 来自上述接口。
- 返回的是查询时刻的状态。宠物外出、结束或雇佣关系变化后，需要重新查询。
- 本接口是只读查询，不会改变宠物状态。请求失败或超时不会自动重试。
