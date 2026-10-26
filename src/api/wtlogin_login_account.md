# wtlogin_login_account

发起 WT 密码登录。账号须配置为 `nt: 0`、使用 Android 协议、已保存密码且处于离线状态。NT 账号调用本接口会返回 `ok: false` 和模式不匹配提示。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "wtlogin_login_account",
  "params": { "self_id": 123456789, "protocol_id": 0 }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 已添加的账号 QQ 号 |
| `protocol_id` | number | 是 | 与 `self_id` 共同定位账号，允许为 `0` |

密码取自账号配置，不在登录请求中传入。添加账号时传 `nt: 0`，或在账号离线时用 [`update_account`](/api/update_account) 修改登录模式。

## 返回值

返回 [LoginResult](#login-result)，按 `next` 处理：

| `next` | 后续操作 |
| --- | --- |
| `done` | 已上线，可以调用 Bot 业务接口 |
| `slider` | 完成 `slider_url` 的验证后调用 [`wtlogin_submit_slider`](/api/wtlogin_submit_slider) |
| `security` | 调用 [`wtlogin_get_sms`](/api/wtlogin_get_sms) 下发短信，再用 [`wtlogin_check_sms`](/api/wtlogin_check_sms) 提交验证码 |
| `identity` | 依次调用 `submit_identity_captcha`、`submit_identity_phone`、`confirm_identity_sms`，见[身份验证流程](/guide/login-flow#插件通道身份验证) |
| `failed` | 根据 `message` 处理后重新发起登录 |

WT 响应中的 `login_method` 为 `wtlogin`，`wtlogin_code` 是此次登录的原始结果码。插件按公开的 `next` 决定下一步即可。

<!--@include: ../../snippets/api/login-result.md-->

<!--@include: ../../snippets/api/security-verify.md-->
