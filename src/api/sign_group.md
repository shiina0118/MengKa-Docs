# sign_group

执行群聊打卡。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "sign_group",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `group_id` | number | 是 | 群聊 ID |

## 返回值

返回打卡结果对象，常用字段示例：

```js
{
  success: true,
  error_code: 0,
  message: '打卡成功',
  days: '3',
  rank: '1',
  detail_url: 'https://example.com/check-in',
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 本次打卡是否成功 |
| `error_code` | number | 结果码，成功为 `0` |
| `error_message` | string | 失败原因，可能省略 |
| `message` | string | 打卡提示文案，可能省略 |
| `days`, `rank` | string | 累计天数、群排名文案，可能省略，不保证为纯数字 |
| `timestamp` | string | 时间信息，可能省略 |
| `detail_url` | string | 详情地址，可能省略 |
| `score_text`, `score_animation_url` | string | 积分提示、动画地址，可能省略 |

调用成功（`ok: true`）时 `data.success` 也可能为 `false`，必须检查 `success`。参数、连接等调用错误会返回 `ok: false`。

成功时读取 `message`；`success` 为 `false` 时读取 `error_code` 和 `error_message`。
