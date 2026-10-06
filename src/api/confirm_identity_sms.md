# confirm_identity_sms

确认已用密保手机发送短信，完成身份验证。

## 前置条件

已调用 [`submit_identity_phone`](/api/submit_identity_phone) 拿到短信内容与目标号码，用户用密保手机按内容发送完成后调用本动作回查。

## 调用

```js
const result = await api.confirm_identity_sms(self_id, platform, mobile, area_code)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在登录的 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `mobile` | string | 是 | 同提交时使用的密保手机号 |
| `area_code` | string | 是 | 同提交时使用的区号 |

## 返回值

调用成功即服务端确认收到短信并完成身份验证（chksms + auth_diff_password），**身份验证这一关已通过**。返回服务端原始响应，其他字段按原始结构保留。

调用失败返回 `{ code, message }`（如短信尚未送达、发送内容不符），账号仍处登录挂起，可以用相同参数重试；发送后到腾讯侧确认可能有几秒到几十秒延迟。

注意：本动作只负责「通过身份验证」。验证通过后账号仍未上线，**重新发起密码登录完成上线由插件另行触发**（对账号管理面板而言，是验证通过后再执行一次密码登录）。验证会话会保持一段时间，逾期未完成登录会失效。

完整流程见[Bot 登录流程](/guide/login-flow)。
