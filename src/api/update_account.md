# update_account

更新当前插件节点内的 Bot 账号配置。

保存成功后清空登录缓存，切换协议支持跨平台。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "update_account",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "password": "YOUR_ACCOUNT_PASSWORD",
    "new_protocol_id": 1,
    "device_profile_id": 1,
    "nt": 1
  }
}
```

以上示例将账号设为 NT 模式。保留原登录模式时省略 `nt`；改为 WT 模式时传 `nt: 0`。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | QQ 号 |
| `protocol_id` | number | 是 | [`get_bot_list`](/api/get_bot_list) 中原账号的 `protocol.id`，允许为 `0` |
| `password` | string | 视目标协议而定 | 目标为 Android 时必填；目标为 Linux 时可省略或传空，但会清除已保存的密码。需要保留密码时，须显式传入要保留的密码 |
| `new_protocol_id` | number | 是 | [`get_protocol_list`](/api/get_protocol_list) 返回的目标协议 `id`；不更换协议时传原 ID |
| `device_profile_id` | number | 是 | [`get_device_profile_list`](/api/get_device_profile_list) 返回的设备配置 `id` |
| `nt` | number | 否 | 登录模式：`1` 为 NT，`0` 为 WT；省略时保留原模式 |

账号须离线；目标 `self_id + new_protocol_id` 已存在时拒绝修改。

## 返回值

成功时 `data` 为 `null`：

```json
{ "type": "action_result", "id": "1", "ok": true, "data": null }
```

失败时 `action_result` 为 `ok: false`，`error` 为错误原因。
