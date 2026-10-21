# offline_account

取消账号正在进行的登录，或下线已登录账号。只能操作当前插件所属节点下的账号。

## 作用

| 账号状态 | 执行结果 |
| --- | --- |
| 登录中 | 取消当前登录流程，停止相关任务并断开连接 |
| 已登录 | 下线账号并断开连接 |
| 已离线 | 调用失败并返回“账号当前已离线” |

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "offline_account",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/offline_account' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 当前节点下的账号 QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

## 返回值

成功时 `data` 为 `null`：

```json
{ "type": "action_result", "id": "1", "ok": true, "data": null }
```

HTTP 成功返回 `{ "ok": true, "data": null }`。失败时 `action_result` 为 `ok: false`，`error` 为错误原因；HTTP 返回 `{ "ok": false, "error": "错误原因" }`。
