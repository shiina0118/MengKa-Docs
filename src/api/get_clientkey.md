# get_clientkey

获取当前 Bot 会话的 clientkey。

## 调用

```js
const result = await api.get_clientkey(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |

## 返回值

```js
{ clientkey: 'HEX_ENCODED_CLIENTKEY' }
```

`clientkey` 使用十六进制编码。
