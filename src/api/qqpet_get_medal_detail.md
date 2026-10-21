# qqpet_get_medal_detail

获取宠物勋章详情。仅支持 `android` 账号。

## 调用

<ApiCallTabs>
<template #websocket>

```js
const request = {
  "pet_id": "PET_ID",
  "medal_id": "123"
}
const result = await api.qqpet_get_medal_detail(self_id, platform, request)
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_medal_detail' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "platform": "android",
  "request": {
    "pet_id": "PET_ID",
    "medal_id": "123"
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
| `request.pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |
| `request.medal_id` | string | 否 | 勋章图鉴返回的勋章 ID，使用十进制字符串 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `medal` | object | 本次操作的medal数据 |
| `badge_subtitle` | string | 勋章副标题 |
| `field_3` | string | 扩展数据，说明待补充 |
| `web_jump_url` | string | 详情链接 |

### response.medal

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `info` | object | 详细信息 |
| `is_owned` | boolean | 是否已获得 |
| `obtain_time` | string | 获得时间；十进制整数字符串 |
| `is_equipped` | boolean | 是否正在佩戴 |
| `current_count` | string | 当前进度；十进制整数字符串 |
| `require_count` | string | 所需进度；十进制整数字符串 |
| `obtain_rate_text` | string | 获得比例说明 |
| `field_8` | number | 扩展数据，说明待补充 |
| `field_9` | object | 扩展数据，说明待补充 |

### response.medal.info

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `medal_id` | string | 勋章图鉴返回的勋章 ID，使用十进制字符串 |
| `name` | string | 名称 |
| `description` | string | 说明 |
| `category` | number | 类别 |
| `field_5` | string | 扩展数据，说明待补充 |
| `level` | number | 级别 |
| `icon_url` | string | 图标地址 |
| `toast_text` | string | 提示文字 |
| `description_detail` | string | 详细说明 |

### response.medal.field_9

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | object[] | 扩展数据，说明待补充 |
