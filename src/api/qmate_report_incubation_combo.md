# qmate_report_incubation_combo

上报聊天精灵孵化互动连击。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qmate_report_incubation_combo",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890,
    "delta": 1
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qmate_report_incubation_combo' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "user_id": 234567890,
  "delta": 1
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号协议 ID，与 self_id 共同定位实例；允许为 0 |
| `user_id` | number | 是 | 另一位合养用户的 QQ 号，必须大于 0，不接受 UID |
| `delta` | number | 是 | 本次连击增量，正 int32 整数 |
| `client_seq` | string | 否 | 本次上报序列标识；为空或省略时自动生成 |

## 返回值

以下为响应 `data` 字段。`ok: true` 表示已取得并解析服务端响应，还需检查 `data.success`。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 请求成功时为 true；有额外业务结果的接口还需检查相应字段 |
| `error_code` | number | 请求结果码，成功时为 0 |
| `error_message` | string | 失败说明，空字符串时省略 |
| `capped` | boolean | 是否达到服务端限制 |
| `progress_days` | number | 服务端返回的孵化进度天数，浮点数 |

服务端拒绝请求时，外层为 `ok: true`，`data.success` 为 `false`。参数无效、Bot 未在线、请求失败、响应损坏时，返回 `ok: false`。


先通过 [`qmate_get_info`](/api/qmate_get_info) 查询孵化状态。进度和上限由服务端决定，不保证每次上报都增加进度。`client_seq` 不保证重复调用只执行一次；结果不确定时，应先查询状态再决定是否重试。
