# get_group_join_info

查询尚未加入的群的入群方式和验证问题。取得结果后，可调用 [`join_group`](/api/join_group) 申请入群。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "get_group_join_info",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_group_join_info' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "group_id": 987654321
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `group_id` | number | 是 | 要查询的群号，必须大于 `0` |

## 返回值

以下为响应 `data` 的字段。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 查询成功时为 `true` |
| `error_code` | number | 查询成功时为 `0` |
| `error_message` | string | 服务端返回的说明，空字符串时省略 |
| `group_id` | number | 查询的群号 |
| `group_option` | number | 入群方式，见[入群方式](#group-option)；申请时原样传给 `join_group` |
| `group_question` | string | 入群验证问题，没有问题或未返回时为空字符串 |
| `group_answer` | string | 服务端返回的答案字段，通常为空；不能依赖此字段取得验证答案 |
| `app_privilege_flag` | number | 服务端原始权限标记，未返回时为 `0` |
| `group_flag_ext` | number | 服务端原始群扩展标记，未返回时为 `0` |
| `group_flag_ext3` | number | 服务端原始群扩展标记 3，未返回时为 `0` |

查询失败时返回 `ok: false`，`error` 包含原因，不返回上述 `data`。

### 入群方式 {#group-option}

| `group_option` | 含义 | 后续申请 |
| --- | --- | --- |
| `1` | 允许直接加入 | 可直接调用 `join_group`，`apply_msg` 可省略 |
| `2` | 需要管理员审核 | 可在 `apply_msg` 中填写申请理由，也可省略 |
| `3` | 不允许申请加入 | `join_group` 会直接报错，不发送申请 |
| `4` | 正确回答问题后立即加入 | 将问题答案原样填写到 `apply_msg`，不能为空 |
| `5` | 回答问题后由管理员审核 | 将问题答案原样填写到 `apply_msg`，不能为空 |

查询仅取得入群设置，不会提交申请，也不保证群有空位。实际申请结果以 [`join_group`](/api/join_group#返回值) 的返回值为准。
