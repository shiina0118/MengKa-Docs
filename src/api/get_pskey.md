# get_pskey

获取指定域名的 PsKey。

## 调用

```js
const result = await api.get_pskey(self_id, platform, domain)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `domain` | string | 是 | 目标域名 |

## 返回值

```js
{
  domain: 'DOMAIN',
  pskey: 'PSKEY',
}
```
