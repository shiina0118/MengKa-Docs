# sdk_auth_api

使用当前在线 Bot 为第三方应用请求 SDK 授权，可选择 `token` 或 `code` 授权类型。目前仅支持 Android 账号。

## 调用

示例中的 `client_id` 需替换为目标第三方应用的 AppID。签名、权限和其他应用参数按该应用的接入要求填写。

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "sdk_auth_api",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "client_id": 1234567890,
    "response_type": "token"
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/sdk_auth_api' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "client_id": 1234567890,
  "response_type": "token"
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `self_id` | number | 是 | - | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | - | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `client_id` | number | 是 | - | 第三方应用 AppID，必须为正整数 |
| `response_type` | string | 否 | `token` | 授权类型，只支持 `token` 或 `code` |
| `openapi` | number[] | 否 | `[]` | 申请的权限编号列表，各项为无符号 32 位整数 |
| `pf` | string | 否 | `openmobile_android` | 第三方应用的平台参数 |
| `need_pay` | number | 否 | `1` | 支付相关标志，只支持 `0` 或 `1` |
| `sign` | string | 否 | - | 第三方 SDK 请求签名，按目标应用要求提供 |
| `sdkv` | string | 否 | `1.5.9` | 第三方 SDK 版本 |
| `sdkp` | string | 否 | `android` | 第三方 SDK 平台标识 |
| `time` | number | 否 | `0` | SDK 时间参数，不能为负数；需要时由调用方提供，`0` 时不发送此字段 |
| `pass_data` | string | 否 | - | 应用透传数据 |
| `app_unique_identifier` | string | 否 | - | 应用唯一标识，按目标应用要求提供 |
| `referer` | number | 否 | `1` | 请求来源标志，支持 `1` 或 `4`；传 `0` 时按 `1` 处理 |
| `vid` | number | 否 | `0` | 应用请求中的 VID，`0` 时不发送此字段 |
| `url_encoded_data` | string | 否 | `support_110537=1&login_type=0` | URL 编码格式的附加请求参数 |
| `auth_type` | number | 否 | `0` | 授权方式标志，只支持 `0` 或 `1` |

QQ 协议版本和 Android 系统版本由后端从目标账号配置中读取，无需传入。可选字符串字段传空字符串时，使用表中默认值；没有默认值的字段不发送。

## 返回值

成功收到授权结果时，`data` 示例：

```js
{
  ret: 0,
  msg: '',
  access_token: 'ACCESS_TOKEN',
  expires_in: 7776000,
  openid: 'OPENID',
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `ret` | number | QQ 返回的业务结果码，`0` 表示授权成功；非 `0` 时结合 `msg` 处理 |
| `msg` | string | QQ 返回的结果消息 |
| `access_token` | string | QQ 返回的授权凭据，具体内容取决于授权类型和服务端响应 |
| `expires_in` | number | QQ 返回的凭据有效期，单位为秒 |
| `openid` | string | 当前账号在目标应用中的 OpenID |
| `pay_token` | string | 支付凭据，有值时出现 |
| `encrytoken` | string | 加密凭据，有值时出现 |
| `pf` | string | 服务端返回的平台参数，有值时出现 |
| `pfkey` | string | 平台密钥，有值时出现 |
| `encrykey` | string | 加密密钥，有值时出现 |
| `md5key` | string | MD5 密钥，有值时出现 |
| `sendinstall` | number | 安装相关标志，非 `0` 时出现 |
| `installwording` | string | 安装提示文案，有值时出现 |
| `pass_data_resp` | object[] | 返回的透传数据，每项包含字符串字段 `key` 和 `value`，非空时出现 |
| `sign_qqkey` | string | QQ 签名密钥，有值时出现 |
| `md5_qqkey` | string | QQ MD5 密钥，有值时出现 |
| `callback_url` | string | 授权回调地址，有值时出现 |
| `universal_link` | string | Universal Link 地址，有值时出现 |
| `pause_duration` | number | 服务端返回的暂停时长字段，非 `0` 时出现 |

## 失败处理

需要同时检查接口外层的 `ok` 和授权结果中的 `ret`：

- 参数无效、账号未在线、账号平台不支持、SSO 请求失败或回包格式无效时，返回 `ok: false`，`error` 为失败原因。
- QQ 正常返回业务拒绝结果时，外层仍为 `ok: true`，`data.ret` 为非 `0`，`data.msg` 为业务失败说明；此时不能将返回结果视为授权成功。
