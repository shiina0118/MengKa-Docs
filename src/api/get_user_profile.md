# get_user_profile

获取用户的 QQ 资料。省略 `user_id` 时查询当前 Bot。

## 调用

<ApiCallTabs>
<template #websocket>

查询当前 Bot：

```js
const result = await api.get_user_profile(self_id, platform)
```

查询指定用户：

```js
const result = await api.get_user_profile(self_id, platform, user_id)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_user_profile' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "user_id": 234567890
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `user_id` | number | 否 | 目标 QQ 号，省略时查询自己 |

## 返回值

返回目标用户的名片对象，示例：

```js
{
  user_id: 234567890,
  nickname: '示例用户',
  remark: '项目联系人',
  age: 20,
  level: 42,
  sign: '个性签名',
  country: '中国',
  province: '广东',
  city: '深圳',
  like_count: 100,
  available_like_count: 10,
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_id` | number | 目标 QQ 号 |
| `nickname`, `remark` | string | 昵称、备注 |
| `age`, `level` | number | 年龄、QQ 等级 |
| `sex` | number | 性别标识，未取得时为 `0` |
| `sign` | string | 个性签名 |
| `contact_name` | string | 联系人名称 |
| `email`, `mobile`, `personal` | string | 邮箱、手机号、个人介绍，取决于可见权限，可能为空字符串 |
| `country`, `province`, `city` | string | 地区信息 |
| `group_name`, `group_nick` | string | 群名称、群昵称信息，可能为空字符串 |
| `like_count` | number | 目标名片收到的点赞总数 |
| `sent_like_count`, `available_like_count` | number | 当前 Bot 对目标用户已点赞次数、仍可点赞次数 |
| `like_limit_notice` | string | 点赞限制提示，可能为空字符串 |
| `photo_count` | number | 照片数量 |
| `status_text` | string | 状态文案 |

返回字段以上表为准，统一使用下划线命名。可见信息取决于目标账号和实际返回，缺失的信息可能为空字符串或 `0`，不应据此推断账号的真实资料。调用失败时 Promise 拒绝。

点赞该用户使用 [`like_user_profile`](/api/like_user_profile)；查询当前 Bot 的点赞记录使用 [`get_sent_profile_likes`](/api/get_sent_profile_likes) 和 [`get_received_profile_likes`](/api/get_received_profile_likes)。
