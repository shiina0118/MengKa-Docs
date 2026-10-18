# login_account

对当前节点下的离线账号发起密码登录。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const self_id = 123456789 // 要登录的 Bot QQ 号
const result = await api.login_account(self_id, platform)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/login_account' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android"
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 已创建且离线的 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |

## 返回值

```js
{ code: Number, message: String }
```

验证状态可能额外包含 `slider_url`、`identity_url`、`security_url` 或 `security_verify`。

常见状态：

| `code` | 含义 |
| --- | --- |
| `0` | 登录成功 |
| `140022008` | 需要滑块验证 |
| `140022007` | 需要身份验证 |
| `140022010` | 需要安全验证，查询<a class="security-method-link" href="../api/get_security_verify_methods">安全验证方式</a> |
| `140022013` | 账号或密码错误 |

完整处理顺序见[Bot 登录流程](/guide/login-flow)。
