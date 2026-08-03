# get_bot_list

获取当前插件服务绑定节点下的 Bot 列表。

## 调用

```js
const bots = await api.get_bot_list()
```

## 参数

无。

## 返回值

返回账号数组。常用字段：

| 字段 | 说明 |
| --- | --- |
| `self_id` | Bot QQ 号 |
| `protocol_id` | 当前协议 ID |
| `device_profile_id` | 当前设备指纹 ID |
| `nickname` | Bot 昵称 |
| `status` | `0` 离线、`1` 在线、`2` 登录中 |
| `received`, `sent` | 运行期收发消息计数 |

只返回当前节点的账号。
