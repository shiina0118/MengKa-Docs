# captcha_heartbeat

查询已注册滑块的验证结果。仅在等待用户验证期间每隔 1～2 秒调用；无需依赖 WebSocket Ping/Pong。

## 调用


```json
{
  "type": "action",
  "id": "2",
  "action": "captcha_heartbeat",
  "params": { "uuid": "register_captcha 返回的 uuid" }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `uuid` | string | 是 | [`register_captcha`](/api/register_captcha) 返回的标识 |

## 返回值

等待验证：

```json
{ "status": "pending" }
```

结果已就绪：

```json
{ "status": "ready", "ticket": "TICKET", "randstr": "RANDSTR" }
```

验证已过期或不存在：

```json
{ "status": "expired" }
```

`ready` 时停止查询，使用 [`submit_slider`](/api/submit_slider) 提交结果，按其返回值继续处理登录。`expired` 时停止查询，重新获取验证页面。查询其他插件服务的会话会返回错误。
