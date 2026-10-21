# get_qq_classic_farm_code

通过当前在线 Bot 获取 QQ 经典农场登录 code，返回后由插件使用该 code 登录农场。此接口只获取 code，不执行农场登录或等级任务，也不依赖农场版本配置。

当前按账号绑定协议的 `platform` 分支：Android 执行，PC 暂时跳过，不发送对应业务请求。PC 返回的数据为 `{ self_id, protocol_id, skipped: true, reason: "PC 平台暂时跳过此功能" }`，调用方应先检查 `skipped`。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "get_qq_classic_farm_code",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_qq_classic_farm_code' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 插件服务所在节点的在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |

账号不属于当前节点、账号未在线、请求失败或返回空 code 时，调用失败。

## 返回值

成功时 `data`：

```json
{ "code": "FARM_LOGIN_CODE" }
```

HTTP 返回：

```json
{"ok":true,"data":{"code":"FARM_LOGIN_CODE"}}
```

每次调用都向 QQ 请求新的 code。code 是临时登录凭据，应及时使用，避免写入日志或公开。
