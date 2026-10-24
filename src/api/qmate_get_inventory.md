# qmate_get_inventory

分页查询聊天精灵背包中的外观或道具。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qmate_get_inventory",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890,
    "category": 3
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qmate_get_inventory' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "user_id": 234567890,
  "category": 3
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号协议 ID，与 self_id 共同定位实例；允许为 0 |
| `user_id` | number | 是 | 另一位合养用户的 QQ 号，必须大于 0，不接受 UID |
| `category` | number | 是 | 背包分类，非负 int32；原库背包页使用 1，道具面板使用 3 |
| `sub_category` | number | 否 | 子分类，非负 int32，默认 0 |
| `cookie` | string | 否 | 分页游标，首页省略；后续原样传回 page.cookie |

## 返回值

以下为响应 `data` 字段。`ok: true` 表示已取得并解析服务端响应，还需检查 `data.success`。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 请求成功时为 true；有额外业务结果的接口还需检查相应字段 |
| `error_code` | number | 请求结果码，成功时为 0 |
| `error_message` | string | 失败说明，空字符串时省略 |
| `page` | object | 可选，本页背包内容 |
| `avatar_info` | object | 可选，当前外观；结构见[精灵信息](/api/qmate_get_info#外观信息-avatar) |
| `benefit_sync_status` | number | 权益同步状态原值 |
| `avatar_items` | object[] | 外观物品，结构与 page.items 相同 |

服务端拒绝请求时，外层为 `ok: true`，`data.success` 为 `false`。参数无效、Bot 未在线、请求失败、响应损坏时，返回 `ok: false`。


## page

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `category` | number | 背包分类 |
| `sub_category` | number | 子分类 |
| `items` | object[] | 本页物品 |
| `cookie` | string | 下一页游标 |
| `has_next` | boolean | 是否还有下一页 |

## 物品结构

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `sku_id` | string | 物品 SKU；使用道具时原样传入 |
| `category` | number | 分类 |
| `sub_category` | number | 子分类 |
| `sku_type` | number | SKU 类型原值 |
| `quantity` | number | 数量 |
| `initial` | boolean | 是否初始物品 |
| `unlocked` | boolean | 是否已解锁 |
| `in_use` | boolean | 是否使用中 |
| `unavailable_reason` | number | 不可用原因原值 |
| `obtained_at` | number | 获得时间原值 |
| `unlock_level` | number | 解锁等级 |
| `material` | object | 可选，展示素材 |
| `leaf_items` | object[] | 外观部件，见[部件结构](/api/qmate_get_info#外观部件-items-条目) |
| `skin_options` | object[] | 可选皮肤列表 |

## material

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | string | 物品名称 |
| `subtitle` | string | 副标题 |
| `icon_url` | string | 图标地址 |

## skin_options 条目

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `avatar_sub_type` | string | 皮肤子类型，使用物品时传给同名参数 |
| `icon_url` | string | 图标地址 |
| `preview_url` | string | 预览地址 |

当 `page.has_next` 为 `true` 时，保持同一个 `user_id`、`category` 和 `sub_category`，将 `page.cookie` 传给下一次请求。使用物品见 [`qmate_use_item`](/api/qmate_use_item)。
