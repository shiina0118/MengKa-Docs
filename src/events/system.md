# Bot 离线事件

当绑定节点下的 Bot 离线时，插件可接收 `bot_offline`：

```js
api.on('bot_offline', event => {
  console.log(`Bot ${event.self_id} 已离线`)
  console.log(event.err_msg)
})
```

事件结构：

```js
{
  self_id: 123456789,
  post_type: 'bot_offline',
  err_msg: '离线原因'
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 离线 Bot QQ 号 |
| `post_type` | string | 固定为 `bot_offline` |
| `err_msg` | string | 离线原因；可能为空字符串 |
