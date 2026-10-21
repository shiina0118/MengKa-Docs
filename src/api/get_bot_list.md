# get_bot_list

获取当前插件服务绑定节点下的 Bot 列表。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "get_bot_list",
  "params": {}
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_bot_list' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{}'
```

</template>
</ApiCallTabs>

## 参数

无。

## 返回值

返回账号数组，每项结构见 [`get_bot_info`](/api/get_bot_info#返回值)。
