# qqpet_get_story_process

获取宠物活动过程。仅支持 `android` 账号。

QQ 宠物 API 默认关闭。管理员须在后端 `data/config.yaml` 顶层设置 `qqpet: 1` 并重启后端；未配置或设置为 `0` 时，所有 QQ 宠物 API（含礼包领取）均不可调用。

读取活动过程文字、继续查询提示，以及学习或打工活动的可用道具、持有数量和已使用数量。此接口不执行鼓励、购买或消耗道具操作；根据返回提示控制查询间隔。

## 道具库存读取

1. 从活动启动结果或 [qqpet_get_story_info](./qqpet_get_story_info) 获取当前活动的 `story_id`，连同对应的 `pet_id` 查询；`outdoor_version` 使用 `2`。
2. 遍历 `response.store_items[].bag_items[]`。道具 ID 为 `bag_item.item_id`，拥有数量为 `bag_item.marketing_entries.ownership.quantity`。
3. 同时检查分组的 `enabled`、`total_use_limit` 和道具的 `usable`、`use_limit`、`used_count`。`used_count`、`used_items` 是本次活动已使用数量，不是剩余库存。
4. 商品价格、效果与实际商品 ID 可另查 [qqpet_get_prop_catalog](./qqpet_get_prop_catalog)；确认可用后，使用 [qqpet_use_props](./qqpet_use_props) 消耗道具。

持有对象缺少时，数量未知；`store_items` 为空也不代表账号没有任何道具。不要把价格或购买数量选择器当作库存。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_story_process",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "story_id": "STORY_ID",
      "pet_id": "PET_ID",
      "outdoor_version": 2
    }
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | [Request](#request) | 否 | 本次操作的参数，默认 `{}` |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `story_id` | string | 否 | 活动状态返回的任务 ID |
| `pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |
| `outdoor_version` | number | 否 | 户外功能版本；当前调用示例为2 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `process_info` | [ProcessInfo](#response-process-info) | 活动过程信息 |
| `need_next_request` | number | 是否需要继续获取过程；1表示需要 |
| `timeout` | string | 下次过程查询的等待时间，以返回值为准；十进制整数字符串 |
| `together_info` | [TogetherInfo](#response-together-info) | 一起活动的信息 |
| `event_type` | number | 活动类型：6100 学习、6400 工作、6700 冒险、6900 PK |
| `career_type` | number | 职业类型，使用职业树或总览返回的值 |
| `school_stage` | number | 学习阶段，使用活动总览返回的值 |
| `field_8` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_9` | boolean | 扩展数据，说明待补充 |
| `field_10` | [Field10](#response-field-10) | 扩展数据，说明待补充 |
| `field_11` | [Field10](#response-field-10) | 扩展数据，说明待补充 |
| `field_12` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_13` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_14` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `store_items` | [PropStore[]](#prop-store) | 本次活动的道具分组；未提供时为 `[]` |
| `end_info_extra_tip` | [PropRewardTip](#prop-reward-tip) | 活动增益提示，未返回时省略 |
| `used_items` | [UsedProp[]](#used-prop) | 本次活动已使用道具，不是剩余库存 |

### response.process_info（ProcessInfo） {#response-process-info}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `items` | [Item[]](#response-process-info-items) | 条目列表 |

### response.process_info.items[]（Item） {#response-process-info-items}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `time` | string | 条目时间值；十进制整数字符串 |
| `left_seconds` | number | 剩余秒数 |
| `content` | string | 过程文字 |

### response.together_info（TogetherInfo） {#response-together-info}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充 |

### response.field_10（Field10） {#response-field-10}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | [Field1](#response-field-10-field-1) | 扩展数据，说明待补充 |
| `field_2` | [Field2](#response-field-10-field-2) | 扩展数据，说明待补充 |
| `field_3` | number | 扩展数据，说明待补充 |
| `field_4` | number | 扩展数据，说明待补充 |

### response.field_10.field_1（Field1） {#response-field-10-field-1}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充 |
| `field_4` | string | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充 |
| `field_6` | string | 扩展数据，说明待补充 |

### response.field_10.field_2（Field2） {#response-field-10-field-2}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object[] | 扩展数据，含义暂未明确 |

### 活动道具分组（PropStore） {#prop-store}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `enabled` | boolean | 本分组道具功能是否启用 |
| `bag_items` | [OutdoorProp[]](#outdoor-prop) | 道具及可用状态 |
| `total_use_limit` | string | 活动总使用上限，十进制整数字符串；不要自行将 `0` 或负值解释为无限制 |

### 活动道具（OutdoorProp） {#outdoor-prop}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `bag_item` | [PropBagItem](#prop-bag-item) | 道具信息，未返回时省略 |
| `usable` | boolean | 当前是否允许使用；仍需同时检查库存与次数限制 |
| `unusable_reason` | number | 不可使用原因，具体枚举含义暂未明确 |
| `use_limit` | string | 本道具在当前活动中的使用上限，十进制整数字符串 |
| `used_count` | string | 本道具在当前活动中已使用数量，十进制整数字符串 |

本接口返回查询时的状态；与使用操作并发时可能发生变化，以服务端最终使用结果为准。不要根据 `usable` 单独认定一定能成功。

<!--@include: ../../snippets/qqpet/prop_inventory.md-->

<!--@include: ../../snippets/qqpet/prop_goods.md-->
