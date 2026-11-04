# qqmusic_refresh_ticket

使用之前保存的 QQ 音乐登录票据刷新票据，返回新的票据和 Cookie。目前仅支持 Android 账号。

票据来自 [qqmusic_login](/api/qqmusic_login) 或上一次刷新的返回值。刷新成功后，请用本次返回值覆盖保存的票据，下次刷新时传入最新值。

## 调用

示例中的票据需替换为实际保存的值。

```json
{
  "type": "action",
  "id": "1",
  "action": "qqmusic_refresh_ticket",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "musickey": "MUSICKEY",
    "refresh_key": "REFRESH_KEY",
    "openid": "OPENID",
    "access_token": "ACCESS_TOKEN"
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `self_id` | number | 是 | - | 在线 Bot QQ 号，须与票据所属账号一致 |
| `protocol_id` | number | 是 | - | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `musickey` | string | 是 | - | 最近一次登录或刷新返回的 `musickey` |
| `refresh_key` | string | 是 | - | 最近一次登录或刷新返回的 `refresh_key` |
| `openid` | string | 否 | - | 最近一次返回的 `openid` |
| `access_token` | string | 否 | - | 最近一次返回的 `access_token` |

票据均按返回值原样传入，不要自行构造或修改。

## 返回值

成功时 `data` 字段与 [qqmusic_login](/api/qqmusic_login#返回值) 相同，示例（凭据均为演示值）：

```js
{
  musicid: '123456789',
  musickey: 'MUSICKEY',
  musickey_create_time: 1730000000,
  key_expires_in: 259200,
  refresh_key: 'REFRESH_KEY',
  openid: 'OPENID',
  unionid: 'UNIONID',
  access_token: 'ACCESS_TOKEN',
  expired_at: 1735184000,
  encrypt_uin: 'ENCRYPT_UIN',
  login_type: 2,
  cookie: 'uin=o123456789; qqmusic_key=MUSICKEY; qm_keyst=MUSICKEY; ...'
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `musicid` | string | QQ 音乐账号 ID，与 Bot QQ 号一致 |
| `musickey` | string | QQ 音乐登录密钥，即 Cookie 中的 `qqmusic_key` / `qm_keyst`；刷新票据时作为 `musickey` 传入 |
| `musickey_create_time` | number | `musickey` 生成时间（Unix 秒），有值时出现 |
| `key_expires_in` | number | `musickey` 有效期（秒），有值时出现 |
| `refresh_key` | string | 刷新密钥；刷新票据时作为 `refresh_key` 传入 |
| `openid` | string | 当前账号在 QQ 音乐中的 OpenID；刷新票据时可作为 `openid` 传入 |
| `unionid` | string | UnionID，有值时出现 |
| `access_token` | string | QQ 授权访问凭据；刷新票据时可作为 `access_token` 传入 |
| `refresh_token` | string | QQ 授权刷新凭据，有值时出现 |
| `expired_at` | number | `access_token` 过期时间（Unix 秒），有值时出现 |
| `encrypt_uin` | string | 加密后的账号标识，有值时出现 |
| `login_type` | number | 登录类型，QQ 账号登录为 `2`，有值时出现 |
| `cookie` | string | QQ 音乐 Cookie，可直接作为请求头 `Cookie` 的值使用 |

## 失败处理

- 票据无效或已过期时，`error` 为 `刷新QQ音乐登录票据失败: 票据无效或已过期`，此时需调用 [qqmusic_login](/api/qqmusic_login) 重新获取票据。
- `musickey` 或 `refresh_key` 为空时直接返回参数错误。
- Bot 不在线或不是 Android 账号时返回失败结果，`error` 中说明原因。

返回的凭据可直接登录该账号的 QQ 音乐，请勿写入日志或转发给不可信方。
