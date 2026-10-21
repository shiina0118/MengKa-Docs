# qqpet_get_relation_list

获取宠物关系目录。仅支持 `android` 账号。

目录范围由场景值决定。PK候选使用7；其他模式及陌生人范围受账号和版本支持情况影响，不生成替代条目。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_get_relation_list",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "source": 7
    }
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/qqpet_get_relation_list' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "request": {
    "source": 7
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
| `request.cursor` | string | 否 | 上一页返回的游标；首页可省略 |
| `request.source` | number | 否 | 目录场景；PK候选示例为7，其他场景按实际支持的值填写 |
| `request.field_3` | string | 否 | 扩展数据，说明待补充；十进制整数字符串 |
| `request.lbs` | object | 否 | 位置筛选信息 |
| `request.switch_lbs` | boolean | 否 | 是否启用位置筛选 |

### request.lbs

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `field_1` | number | 否 | 扩展数据，说明待补充 |
| `field_2` | number | 否 | 扩展数据，说明待补充 |
| `field_3` | string | 否 | 扩展数据，说明待补充 |
| `field_4` | string | 否 | 扩展数据，说明待补充 |
| `field_5` | string | 否 | 扩展数据，说明待补充 |
| `field_6` | string | 否 | 扩展数据，说明待补充 |
| `field_7` | string | 否 | 扩展数据，说明待补充；十进制整数字符串 |
| `field_8` | string | 否 | 扩展数据，说明待补充 |
| `field_9` | boolean | 否 | 扩展数据，说明待补充 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `response` | object | 本次操作的返回数据 |

### response

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `items` | object[] | 条目列表 |
| `next_cursor` | string | 下一页游标 |
| `has_more` | boolean | 是否还有下一页 |
| `field_4` | number | 扩展数据，说明待补充 |
| `field_5` | object | 扩展数据，说明待补充 |
| `field_6` | object | 扩展数据，说明待补充 |
| `field_7` | object | 扩展数据，说明待补充 |
| `field_8` | object | 扩展数据，说明待补充 |
| `field_9` | boolean | 扩展数据，说明待补充 |

### response.items[]

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object | 扩展数据，说明待补充 |
| `field_2` | object | 扩展数据，说明待补充 |
| `field_3` | number | 扩展数据，说明待补充 |
| `field_4` | object | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_6` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_7` | string | 扩展数据，说明待补充 |
| `field_8` | boolean | 扩展数据，说明待补充 |
| `field_9` | string[] | 扩展数据，说明待补充 |
| `field_10` | object | 扩展数据，说明待补充 |
| `field_11` | number | 扩展数据，说明待补充 |
| `field_12` | object | 扩展数据，说明待补充 |
| `field_13` | object | 扩展数据，说明待补充 |
| `field_14` | object | 扩展数据，说明待补充 |
| `field_15` | number | 扩展数据，说明待补充 |
| `field_16` | object | 扩展数据，说明待补充 |
| `field_17` | string | 扩展数据，说明待补充；十进制整数字符串 |

### response.items[].field_1

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充 |
| `field_2` | string | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充 |
| `field_4` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_5` | string | 扩展数据，说明待补充 |
| `field_6` | number | 扩展数据，说明待补充 |
| `field_7` | string | 扩展数据，说明待补充 |
| `field_8` | string | 扩展数据，说明待补充 |
| `field_9` | string | 扩展数据，说明待补充 |
| `field_10` | number | 扩展数据，说明待补充 |
| `field_11` | string | 扩展数据，说明待补充 |
| `field_12` | object | 扩展数据，说明待补充 |
| `field_13` | object | 扩展数据，说明待补充 |
| `field_14` | object | 扩展数据，说明待补充 |
| `field_15` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_16` | object | 扩展数据，说明待补充 |
| `field_17` | object | 扩展数据，说明待补充 |
| `field_18` | string | 扩展数据，说明待补充 |
| `field_50` | boolean | 扩展数据，说明待补充 |

### response.items[].field_2

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_2` | string | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充 |
| `field_4` | string | 扩展数据，说明待补充；十进制整数字符串 |

### response.items[].field_4

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object | 扩展数据，说明待补充 |
| `field_2` | object | 扩展数据，说明待补充 |
| `field_3` | object | 扩展数据，说明待补充 |
| `field_4` | object | 扩展数据，说明待补充 |

### response.items[].field_10

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | number | 扩展数据，说明待补充 |
| `field_3` | boolean | 扩展数据，说明待补充 |
| `field_4` | string | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_6` | number | 扩展数据，说明待补充 |
| `field_7` | object | 扩展数据，说明待补充 |
| `field_8` | number | 扩展数据，说明待补充 |
| `field_9` | boolean | 扩展数据，说明待补充 |
| `field_10` | boolean | 扩展数据，说明待补充 |

### response.items[].field_12

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object[] | 扩展数据，说明待补充 |

### response.items[].field_13

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_2` | string | 扩展数据，说明待补充 |

### response.items[].field_14

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | object | 扩展数据，说明待补充 |
| `field_2` | object | 扩展数据，说明待补充 |
| `field_3` | number | 扩展数据，说明待补充 |
| `field_4` | number | 扩展数据，说明待补充 |

### response.field_7

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展数据，说明待补充 |
| `field_2` | number | 扩展数据，说明待补充 |
| `field_3` | string | 扩展数据，说明待补充 |
| `field_4` | string | 扩展数据，说明待补充 |
| `field_5` | string | 扩展数据，说明待补充 |
| `field_6` | string | 扩展数据，说明待补充 |
| `field_7` | string | 扩展数据，说明待补充；十进制整数字符串 |
| `field_8` | string | 扩展数据，说明待补充 |
| `field_9` | boolean | 扩展数据，说明待补充 |
