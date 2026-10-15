# get_login_qr

获取扫码登录二维码。账号不存在时会按传入的客户端配置和设备配置创建账号。

这不是密码登录过程中的安全验证二维码。安全验证请用 [`get_security_verify_qr`](/api/get_security_verify_qr)。`add_account` 只用于密码登录账号；扫码登录账号通过本接口创建。

## 调用

```js
const result = await api.get_login_qr(
  self_id,
  platform,
  client_profile_id,
  device_profile_id,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 5 到 10 位 QQ 号 |
| `platform` | string | 是 | 扫码登录平台，如 `linux`。`windows` 暂未支持 |
| `client_profile_id` | number | 是 | `get_client_profile_list` 返回的客户端配置记录的 `id`，须与 `platform` 匹配 |
| `device_profile_id` | number | 是 | `get_device_profile_list` 返回的设备配置记录 ID |

账号已存在且属于当前节点时，仍须传入 `client_profile_id` 和 `device_profile_id`，但不会改写已有配置。账号已登录时会失败。

## 返回值

常用字段：

```js
{
  code: 0,
  message: '二维码生成成功',
  url: 'https://...',
  created: true,
}
```

| 字段 | 说明 |
| --- | --- |
| `url` | 二维码内容，渲染后用手机 QQ 扫描 |
| `created` | 本次是否新建了账号 |

将 `url` 渲染成二维码后，轮询 [`query_login_qr`](/api/query_login_qr)。完整流程见[Bot 登录流程](/guide/login-flow)。
