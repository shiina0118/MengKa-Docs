## 宠物信息（Pet） {#pet}

查询自己或他人宠物、领养宠物和 C2C 宠物信息时返回此结构。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string | 当前宠物资源标识，查询或保存套装时使用，保持字符串形式 |
| `field_2` | [PetAccessory[]](#pet-accessory) | 当前装扮列表 |
| `field_3` | [PetModel](#pet-model) | 当前模型信息 |
| `profile` | [PetProfile](#pet-profile) | 宠物资料 |
| `field_5` | object | 扩展数据，含义暂未明确 |
| `field_6` | object | 扩展数据，含义暂未明确 |
| `field_7` | object | 扩展数据，含义暂未明确 |
| `field_100` | object | 扩展数据，含义暂未明确 |
| `field_101` | string | 扩展数据，说明待补充 |
