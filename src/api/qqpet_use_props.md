# 使用宠物活动道具

`qqpet_use_props`：在当前学习或打工活动中消耗已拥有的道具，返回剩余库存及活动增益提示。仅支持 `android` 账号。

**此操作会消耗道具，不会自动购买。** 购买请使用 [qqpet_place_order](./qqpet_place_order)。

## 调用流程

1. 从活动启动结果或 [qqpet_get_story_info](./qqpet_get_story_info) 获取当前正在进行的 `story_id`。必须与 `pet_id` 对应，不能使用已结束或上一次活动的 ID。
2. 调用 [qqpet_get_story_process](./qqpet_get_story_process)，传入该宠物和活动 ID，`outdoor_version` 使用 `2`。
3. 检查 `store_items[]` 的 `enabled`、`total_use_limit`，以及道具的 `usable`、`use_limit`、`used_count` 和库存数量。`item_id` 取自该道具或 [商品目录](./qqpet_get_prop_catalog)；学习类别为 `"356"`，打工为 `"357"`。
4. 为本次操作生成新的 `request_id`，提交所选道具及数量。
5. 按 `response.stocks[]` 中的 `app_id`、`item_id` 更新剩余库存；展示非空的 `toast_words` 和增益提示。需要刷新完整活动状态时，再查询活动过程。

不要把本地减数或动画当作使用成功。接口不会自动重试；超时或连接中断时结果可能不确定，应先重新查询库存和本次活动已使用数量，再决定是否再次操作。`request_id` 不构成可安全重试的保证。

## 调用

以下 `PET_ID`、`STORY_ID`、`ITEM_ID` 都须替换；`ITEM_ID` 必须是实际返回的正整数 ID。示例表示使用一个打工道具，调用时还须替换为本次新生成的 `request_id`。

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_use_props",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "pet_id": "PET_ID",
      "story_id": "STORY_ID",
      "app_id": "357",
      "items": [
        {
          "app_id": "357",
          "item_id": "ITEM_ID",
          "count": "1"
        }
      ],
      "request_id": "1794873600000_482917"
    }
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | [Request](#request) | 是 | 本次消耗的宠物、活动及道具 |
| `transport` | string | 否 | 默认 `oidb`，仅支持该值 |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `pet_id` | string | 是 | 当前宠物 ID，不能为空 |
| `story_id` | string | 是 | 该宠物当前活动的 ID，不能为空，原样传递 |
| `app_id` | string | 是 | 道具类别；`"356"` 学习、`"357"` 打工 |
| `items` | [ConsumeItem[]](#consume-item) | 是 | 非空数组，同一 `item_id` 只能出现一次；多个数量合并到 `count` |
| `request_id` | string | 是 | 本次操作的非空流水标识；按“当前毫秒时间戳_随机整数”生成，每次新的操作使用新值，不要复用文档示例 |

### request.items[]（ConsumeItem） {#consume-item}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `app_id` | string | 是 | 必须与 `request.app_id` 一致 |
| `item_id` | string | 是 | 本次选择的实际道具 ID |
| `count` | string | 是 | 本次消耗数量，不是购买数量或剩余库存 |

`app_id`、`item_id`、`count` 均须为正 uint64 十进制整数字符串，也接受 JSON 整数。建议使用字符串，避免精度丢失。不得超过服务端当前库存、单道具上限或活动总上限；是否允许使用以服务端最终结果为准。

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次使用结果 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `stocks` | [PropStock[]](#prop-stock) | 服务端返回的剩余库存 |
| `end_info_extra_tip` | [PropRewardTip](#prop-reward-tip) | 增益提示，未返回时省略 |
| `used_items` | [UsedProp[]](#used-prop) | 本次活动已使用的道具；不是剩余库存，也不要直接当作本次扣减量 |
| `toast_words` | string[] | 回应文案；展示其中非空的内容 |

### 剩余库存（PropStock） {#prop-stock}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `app_id` | string | 道具类别，十进制整数字符串 |
| `item_id` | string | 道具 ID，十进制整数字符串 |
| `remaining_stock` | string | 服务端剩余库存，十进制整数字符串；`"0"` 表示用尽 |

`stocks` 未包含某道具时，其剩余量未知，不能当作零或自行减数后认定成功；请重新查询活动过程。空响应也不能单独作为消耗成功的依据。

<!--@include: ../../snippets/qqpet/prop_inventory.md-->

<!--@include: ../../snippets/qqpet/prop_goods.md-->

## 错误处理

- 缺少宠物、活动、流水标识或道具列表，ID/数量非法，类别不一致或道具 ID 重复时，会报参数错误，不发送使用操作。
- 账号离线、非 Android 账号、活动已结束、库存不足或达到使用限制时，调用可能失败；先刷新活动与库存，不要循环提交。
- 错误或超时不会触发自动购买、自动切换调用方式或自动重试。再次操作前应核对状态，避免重复消耗。
