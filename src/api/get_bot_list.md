# get_bot_list

获取当前插件服务绑定节点下的 Bot 列表。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "get_bot_list",
  "params": {}
}
```


## 参数

无。

## 返回值

返回 [BotInfo[]](#bot-info) 数组，当前节点下没有账号时为 `[]`。

<!--@include: ../../snippets/api/bot-info.md-->
