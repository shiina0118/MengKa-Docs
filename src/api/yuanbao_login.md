# yuanbao_login

使用当前在线 Bot 登录元宝，返回该账号的元宝登录票据。目前仅支持 Android 账号。

请自行保存返回的票据。需要刷新票据时调用 [yuanbao_refresh_ticket](/api/yuanbao_refresh_ticket)。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "yuanbao_login",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `self_id` | number | 是 | - | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | - | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

## 返回值

成功时 `data` 示例（凭据均为演示值）：

```js
{
  token: 'TOKEN',
  user_id: 'USER_ID',
  expire_at: 1735184000
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `token` | string | 元宝登录票据；刷新票据时作为 `token` 传入 |
| `user_id` | string | 元宝用户 ID；刷新票据时作为 `user_id` 传入 |
| `expire_at` | number | `token` 过期时间（Unix 秒），有值时出现 |

## 失败处理

- 元宝要求官方安全验证时，`error` 中附带验证链接，需在手机上打开完成验证后重新调用。
- 账号处于冷静期，或未注册元宝且要求绑定手机号时，无法自动登录，`error` 中说明原因。
- Bot 不在线或不是 Android 账号时返回失败结果，`error` 中说明原因。

返回的票据可直接登录该账号的元宝，请勿写入日志或转发给不可信方。
