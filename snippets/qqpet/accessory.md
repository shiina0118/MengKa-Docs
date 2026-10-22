## 装扮项（PetAccessory） {#pet-accessory}

宠物信息的当前装扮列表、保存头像的 `request.field_1` 以及套装中的装扮组使用此结构。保留项的业务含义尚未确认，请沿用查询返回值，并保留对象中的其他返回成员。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 保留项，十进制整数字符串 |
| `field_2` | string | 保留项，十进制整数字符串 |
| `field_3` | string[] | 保留项，十进制整数字符串数组 |
| `field_4` | number | 保留整数项 |
| `field_5` | number | 保留整数项 |
| `field_7` | string | 保留项，十进制整数字符串 |
| `field_8` | number[] | 保留整数数组 |
| `field_9` | boolean | 保留开关项 |
| `field_10` | object | 保留附加信息；其 `field_1` 为 `string[]` |
| `field_11` | string[] | 保留项，十进制整数字符串数组 |
| `field_100` | [PetAccessoryExtra[]](#pet-accessory-extra) | 保留附加列表 |

### 装扮附加项（PetAccessoryExtra） {#pet-accessory-extra}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 保留项，十进制整数字符串 |
| `field_2` | string[] | 保留项，十进制整数字符串数组 |
| `field_3` | number[] | 保留非负整数数组 |
| `field_4` | string | 保留项，十进制整数字符串 |
