# get_received_profile_likes

分页获取当前 Bot 收到的 QQ 资料点赞记录。

## 调用

```js
// 第一页，默认每页 30 条
const result = await api.get_received_profile_likes(self_id, platform)

// 指定每页数量和上一页返回的游标
const nextPage = await api.get_received_profile_likes(self_id, platform, 30, next_mid)
```

## 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `self_id` | number | 是 | - | 在线 Bot QQ 号 |
| `platform` | string | 是 | - | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
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
| `likes` | object[] | 本页记录，无记录时为 `[]` |
| `likes[].user_id` | number | 给当前 Bot 点赞的用户的 QQ 号 |
| `likes[].nickname` | string | 该用户的昵称 |
| `likes[].time` | number | 点赞记录时间，Unix 秒 |
| `likes[].like_count` | number | 该用户对当前 Bot 的点赞次数 |
| `likes[].available_like_count` | number | 当前 Bot 仍可对该用户点赞的次数 |
| `next_mid` | string | 下一页游标；`"-1"` 表示没有下一页，不能作为请求参数继续传入 |

调用失败时 Promise 拒绝。列表只查询当前 Bot 的记录，不接受另一个用户作为查询主体。

## 翻页示例

```js
const likes = []
let next_mid = '0'

while (true) {
  const page = await api.get_received_profile_likes(self_id, platform, 30, next_mid)
  likes.push(...page.likes)
  if (page.next_mid === '-1') break
  if (typeof page.next_mid !== 'string' || !/^\d+$/.test(page.next_mid) || page.next_mid === next_mid) {
    throw new Error('分页游标无法安全使用')
  }
  next_mid = page.next_mid
}
```

以 `next_mid === "-1"` 判断结束，不要仅根据本页条数判断。游标始终按字符串保存和传递，不要转换为 number。

查询相反方向的记录使用 [`get_sent_profile_likes`](/api/get_sent_profile_likes)；点赞用户资料使用 [`like_user_profile`](/api/like_user_profile)。
