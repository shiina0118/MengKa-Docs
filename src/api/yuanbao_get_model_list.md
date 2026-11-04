# yuanbao_get_model_list

使用保存的元宝登录票据获取可用的对话模型列表。目前仅支持 Android 账号。

## 调用

票据按返回值原样传入，不要自行构造或修改。示例中的票据需替换为实际保存的值。

```json
{
  "type": "action",
  "id": "1",
  "action": "yuanbao_get_model_list",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "token": "TOKEN",
    "user_id": "USER_ID"
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `self_id` | number | 是 | - | 在线 Bot QQ 号，须与票据所属账号一致 |
| `protocol_id` | number | 是 | - | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `token` | string | 是 | - | 最近一次 [yuanbao_login](/api/yuanbao_login) 或 [yuanbao_refresh_ticket](/api/yuanbao_refresh_ticket) 返回的 `token` |
| `user_id` | string | 是 | - | 同一次返回的 `user_id` |

## 返回值

成功时 `data` 示例：

```js
{
  models: [
    {
      chat_model_id: 'hunyuan_gpt_175B_0404',
      model_name: 'Hy3',
      model_desc: '推荐日常使用',
      think_title: '快速思考',
      choose_default: true,
      sub_models: [
        {
          chat_model_id: 'hunyuan_t1',
          model_name: '深度思考',
          think_title: '深度思考',
          choose_default: false
        }
      ]
    },
    {
      chat_model_id: 'deep_seek_v3',
      model_name: 'DeepSeek',
      model_desc: '专注推理与理解',
      think_title: '快速思考',
      choose_default: false,
      sub_models: [
        {
          chat_model_id: 'deep_seek',
          model_name: '深度思考',
          think_title: '深度思考',
          choose_default: false
        }
      ]
    }
  ]
}
```

模型列表以实际返回为准，示例仅供参考。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `models` | object[] | 模型列表 |
| `models[].chat_model_id` | string | 模型 ID |
| `models[].model_name` | string | 模型名称 |
| `models[].model_desc` | string | 模型说明，有值时出现 |
| `models[].think_title` | string | 思考模式名称，有值时出现 |
| `models[].choose_default` | boolean | 是否为默认模型 |
| `models[].sub_models` | object[] | 该模型的子模型（例如深度思考），字段与 `models[]` 相同，有值时出现 |

## 失败处理

- 票据无效或已过期时，`error` 为 `获取元宝模型列表失败: 票据无效或已过期`，此时请先调用 [yuanbao_refresh_ticket](/api/yuanbao_refresh_ticket)；刷新也失败时调用 [yuanbao_login](/api/yuanbao_login) 重新获取票据。
- `token` 或 `user_id` 为空时直接返回参数错误。
- Bot 不在线或不是 Android 账号时返回失败结果，`error` 中说明原因。
