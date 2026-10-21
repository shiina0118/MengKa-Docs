# qqpet_report_guide

上报宠物引导完成。仅支持 `android` 账号。

上报已完成的页面引导，会改变引导进度。`guide_id` 使用页面返回的真实值。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_report_guide",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "guide_id": 1,
      "pet_id": "PET_ID",
      "outdoor_version": 2
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_report_guide' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "guide_id": 1,
    "pet_id": "PET_ID",
    "outdoor_version": 2
  }
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | object | 否 | 本次操作的参数，默认 `{}` |

### request

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `request.guide_id` | number | 否 | 页面引导返回的引导 ID |
| `request.pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |
| `request.outdoor_version` | number | 否 | 户外功能版本；当前调用示例为2 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

成功时 `response` 为空对象。
