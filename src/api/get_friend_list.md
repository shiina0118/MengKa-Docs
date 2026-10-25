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

修改备注使用 [`set_friend_remark`](/api/set_friend_remark)。
