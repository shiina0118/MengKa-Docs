# get_group_share_link

获取普通群资料页中“复制链接”对应的分享链接。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "get_group_share_link",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `group_id` | number | 是 | 目标群号，必须为大于 `0` 的整数，直接传数字即可 |

## 返回值

以下为响应 `data` 的字段。`ok: true` 表示已取得并解析服务端响应，仍需检查 `success` 判断是否取得链接。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 成功取得非空链接时为 `true` |
| `url` | string | 服务端返回的群分享链接，失败时省略 |
| `error_code` | number | 请求错误码，成功时为 `0` |
| `business_code` | number | 服务端业务错误码，成功时为 `0`；外层失败时未读取业务结果，此字段也为 `0` |
| `error_message` | string | 失败说明，空字符串时省略 |

成功时的 `data` 示例，链接仅作格式演示：

```json
{
  "success": true,
  "url": "https://qm.qq.com/q/EXAMPLE",
  "error_code": 0,
  "business_code": 0
}
```

服务端拒绝请求或业务处理失败时，外层为 `ok: true`，但 `data.success` 为 `false`，具体原因见错误码和 `error_message`。

参数无效、Bot 未在线、请求失败或响应无法解析（包括缺少链接）时，返回 `ok: false`，`error` 包含原因。

接口仅获取分享链接，不会申请入群。链接内容、有效性及分享权限由 QQ 服务端决定。
