# get_bot_list

获取当前插件服务绑定节点下的 Bot 列表。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const bots = await api.get_bot_list()
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_bot_list' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{}'
```

</template>
</ApiCallTabs>

## 参数

无。

## 返回值

返回账号数组。常用字段：

| 字段 | 说明 |
| --- | --- |
| `self_id` | Bot QQ 号 |
| `platform` | 账号平台：`linux` 或 `android` |
| `client_profile_id` | 当前客户端配置 ID |
| `device_profile_id` | 当前设备配置 ID |
| `nickname` | Bot 昵称 |
| `status` | `0` 离线、`1` 在线、`2` 登录中 |
| `received`, `sent` | 运行期收发消息计数 |

只返回当前节点的账号。
