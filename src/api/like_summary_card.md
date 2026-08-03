# like_summary_card

点赞指定用户的 QQ 名片。

## 调用

```js
const result = await api.like_summary_card(
  self_id,
  target_uin,
  like_count,
)
```

## 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `self_id` | number | 是 | - | 在线 Bot QQ 号 |
| `target_uin` | number | 是 | - | 目标 QQ 号 |
| `like_count` | number | 否 | `1` | 点赞次数 |

## 返回值

```js
{ code: 0, msg: '成功' }
```

`code` 和 `msg` 来自 QQ 名片点赞响应。
