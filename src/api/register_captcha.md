# register_captcha

为当前等待滑块验证的账号注册验证页面。用户完成验证后，通过 [`captcha_heartbeat`](/api/captcha_heartbeat) 获取结果。

反向 WS 调用前，需在萌卡服务端设置 `MENGKA_PUBLIC_URL`，详见[滑块页面地址配置](/guide/reverse-websocket#滑块页面地址配置)。缺少有效地址时注册会返回错误，不会返回相对路径。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "register_captcha",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "slider_url": "登录结果中的 slider_url"
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/register_captcha' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{"self_id":123456789,"protocol_id":0,"slider_url":"登录结果中的 slider_url"}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在登录的 QQ 号 |
| `protocol_id` | number | 是 | 当前账号的协议 ID，允许为 `0` |
| `slider_url` | string | 是 | 当前登录结果返回的原始滑块地址 |

## 返回值

```json
{
  "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "captcha_url": "https://bot.example.com/openapi/captcha/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `uuid` | string | 查询结果时使用的标识 |
| `captcha_url` | string | 可直接打开或嵌入 iframe 的验证页面地址 |

页面会自动提交验证结果，插件无需监听页面消息。注册和查询须使用同一插件服务。
