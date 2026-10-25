# qqpet_get_medal_gallery

获取宠物勋章图鉴。仅支持 `android` 账号。

## 调用


```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_medal_gallery",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "pet_id": "PET_ID"
    }
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | [Request](#request) | 否 | 本次操作的参数，默认 `{}` |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `pet_id` | string | 否 | 宠物 ID，不能用 QQ 号代替 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | [Response](#response) | 本次操作的返回数据 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tabs` | [Tab[]](#response-tabs) | 图鉴页签列表 |

### response.tabs[]（Tab） {#response-tabs}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tab` | number | 页签类型 |
| `name` | string | 名称 |
| `categories` | [Category[]](#response-tabs-categories) | 勋章分类列表 |

### response.tabs[].categories[]（Category） {#response-tabs-categories}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | string | 名称 |
| `medals` | [Medal[]](#response-tabs-categories-medals) | 勋章条目列表 |

### response.tabs[].categories[].medals[]（Medal） {#response-tabs-categories-medals}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `info` | [Info](#response-tabs-categories-medals-info) | 详细信息 |
| `is_owned` | boolean | 是否已获得 |
| `obtain_time` | string | 获得时间；十进制整数字符串 |
| `is_equipped` | boolean | 是否正在佩戴 |
| `current_count` | string | 当前进度；十进制整数字符串 |
| `require_count` | string | 所需进度；十进制整数字符串 |
| `obtain_rate_text` | string | 获得比例说明 |
| `field_8` | number | 扩展数据，说明待补充 |
| `field_9` | [Field9](#response-tabs-categories-medals-field-9) | 扩展数据，说明待补充 |

### response.tabs[].categories[].medals[].info（Info） {#response-tabs-categories-medals-info}

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

### response.tabs[].categories[].medals[].field_9（Field9） {#response-tabs-categories-medals-field-9}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | object[] | 扩展数据，含义暂未明确 |
