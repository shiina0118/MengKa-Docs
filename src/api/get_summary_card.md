# get_summary_card

获取 QQ 名片信息。

## 调用

查询当前 Bot：

```js
const result = await api.get_summary_card(self_id, platform)
```

查询指定用户：

```js
const result = await api.get_summary_card(self_id, platform, target_uin)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `target_uin` | number | 否 | 目标 QQ 号，省略时查询自己 |

## 返回值

返回目标用户的名片结构化数据。
