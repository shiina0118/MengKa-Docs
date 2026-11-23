# get_wallet_balance

查询当前登录 Bot 账号的 QQ 钱包余额。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "get_wallet_balance",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

## 返回值

成功时外层为 `ok: true`，`data` 字段如下：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `balance_fen` | number | 当前钱包余额，整数，单位为分 |
| `balance_yuan` | string | 当前钱包余额，保留两位小数的字符串，单位为元 |
| `authen_account_type` | number | 账户实名/认证状态类型 |
| `name` | string | 账户展示名称，可能为空字符串 |

成功时的 `data` 示例：

```json
{
  "balance_fen": 1234,
  "balance_yuan": "12.34",
  "authen_account_type": 1,
  "name": "QQ钱包"
}
```

参数无效、Bot 未在线或请求失败时，返回 `ok: false`，`error` 包含原因。
