# get_friend_list

获取 Bot 的完整好友列表。Meng Ka 会自动完成分页。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "get_friend_list",
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

## 返回值

```js
{
  friends: [{
    user_id: 234567890,
    nickname: '示例好友',
    remark: '项目联系人',
    signature: '个性签名',
    custom_group: 0,
    mutual_marks: [{
      type: 1,
      level: 1,
      continue_days: 7,
      last_action_time: 1710003600,
      icon_status: 0,
      is_wearing: true,
    }],
  }],
  total_count: 1,
  self_id: 123456789,
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `friends` | [Friend[]](#friends) | 好友数组，没有好友时为 `[]` |
| `total_count` | number | 本次返回的好友数量 |
| `self_id` | number | 当前 Bot QQ 号 |

### friends[]（Friend） {#friends}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_id` | number | 好友 QQ 号，可作为其他好友 API 的目标账号参数 |
| `nickname` | string | 昵称 |
| `remark` | string | 好友备注，未设置时为空字符串 |
| `signature` | string | 个性签名，可能为空字符串 |
| `custom_group` | number | 好友分组标识 |
| `mutual_marks` | [FriendMutualMark[]](#mutual-marks) | 好友互动标识列表（如火花、亲密标识等）；该好友无已点亮互动标识时省略 |

### friends[].mutual_marks[]（FriendMutualMark） {#mutual-marks}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `type` | number | 互动标识类型编号 |
| `level` | number | 标识等级 |
| `sub_level` | number | 子等级，为 `0` 时省略 |
| `continue_days` | number | 连续互动天数 |
| `last_action_time` | number | 最近一次有效互动时间，Unix 秒；可结合当日时间（北京时间）判断今日是否已续上 |
| `icon_status` | number | 图标状态：`0` 正常点亮、`1` 已变灰/熄灭、`2` 即将变灰预警（结合 `icon_status_end_time` 判断） |
| `icon_status_end_time` | number | 图标状态截止时间，Unix 秒；为 `0` 时省略 |
| `light_up_time` | number | 点亮时间，Unix 秒；为 `0` 时省略 |
| `is_wearing` | boolean | 是否佩戴，未佩戴时省略 |
| `close_flag` | number | 关闭标记，为 `0` 时省略 |
| `mark_flag` | number | 标识扩展标记，为 `0` 时省略 |

修改备注使用 [`set_friend_remark`](/api/set_friend_remark)。
