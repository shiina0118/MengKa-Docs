# login_account

登录当前节点下的账号。与管理后台一致，按账号是否设置了密码选择登录方式：

- **有密码**：密码登录，Android 和 PC（Linux）协议都支持。账号必须处于离线状态。
- **无密码**：扫码登录，仅 PC（Linux）协议支持。返回二维码后轮询 [`query_login_qr`](/api/query_login_qr)。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "login_account",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/login_account' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 已用 [`add_account`](/api/add_account) 创建的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

## 返回值

### 密码登录

```json
{ "code": 140022008, "message": "需要滑块验证", "next": "slider", "slider_url": "https://..." }
```

结果中的 `next` 表示下一步，取值见[登录结果的 next 字段](/guide/login-flow#next)。按 `next` 分支即可，`code` 用于展示和排查。

验证状态可能额外包含 `slider_url`、`identity_url`、`security_url` 或 `security_verify`。

常见状态：

| `code` | `next` | 含义 |
| --- | --- | --- |
| `0` | `done` | 登录成功 |
| `140022008` | `slider` | 需要滑块验证 |
| `140022007` | `identity` | 需要身份验证 |
| `140022010` | `security` | 需要安全验证，查询<a class="security-method-link" href="../api/get_security_verify_methods">安全验证方式</a> |
| `140022013` | `failed` | 账号或密码错误 |

### 扫码登录

```json
{ "code": 0, "message": "二维码生成成功", "url": "https://...", "self_id": 0, "next": "qr" }
```

| 字段 | 说明 |
| --- | --- |
| `url` | 二维码内容，渲染后用手机 QQ 扫描 |
| `next` | 固定为 `qr`，随后轮询 [`query_login_qr`](/api/query_login_qr) |

二维码失效时，再次调用本接口会在当前登录会话内换一张新二维码，无需先离线。

无密码的 Android 账号不支持扫码登录，调用会返回 `ok: false`。

这不是密码登录过程中的安全验证二维码。安全验证请用 [`get_security_verify_qr`](/api/get_security_verify_qr)。

完整处理顺序见[Bot 登录流程](/guide/login-flow)。
