# get_bot_info

获取当前插件服务绑定节点下指定 Bot 的运行信息。账号可以处于离线、登录中或在线状态。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "get_bot_info",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_bot_info' \
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
| `self_id` | number | 是 | 当前节点下的 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

## 返回值

```js
{
  self_id: 123456789,
  protocol: {
    id: 0,
    platform: 'Android',
    type: 'Phone',
    version: '9.3.75',
  },
  device: {
    id: 1,
    name: '示例设备',
    brand: 'Xiaomi',
    model: '2407FPN8EC',
    android_id: '0123456789abcdef',
    guid: '0123456789abcdef0123456789abcdef',
    qimei36: '112233445566778899001122334455667788',
    qimei16: '1122334455667788',
    qimeiUpdatedAt: 1710000000000,
  },
  nickname: '示例账号',
  status: 1,
  login_time: 1710000000,
  online_time: 1710000060,
  level: 42,
  friend_count: 100,
  group_count: 20,
  received: 1234,
  sent: 567,
  extra_info: '',
}
```

返回 [BotInfo](#bot-info) 对象。

<!--@include: ../../snippets/api/bot-info.md-->
