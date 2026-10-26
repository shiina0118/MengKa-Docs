# ntlogin_login_account

对当前节点下配置为 NT 模式（`nt: 1`）的账号发起密码登录，支持 Android 和 PC（Linux）。账号必须已保存密码且处于离线状态。

未设置密码时返回 `ok: false`，不会自动切换为扫码登录。Linux 扫码登录使用 [`get_login_qr`](/api/get_login_qr)；WT 密码登录使用 [`wtlogin_login_account`](/api/wtlogin_login_account)。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "ntlogin_login_account",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 已用 [`add_account`](/api/add_account) 创建的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

## 返回值

```json
{ "code": 140022008, "message": "需要滑块验证", "next": "slider", "slider_url": "https://..." }
```

返回 [NT 登录结果](#login-result)。验证状态可能附带对应的验证地址。`next: "security"` 时，调用 [`ntlogin_get_security_verify_methods`](/api/ntlogin_get_security_verify_methods) 查询可用验证方式，再选择后续操作。

`next` 为 `slider` 时，可以使用原有方式完成滑块，也可以将 `slider_url` 传给 [`register_captcha`](/api/register_captcha)，打开返回的验证页面，通过 [`captcha_heartbeat`](/api/captcha_heartbeat) 获取结果后调用 [`ntlogin_submit_slider`](/api/ntlogin_submit_slider)。

完整处理顺序见[Bot 登录流程](/guide/login-flow)。

<!--@include: ../../snippets/api/login-result.md-->
