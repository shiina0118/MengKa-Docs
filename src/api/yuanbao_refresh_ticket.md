# yuanbao_refresh_ticket

使用之前保存的元宝登录票据刷新票据，返回新的票据。目前仅支持 Android 账号。

票据来自 [yuanbao_login](/api/yuanbao_login) 或上一次刷新的返回值。刷新成功后，请用本次返回值覆盖保存的票据，下次刷新时传入最新值。

## 调用

示例中的票据需替换为实际保存的值。

```json
{
  "type": "action",
  "id": "1",
  "action": "yuanbao_refresh_ticket",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "token": "TOKEN",
    "user_id": "USER_ID"
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `self_id` | number | 是 | - | 在线 Bot QQ 号，须与票据所属账号一致 |
| `protocol_id` | number | 是 | - | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `token` | string | 是 | - | 最近一次登录或刷新返回的 `token` |
| `user_id` | string | 是 | - | 最近一次登录或刷新返回的 `user_id` |

票据均按返回值原样传入，不要自行构造或修改。

## 返回值

成功时 `data` 字段与 [yuanbao_login](/api/yuanbao_login#返回值) 相同，示例（凭据均为演示值）：

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

- 票据无效或已过期时，`error` 为 `刷新元宝登录票据失败: 票据无效或已过期`，此时需调用 [yuanbao_login](/api/yuanbao_login) 重新获取票据。
- `token` 或 `user_id` 为空时直接返回参数错误。
- Bot 不在线或不是 Android 账号时返回失败结果，`error` 中说明原因。

返回的票据可直接登录该账号的元宝，请勿写入日志或转发给不可信方。
