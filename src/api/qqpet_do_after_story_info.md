# qqpet_do_after_story_info

处理宠物故事后续。仅支持 `android` 账号。

结算动态活动或PK时，使用真实的 `story_id`、`pet_id`，填写 `field_2: 6000` 和 `outdoor_version: 2`。首页流程仍可使用原有页面值。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const request = {
  "story_id": "STORY_ID",
  "field_2": 1000,
  "pet_id": "PET_ID"
}
const result = await api.qqpet_do_after_story_info(self_id, platform, request)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_do_after_story_info' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "request": {
    "story_id": "STORY_ID",
    "field_2": 1000,
    "pet_id": "PET_ID"
  }
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `android`；`phone`、`pad` 视为 `android` |
| `request` | object | 否 | 本次操作的参数，默认 `{}` |

### request

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `request.story_id` | string | 否 | 故事 ID |
| `request.field_2` | number | 否 | 页面场景；首页流程为1000，动态活动和PK为6000 |
| `request.pet_id` | string | 否 | 宠物 ID |
| `request.field_4` | number | 否 | 结算来源，按当前活动场景填写 |
| `request.outdoor_version` | number | 否 | 户外功能版本；动态活动与PK使用2 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object | 扩展结果，说明待补充 |
