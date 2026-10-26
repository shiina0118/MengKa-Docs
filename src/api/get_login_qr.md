# get_login_qr

为当前节点下的 PC（Linux）账号获取登录二维码，发起扫码登录。已保存密码的 Linux 账号也可以选择此接口，无需删除密码。Android 协议不支持本接口。

账号须处于离线状态；若已在扫码登录中，可再次调用本接口换一张二维码。正在密码登录、等待其他验证或已上线时，应先离线再开始扫码登录。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "get_login_qr",
  "params": { "self_id": 123456789, "protocol_id": 2 }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 已添加的目标账号 QQ 号 |
| `protocol_id` | number | 是 | 目标 Linux 协议 ID，与 `self_id` 共同定位实例；填写 [`get_protocol_list`](/api/get_protocol_list) 返回的实际 Linux 协议 ID |

## 返回值

成功响应示例（仅列出主要字段）：

```json
{ "code": 0, "message": "二维码生成成功", "url": "https://...", "self_id": 0, "next": "qr" }
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `code` | number | `0` 表示获取成功，账号尚未上线 |
| `message` | string | 结果说明 |
| `next` | string | 获取成功时为 `qr`；因异常终止登录时为 `failed` |
| `url` | string | 二维码内容，渲染后让用户用手机 QQ 扫描 |
| `qr_sig` | string | 本次二维码签名，十六进制字符串；查询状态时无需传入 |
| `self_id` | number | 尚未扫码确认时为 `0`，不会替代请求中的目标账号标识 |
| `command` | number | 本接口返回 `49` |
| `ret_code` | number | 获取二维码成功时为 `0` 或 `2` |

之后继续用请求中的 `self_id` 和 `protocol_id` 轮询 [`query_login_qr`](/api/query_login_qr)，由该接口完成扫码确认后的登录。二维码失效、取消或无效时，可再次调用本接口获取新码。

参数、节点归属、协议或账号状态不符合要求时返回 `ok: false`。连接或取码异常时可能返回 `{ code, message, next: "failed" }`，不保证包含二维码字段。
