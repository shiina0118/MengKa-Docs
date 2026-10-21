# set_qq_avatar

设置当前 Bot 的头像。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "set_qq_avatar",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "file_path": "file:///D:/images/example.png"
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/set_qq_avatar' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "file_path": "file:///D:/images/example.png"
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `file_path` | string | 是 | 后端本地路径、`file://` 或后端可访问的 HTTP(S) 地址 |

图片大小上限为 5MB。建议使用 PNG 或 JPEG 图片。

::: warning 路径属于后端主机
插件和 Meng Ka 不在同一台主机时，插件本机路径对后端不可见。此时应提供后端可访问的 HTTP(S) 地址。
:::

## 返回值

```js
{ success: true }
```

QQ头像 CDN 可能存在短暂缓存，上传成功后旧头像仍可能显示一段时间。
