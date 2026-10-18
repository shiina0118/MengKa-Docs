# sign_group

执行群聊打卡。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const result = await api.sign_group(self_id, platform, group_id)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/sign_group' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "group_id": 987654321
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
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

Promise 正常返回也可能是 `success: false`；必须检查 `success`。参数、连接等调用错误会拒绝 Promise。

```js
try {
  const result = await api.sign_group(self_id, platform, group_id)
  if (!result.success) {
    console.error(result.error_code, result.error_message || '打卡未成功')
  } else {
    console.log(result.message || '打卡成功')
  }
} catch (error) {
  console.error(error.message)
}
```
