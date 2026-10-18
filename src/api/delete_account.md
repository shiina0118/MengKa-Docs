# delete_account

删除当前插件所属节点下的离线账号。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const self_id = 123456789 // 要删除的 Bot QQ 号
const result = await api.delete_account(self_id, platform)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/delete_account' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android"
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 当前节点下的账号 QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |

账号必须处于离线状态。

## 返回值

以下 `code` / `msg` 是 WebSocket SDK 的封装结果。HTTP 成功返回 `{ "ok": true, "data": null }`；失败返回 `{ "ok": false, "error": "错误原因" }`。

```js
{ code: 0, msg: '账号删除成功' }
```

失败时返回 `{ code: 1, msg: '错误信息' }`。
