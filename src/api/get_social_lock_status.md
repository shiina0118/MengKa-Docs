# get_social_lock_status

查询当前在线 Bot 账号是否被限制社交。支持 Android 和 PC 账号，每次调用查询当前状态。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "get_social_lock_status",
  "params": {
    "self_id": 1577159758,
    "protocol_id": 0
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_social_lock_status' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{"self_id":1577159758,"protocol_id":0}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 当前节点下的在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 与 `self_id` 共同定位实例，允许为 `0` |

只能查询所选 Bot 账号自身的状态，无需传入目标 QQ 号。

## 返回值

成功响应中的 `data`：

```json
{
  "is_locked": false,
  "rsp_code": 0
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `is_locked` | boolean | `true` 表示被限制社交，`false` 表示未被限制社交 |
| `rsp_code` | number | 服务端返回的社交限制类型原值；具体取值含义暂未明确 |

以 `is_locked` 判断是否被限制，保留 `rsp_code` 供排查使用。查询失败不代表账号未被限制。

账号未在线、不属于当前节点、查询超时或响应无法解析时，沿用统一的 `ok: false`、`error` 响应。
