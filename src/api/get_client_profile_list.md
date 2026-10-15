# get_client_profile_list

获取可用于创建或更新账号的客户端配置列表。

## 调用

```js
const clients = await api.get_client_profile_list()
const selected = clients.find(item => item.platform === platform)
if (!selected) throw new Error('没有适用于该平台的客户端配置')
const client_profile_id = selected.id
```

## 参数

无。

## 返回值

```js
[
  { id: 0, name: 'Phone 9.2.70', platform: 'android', version: '9.2.70' },
  { id: 2, name: 'Linux 3.2.32', platform: 'linux', version: '3.2.32' },
]
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 配置标识，可为 `0`；作为账号 API 的 `client_profile_id` |
| `name` | string | 展示名称 |
| `platform` | string | 适用账号平台，必须与账号的 `platform` 一致 |
| `version` | string | 客户端版本 |

请使用返回的 `id`，不要使用数组下标。实际可选项以当前服务返回为准。
