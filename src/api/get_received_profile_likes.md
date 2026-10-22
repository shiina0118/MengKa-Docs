# get_received_profile_likes

分页获取当前 Bot 收到的 QQ 资料点赞记录。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "get_received_profile_likes",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "page_size": 30,
    "next_mid": "0"
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_received_profile_likes' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "page_size": 30,
  "next_mid": "0"
}'
```

下一页将 `next_mid` 替换为本次响应的 `data.next_mid`；遇到 `"-1"` 停止翻页。

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `self_id` | number | 是 | - | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `page_size` | number | 否 | `30` | 每页条数，整数。范围为 `1`～`53`；超出范围或传 `null` 时报错 |
| `next_mid` | string | 否 | `"0"` | 分页游标，第一页传 `"0"`，后续原样传上一页返回的值；必须为非负十进制整数字符串，最大值为 `"9223372036854775807"` |

## 返回值

```js
{
  likes: [{
    user_id: 234567890,
    nickname: '示例用户',
    time: 1710000000,
    like_count: 8,
    available_like_count: 12,
  }],
  next_mid: '-1',
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `likes` | [ProfileLike[]](#likes) | 本页记录，无记录时为 `[]` |
| `next_mid` | string | 下一页游标；`"-1"` 表示没有下一页，不能作为请求参数继续传入 |

### likes[]（ProfileLike） {#likes}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_id` | number | 给当前 Bot 点赞的用户的 QQ 号 |
| `nickname` | string | 该用户的昵称 |
| `time` | number | 点赞记录时间，Unix 秒 |
| `like_count` | number | 该用户对当前 Bot 的点赞次数 |
| `available_like_count` | number | 当前 Bot 仍可对该用户点赞的次数 |

调用失败时返回 `ok: false`。列表只查询当前 Bot 的记录，不接受另一个用户作为查询主体。

## 翻页

1. 第一页传 `"next_mid": "0"`。
2. 每次取得结果后，把返回的 `next_mid` 原样作为下一次请求的 `next_mid`。
3. 返回的 `next_mid` 为 `"-1"` 时结束。

返回的游标不是非负十进制整数字符串，或与本次请求传入的值相同时，应停止翻页并按错误处理，避免死循环。

以 `next_mid === "-1"` 判断结束，不要仅根据本页条数判断。游标始终按字符串保存和传递，不要转换为 number。

查询相反方向的记录使用 [`get_sent_profile_likes`](/api/get_sent_profile_likes)；点赞用户资料使用 [`like_user_profile`](/api/like_user_profile)。
