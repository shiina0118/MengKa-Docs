# get_bot_info

获取当前插件服务绑定节点下指定 Bot 的运行信息。账号可以处于离线、登录中或在线状态。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const bot = await api.get_bot_info(self_id, platform)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_bot_info' \
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
| `self_id` | number | 是 | 当前节点下的 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |

## 返回值

```js
{
  self_id: 123456789,
  platform: 'android',
  client_profile_id: 0,
  device_profile_id: 1,
  nickname: '示例账号',
  status: 1,
  login_time: 1710000000,
  online_time: 3600,
  level: 42,
  friend_count: 100,
  group_count: 20,
  received: 1234,
  sent: 567,
  extra_info: '',
}
```

`status`：`0` 离线、`1` 在线、`2` 登录中。
