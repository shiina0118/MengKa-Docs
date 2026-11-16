## 活动道具公共类型

### 背包道具（PropBagItem） {#prop-bag-item}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `item_id` | string | 道具 ID，十进制整数字符串 |
| `ownership` | [PropOwnership](#prop-ownership) | 道具直接附带的持有信息；活动库存读取方式见下文 |
| `tier_tag` | [PropTag](#prop-tag) | 等级标签 |
| `pay_type_compose` | [PropTag](#prop-tag) | 支付类型信息 |
| `image_urls` | string[] | 图片地址 |
| `fir_tab_goods` | [PropGoodsGroup](#prop-goods-group) | 商品分组信息 |
| `name` | string | 道具名称 |
| `marketing_entries` | [PropMarketing](#prop-marketing) | 价格及持有情况 |
| `description` | string | 道具说明 |
| `item_attributes` | [PropAttributes](#prop-attributes) | 道具效果及属性 |
| `field_11` | string | 含义暂未明确，十进制整数字符串 |
| `field_12` | string | 含义暂未明确 |
| `bag_tag_url` | string | 背包标签图片地址 |
| `version_upgrade_info` | [PropVersionInfo](#prop-version-info) | 版本提示信息 |

当前活动的持有数量读取 `bag_item.marketing_entries.ownership.quantity`，不要仅使用直接的 `bag_item.ownership.quantity`。嵌套持有对象缺少时，数量未知；不要据此认定为零。

### 已使用道具（UsedProp） {#used-prop}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `bag_item` | [PropBagItem](#prop-bag-item) | 道具信息，未返回时省略 |
| `used_count` | string | 本次活动已使用数量，十进制整数字符串；不是剩余库存 |
| `tips` | string | 该道具的提示文案 |

### 增益提示（PropRewardTip） {#prop-reward-tip}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `icon` | string | 提示图标 |
| `content` | string | 提示内容 |
| `field_3` | string | 含义暂未明确 |
| `tips_markdown` | string | Markdown 提示内容 |
| `ad_reward_info` | [PropAdRewardInfo](#prop-ad-reward-info) | 广告奖励状态信息，未返回时省略；此对象不表示已领取广告奖励 |

### 广告奖励状态（PropAdRewardInfo） {#prop-ad-reward-info}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `unlock_status` | number | 解锁状态，具体枚举含义暂未明确 |
| `field_2` | number | 含义暂未明确 |

### 商品分组信息（PropGoodsGroup） {#prop-goods-group}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tab` | [PropTag](#prop-tag) | 分组标签 |
| `field_2` | number | 含义暂未明确 |
| `sec_tab_goods` | [PropGoodsSubgroup[]](#prop-goods-subgroup) | 子分组 |

### 商品子分组（PropGoodsSubgroup） {#prop-goods-subgroup}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tab` | [PropTag](#prop-tag) | 分组标签 |
| `goods` | [PropGroupedGoods](#prop-grouped-goods) | 分组内商品 |
| `blind_boxes` | [PropBlindBox[]](#prop-blind-box) | 盲盒信息 |
| `activities` | [PropGoodsActivity[]](#prop-goods-activity) | 商品活动信息 |

### 分组内商品（PropGroupedGoods） {#prop-grouped-goods}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `items` | [PropGroupedGood[]](#prop-grouped-good) | 商品列表 |

### 分组商品（PropGroupedGood） {#prop-grouped-good}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1`、`field_2`、`field_7` | string | 含义暂未明确，十进制整数字符串 |
| `field_3`、`field_11` | string[] | 含义暂未明确，元素为十进制整数字符串 |
| `field_4`、`field_5` | number | 含义暂未明确 |
| `field_8` | number[] | 含义暂未明确 |
| `field_9` | boolean | 含义暂未明确 |
| `bubble` | [PropBubble](#prop-bubble) | 气泡信息 |
| `marketing_entries` | [PropMarketing](#prop-marketing) | 营销与持有信息 |
| `tab_type` | number | 分组类型，具体枚举含义暂未明确 |
| `field_15` | string | 含义暂未明确 |
| `version_upgrade_info` | [PropVersionInfo](#prop-version-info) | 版本提示信息 |
| `parts` | [PropGoodPart[]](#prop-good-part) | 商品部件 |

### 气泡信息（PropBubble） {#prop-bubble}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string[] | 含义暂未明确 |

### 商品部件（PropGoodPart） {#prop-good-part}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1`、`field_4` | string | 含义暂未明确，十进制整数字符串 |
| `field_2` | string[] | 含义暂未明确，元素为十进制整数字符串 |
| `field_3` | number[] | 含义暂未明确 |
| `tab_type` | number | 分组类型，具体枚举含义暂未明确 |

### 盲盒信息（PropBlindBox） {#prop-blind-box}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1`、`field_13`、`field_14`、`field_101`、`field_102` | string | 含义暂未明确 |
| `field_2` | string | 含义暂未明确，十进制整数字符串 |
| `field_15`、`field_16` | number | 含义暂未明确 |

### 商品活动信息（PropGoodsActivity） {#prop-goods-activity}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 含义暂未明确 |
| `field_2`、`field_3`、`field_4` | string | 含义暂未明确 |
