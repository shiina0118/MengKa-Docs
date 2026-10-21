# get_qq_classic_farm_code

通过当前在线 Bot 获取 QQ 经典农场登录 code，返回后由插件使用该 code 登录农场。此接口只获取 code，不执行农场登录或等级任务，也不依赖农场版本配置。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const { code } = await api.get_qq_classic_farm_code(self_id, platform)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_qq_classic_farm_code' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android"
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 插件服务所在节点的在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |

账号不属于当前节点、账号未在线、请求失败或返回空 code 时，调用失败。

## 返回值

SDK 返回：

```js
{ code: 'FARM_LOGIN_CODE' }
```

HTTP 返回：

```json
{"ok":true,"data":{"code":"FARM_LOGIN_CODE"}}
```

每次调用都向 QQ 请求新的 code。code 是临时登录凭据，应及时使用，避免写入日志或公开。
