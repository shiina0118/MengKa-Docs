# get_skey

获取当前 Bot 会话的 skey。

## 调用

```js
const result = await api.get_skey(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |

## 返回值

```js
{ skey: 'SKEY' }
```

该凭据属于当前 Bot 会话，应仅在插件运行期间使用。
