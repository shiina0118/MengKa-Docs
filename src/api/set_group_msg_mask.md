# set_group_msg_mask

设置当前账号在指定群聊中的消息接收方式（如正常通知、收进群助手、屏蔽群消息或接收但不通知）。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "set_group_msg_mask",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "mask": 2
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `group_id` | number | 是 | 群聊 ID，必须为大于 `0` 的整数 |
| `mask` | number | 是 | 群消息接收方式，见[接收方式](#mask)；允许取值 `0`–`4` |

省略 `mask` 或传入超出 `0`–`4` 范围的值会直接报错。各接收方式为单选互斥档位，每次调用仅修改当前账号在目标群聊中的接收方式；可通过 [`get_group_list`](/api/get_group_list) 查询各群当前的 `msg_mask`。

### 接收方式 {#mask}

| 取值 | 说明 |
| --- | --- |
| `0` | 未指定 |
| `1` | 正常通知（接收并提醒） |
| `2` | 收进群助手 |
| `3` | 屏蔽群消息 |
| `4` | 接收但不通知（免打扰） |

## 返回值

成功时外层为 `ok: true`，`data` 为：

```json
{
  "success": true
}
```

参数无效、Bot 未在线、账号不在目标群内或服务端拒绝时，返回 `ok: false`，`error` 包含原因。
