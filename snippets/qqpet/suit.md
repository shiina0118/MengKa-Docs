## 套装（PetSuit） {#pet-suit}

`qqpet_get_my_suits` 返回的套装列表元素，可原样作为 `qqpet_save_one_suit` 的 `request.suit`。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | [PetAccessoryGroup](#pet-accessory-group) | 装扮组 |
| `field_2` | [PetModel](#pet-model) | 模型信息 |
| `field_3` | string | 保留文本项，沿用查询返回值 |
| `field_4` | string | 保留项，十进制整数字符串，沿用查询返回值 |
| `field_5` | string | 保留文本项，沿用查询返回值 |

请同时保留套装、装扮组、装扮项和模型中的其他返回成员。

### 装扮组（PetAccessoryGroup） {#pet-accessory-group}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | [PetAccessory[]](#pet-accessory) | 装扮项列表 |
