# qqpet_do_after_story_info

处理宠物故事后续：活动到期后结算，或提前召回正在打工、学习、冒险的宠物。仅支持 `android` 账号。

结算动态活动或PK时，使用真实的 `story_id`、`pet_id`，填写 `field_2: 6000` 和 `outdoor_version: 2`。首页流程仍可使用原有页面值。

## 调用流程

1. 调用 [qqpet_get_pet_status](./qqpet_get_pet_status) 查询自己宠物的当前状态，保存返回的 `story_id`。`activity` 为 `idle` 时宠物未外出，无需调用本接口。
2. 按用途填写 `field_4`：
   - 活动剩余时间归零后结算，填 `0`。
   - 剩余时间未归零、要提前召回宠物，填 `3`。
3. 调用本接口，`pet_id` 传入自己的宠物 ID，`story_id` 原样传入第 1 步的值。

只能处理当前 Bot 自己的宠物。雇佣打工时，雇主和被雇佣方的宠物使用同一个 `story_id`，任一方召回时都传入自己的宠物 ID 和这个 `story_id`。被雇佣方召回只结束自己这一方。

## 调用

到期结算：

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_do_after_story_info",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "story_id": "STORY_ID",
      "field_2": 6000,
      "pet_id": "PET_ID",
      "field_4": 0,
      "outdoor_version": 2
    }
  }
}
```

提前召回：

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_do_after_story_info",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "story_id": "STORY_ID",
      "field_2": 6000,
      "pet_id": "PET_ID",
      "field_4": 3,
      "outdoor_version": 2
    }
  }
}
```

示例中的 `STORY_ID` 和 `PET_ID` 须替换为实际值。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | [Request](#request) | 否 | 本次操作的参数，默认 `{}` |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `story_id` | string | 否 | 本次外出的标识，使用 [qqpet_get_pet_status](./qqpet_get_pet_status) 返回的 `story_id`，原样传入 |
| `field_2` | number | 否 | 页面场景；首页流程为1000，动态活动和PK为6000 |
| `pet_id` | string | 否 | 当前 Bot 自己的宠物 ID |
| `field_4` | number | 否 | 结算来源：`0` 为到期结算，`3` 为提前召回 |
| `outdoor_version` | number | 否 | 户外功能版本；动态活动与PK使用2 |

## 提前召回

`field_4` 为 `3` 时，宠物会提前结束当前的打工、学习或冒险。召回不可撤销，调用前请确认。

| 宠物当前状态 | 召回结果 |
| --- | --- |
| 被别人雇佣打工中（`hire_role` 为 `hired`） | 由宠物主人召回，按已工作的时长获得金币和雇佣加成；工作时间很短时基础工资可能为 0。只结束自己这一方，雇主的宠物继续打工 |
| 雇了别人的宠物一起打工（`hire_role` 为 `employer`），且被雇佣方已先被召回 | 按已工作的时长获得部分收益（基础工资、雇佣加成等），并获得被雇佣方提前离开留下的分成 |
| 雇了别人的宠物一起打工，双方都仍在打工 | 不返还体力，双方均无法获得奖励 |
| 自己打工 | 不返还体力，无法获得奖励 |
| 学习中 | 不返还体力和金币，无法获得奖励 |
| 冒险中 | 不返还金币，无法获得奖励 |

前两行为实测结果；其余各行为客户端在召回前给出的提示，实际结果以返回为准。

被雇佣方召回后，雇主宠物的状态中 `hire_role` 仍可能为 `employer`，`partner` 仍显示原来的被雇佣方，直到雇主这一方结束。

召回后可再次调用 [qqpet_get_pet_status](./qqpet_get_pet_status) 确认宠物已回到空闲状态。

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object | 扩展结果，含义暂未明确 |

## 使用限制与错误处理

- 请求失败或超时不会自动重试。超时不能证明操作未生效，请先调用 [qqpet_get_pet_status](./qqpet_get_pet_status) 确认宠物状态，再决定是否重新调用。
