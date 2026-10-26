## 登录二维码状态（QRLoginResult） {#qr-login-result}

`query_login_qr` 返回以下结构。异常时可能仅包含 `code`、`message`、`next`，应展示错误并按 `next` 决定是否继续查询。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `code` | number | `0` 表示请求成功；扫码进度看 `state` |
| `message` | string | 结果说明；查询时为当前状态的说明，如“等待扫码” |
| `command` | number | 查询操作标识，为 `18` |
| `ret_code` | number | 与 `state` 对应的状态码，见下表 |
| `url` | string | 查询时为空字符串；二维码内容取自 [`get_login_qr`](/api/get_login_qr) |
| `qr_sig` | string | 查询时为空字符串，无需回传 |
| `self_id` | number | 扫码确认的账号 QQ 号，尚未取得时为 `0` |
| `state` | string | 扫码状态，取值见下表 |
| `login_complete` | boolean | 扫码确认且登录成功时为 `true`，其他情况省略 |
| `next` | string | 登录完成前为 `qr`，登录成功后为 `done`，完成登录失败时为 `failed` |

| `state` | `ret_code` | 说明 |
| --- | --- | --- |
| `waiting_for_scan` | `48` | 等待扫码 |
| `waiting_for_confirm` | `53` | 已扫码，等待确认 |
| `confirmed` | `0` | 已确认；成功时带 `login_complete: true` |
| `code_expired` | `17` | 二维码已失效，再次调用 `get_login_qr` 获取新二维码 |
| `canceled` | `54` | 已取消扫码 |
| `invalid` | `144` | 二维码无效 |
