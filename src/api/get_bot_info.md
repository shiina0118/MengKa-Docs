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
    qimei: '0123456789abcdef0123456789abcdef',
  },
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

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `protocol.id` | number | 协议 ID，对应请求参数 `protocol_id` |
| `protocol.platform` | string | 所属平台：`Android` 或 `PC` |
| `protocol.type` | string | 平台类型，如 `Phone`、`Pad`、`Linux` |
| `protocol.version` | string | 协议版本 |
| `device.id` | number | 设备配置 ID，对应请求参数 `device_profile_id` |
| `device.name` | string | 设备配置名称 |
| `device.brand` | string | 品牌 |
| `device.model` | string | 型号 |
| `device.android_id` | string | Android ID |
| `device.guid` | string | GUID |
| `device.qimei` | string | QIMEI |
