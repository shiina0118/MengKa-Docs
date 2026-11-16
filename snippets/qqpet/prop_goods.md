## 道具商品公共类型

64 位整数以十进制字符串返回，32 位整数以 number 返回。数组无内容时为 `[]`；未返回的嵌套对象会省略，不保证存在。不要把缺少持有信息等同于库存为零。

### 营销与持有信息（PropMarketing） {#prop-marketing}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `price_info` | [PropPrice](#prop-price) | 商品价格 |
| `ownership` | [PropOwnership](#prop-ownership) | 持有情况 |
| `pay_type_compose` | [PropTag](#prop-tag) | 支付类型信息，`type` 的具体枚举含义暂未明确 |
| `operation_tags` | [PropTag[]](#prop-tag) | 操作标签，`type` 的具体枚举含义暂未明确 |
| `tier_tag` | [PropTag](#prop-tag) | 等级标签，`type` 的具体枚举含义暂未明确 |
| `field_6` | string | 含义暂未明确 |
| `purchase_config` | [PropPurchaseConfig](#prop-purchase-config) | 购买数量限制，不是使用次数限制 |
| `field_8` | number | 含义暂未明确 |
| `field_9` | [PropPrice](#prop-price) | 含义暂未明确的另一组价格 |
| `field_10` | boolean | 含义暂未明确 |

### 价格（PropPrice） {#prop-price}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `gold` | string | 金币价格 |
| `diamond` | string | 钻石价格 |
| `voucher` | string | 代金券价格 |

这些是价格而非库存，不要将某一项为 `"0"` 单独解释为免费。

### 持有情况（PropOwnership） {#prop-ownership}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 含义暂未明确 |
| `field_2` | string | 含义暂未明确，十进制整数字符串 |
| `in_bag_status` | number | 背包状态，具体枚举含义暂未明确 |
| `auth_status` | number | 授权状态，具体枚举含义暂未明确 |
| `quantity` | number | 持有数量 |

### 类型标签（PropTag） {#prop-tag}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `type` | number | 标签或支付类型；不同使用位置的取值不可混用 |
| `field_2` | string | 含义暂未明确 |

### 购买数量限制（PropPurchaseConfig） {#prop-purchase-config}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `default_count` | number | 默认购买数量 |
| `step` | number | 数量调整步长 |
| `min_count` | number | 最小购买数量 |
| `max_count` | number | 最大购买数量 |

### 道具属性（PropAttributes） {#prop-attributes}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1`、`field_2`、`field_3` | number | 含义暂未明确 |
| `effects` | [PropEffect[]](#prop-effect) | 道具效果 |
| `use_limit` | number | 道具属性中的使用上限；实际活动限制还需查看活动过程 |

### 道具效果（PropEffect） {#prop-effect}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `study_type` | number | 学习效果类型，具体枚举含义暂未明确 |
| `work_type` | number | 打工效果类型，具体枚举含义暂未明确 |
| `value` | number | 效果数值；含义与效果类型关联，不统一解释为百分比 |
| `bonus_type` | number | 加成类型，具体枚举含义暂未明确 |

根据道具类别读取对应效果类型，不根据另一类型的默认 `0` 判断该道具同时具有两种效果。

### 版本提示信息（PropVersionInfo） {#prop-version-info}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 含义暂未明确 |
| `field_2` | string | 含义暂未明确 |
