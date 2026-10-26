# add_account

向当前插件节点添加 Bot 账号，支持 Android 和 PC（Linux）协议。Android 账号必须提供密码；PC 账号可以提供密码走密码登录，也可以省略密码走扫码登录。NT 模式使用 [`login_account`](/api/login_account)，WT 模式使用 [`wtlogin_login_account`](/api/wtlogin_login_account)；WT 密码登录目前仅支持 Android。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "add_account",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "password": "YOUR_ACCOUNT_PASSWORD",
    "device_profile_id": 1
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 5 到 10 位 QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `password` | string | 视协议而定 | 账号密码；Android 协议必填，PC 协议可省略（省略时扫码登录） |
| `device_profile_id` | number | 是 | `get_device_profile_list` 返回的设备配置记录 ID |
| `nt` | number | 否 | 登录模式：`1` 为 NT，`0` 为 WT；省略时默认 `1` |

## 返回值

成功时 `data` 为新账号信息：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 账号 QQ 号 |
| `platform` | string | 通信实现，如 `android` |
| `protocol_id` | number | 协议 ID |
| `device_profile_id` | number | 设备配置记录 ID |
| `node_id` | number | 所属节点 ID |
| `status` | number | 账号状态 |
| `nt` | number | 已保存的登录模式：`1` 为 NT，`0` 为 WT |

失败时 `action_result` 为 `ok: false`，`error` 为错误原因。
