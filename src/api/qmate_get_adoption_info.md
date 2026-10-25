# qmate_get_adoption_info

查询与指定用户之间的聊天精灵合养邀请记录。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "qmate_get_adoption_info",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号协议 ID，与 self_id 共同定位实例；允许为 0 |
| `user_id` | number | 是 | 另一位合养用户的 QQ 号，必须大于 0，不接受 UID |

## 返回值

以下为响应 `data` 字段。`ok: true` 表示已取得并解析服务端响应，还需检查 `data.success`。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 请求成功时为 true；有额外业务结果的接口还需检查相应字段 |
| `error_code` | number | 请求结果码，成功时为 0 |
| `error_message` | string | 失败说明，空字符串时省略 |
| `adoptions` | object[] | 合养记录列表；无记录时为空数组 |

服务端拒绝请求时，外层为 `ok: true`，`data.success` 为 `false`。参数无效、Bot 未在线、请求失败、响应损坏时，返回 `ok: false`。


## adoptions 条目

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `qmate_type` | number | 精灵类型，接受邀请时使用此值 |
| `inviter_uin` | number | 发起邀请的 QQ 号 |
| `status` | number | 合养状态原值；1 表示邀请待处理 |

当 `status == 1` 时，`inviter_uin == user_id` 表示对方邀请了当前 Bot，可调用 [`qmate_accept_invite`](/api/qmate_accept_invite)；`inviter_uin == self_id` 表示当前 Bot 已发起邀请，等待对方接受。其他状态保留服务端原值。
