## 扫码登录结果（QRLoginResult） {#qr-login-result}

`login_account` 获取登录二维码和 `query_login_qr` 查询扫码状态都返回此结构。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `code` | number | `0` 表示请求成功；扫码进度看 `state` |
| `message` | string | 结果说明；查询时为当前状态的说明，如“等待扫码” |
| `command` | number | 本次操作标识：`49` 为获取二维码，`18` 为查询状态 |
| `ret_code` | number | 操作结果码；获取二维码成功时为 `0` 或 `2`，查询时为与 `state` 对应的状态码 |
| `url` | string | 二维码内容，渲染后用手机 QQ 扫描；仅获取二维码时有值，查询时为空字符串 |
| `qr_sig` | string | 二维码签名，十六进制字符串；仅获取二维码时有值，查询时为空字符串 |
| `self_id` | number | 扫码确认的账号 QQ 号，尚未取得时为 `0` |
| `state` | string | 扫码状态，仅查询时出现，取值见下表 |
| `login_complete` | boolean | 扫码确认且登录成功时为 `true`，其他情况省略 |
| `next` | string | 登录完成前为 `qr`，登录成功后为 `done`，完成登录失败时为 `failed` |

| `state` | `ret_code` | 说明 |
| --- | --- | --- |
| `waiting_for_scan` | `48` | 等待扫码 |
| `waiting_for_confirm` | `53` | 已扫码，等待确认 |
| `confirmed` | `0` | 已确认；成功时带 `login_complete: true` |
| `code_expired` | `17` | 二维码已失效，再次调用 `login_account` 获取新二维码 |
| `canceled` | `54` | 已取消扫码 |
| `invalid` | `144` | 二维码无效 |
