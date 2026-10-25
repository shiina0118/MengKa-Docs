# get_group_list

获取 Bot 的完整群聊列表。Meng Ka 会自动完成分页。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "get_group_list",
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
  groups: [{
    group_id: 987654321,
    group_name: '示例群',
    group_remark: '',
    member_count: 50,
    max_member_count: 500,
    create_time: 1710000000,
    description: '交流群',
    question: '',
    announcement: '',
  }],
  total_count: 1,
  self_id: 123456789,
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `groups` | [Group[]](#groups) | 群数组，没有群时为 `[]` |
| `total_count` | number | 本次返回的群数量 |
| `self_id` | number | 当前 Bot QQ 号 |

### groups[]（Group） {#groups}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `group_id` | number | 群号 |
| `group_name` | string | 群名 |
| `group_remark` | string | 群备注 |
| `member_count`, `max_member_count` | number | 当前人数、人数上限 |
| `create_time` | number | 创建时间，Unix 秒 |
| `description` | string | 群介绍 |
| `question` | string | 入群问题 |
| `announcement` | string | 群公告 |

没有对应内容或未取得信息时，文本字段可能为空字符串，数字字段可能为 `0`。
