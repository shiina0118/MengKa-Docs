# 获取宠物活动道具目录

`qqpet_get_prop_catalog`：查询学习、打工道具的商品 ID、名称、价格、效果及购买数量限制。仅支持 `android` 账号。

QQ 宠物 API 默认关闭。管理员须在后端 `data/config.yaml` 顶层设置 `qqpet: 1` 并重启后端；未配置或设置为 `0` 时，所有 QQ 宠物 API（含礼包领取）均不可调用。

本接口只查询，不购买或使用道具。活动中的可用库存和使用限制请查询 [qqpet_get_story_process](./qqpet_get_story_process)。

## 调用流程

1. 学习道具传 `app_id: "356"`，打工道具传 `"357"`。
2. 从 `response.goods[]` 选择商品，保存实际返回的 `app_id` 和 `item_id`；不要根据名称猜测 ID。
3. 需要购买时，另行调用 [qqpet_place_order](./qqpet_place_order)，其中 `goods[].goods_kind` 对应商品的 `app_id`。购买会扣除余额，不是使用道具。
4. 使用前查询当前活动的库存，再调用 [qqpet_use_props](./qqpet_use_props)。

## 调用

`PET_ID` 须替换为实际宠物 ID，`client_version` 须与目标账号使用的 QQ 客户端版本一致。

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_prop_catalog",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "app_id": "357",
      "pet_id": "PET_ID",
      "platform": "1",
      "client_version": "9.3.80"
    }
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | [Request](#request) | 是 | 查询条件 |
| `transport` | string | 否 | 默认 `oidb`，仅支持该值 |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `app_id` | string | 是 | 正 uint64 十进制整数字符串；`"356"` 学习、`"357"` 打工 |
| `pet_id` | string | 是 | 宠物 ID，不能为空，不能用 QQ 号代替 |
| `platform` | string | 是 | 客户端平台值；Android 使用 `"1"`，十进制整数字符串 |
| `client_version` | string | 是 | 目标账号使用的 QQ 客户端版本，不能为空，例如 `"9.3.80"` |

整数参数也接受 JSON 整数；64 位值建议始终传字符串，避免精度丢失。上述参数不自动补齐。

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 查询结果 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `goods` | [PropGood[]](#prop-good) | 商品目录；无商品时为 `[]` |
| `has_more` | boolean | 是否还有更多结果；本接口暂无翻页参数，不保证一次返回完整目录 |

### 商品（PropGood） {#prop-good}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `app_id` | string | 道具类别，十进制整数字符串 |
| `item_id` | string | 实际商品 ID，十进制整数字符串 |
| `marketing_entries` | [PropMarketing](#prop-marketing) | 价格、持有情况及购买限制；未返回时省略 |
| `image_urls` | string[] | 商品图片地址 |
| `field_5` | boolean | 含义暂未明确 |
| `name` | string | 商品名称 |
| `description` | string | 商品说明 |
| `item_attributes` | [PropAttributes](#prop-attributes) | 道具效果及使用上限；未返回时省略 |
| `field_9`、`field_10` | string | 含义暂未明确 |
| `version_upgrade_info` | [PropVersionInfo](#prop-version-info) | 版本提示信息；未返回时省略 |

<!--@include: ../../snippets/qqpet/prop_goods.md-->

## 限制与错误处理

- 目录中的价格不是库存；购买数量限制也不是活动使用次数限制。
- 库存应以当前活动查询和使用结果为准，不要只依赖可能过时的目录持有数量。
- 缺少必填参数、非正整数类别、非法字段或字段类型会报错；账号离线、非 Android 账号及服务端拒绝也会报错。
- 空目录不表示商品可免费购买；价格、购买条件与最终扣费以服务端实际处理为准。
