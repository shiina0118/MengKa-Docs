# join_group

主动申请加入群聊。先调用 [`get_group_join_info`](/api/get_group_join_info) 查询入群方式，再将返回的 `group_option` 传入本接口。

## 调用

以下示例假设查询返回 `group_option: 5`，验证问题要求填写 B站 UID，答案填写在 `apply_msg` 中。


```json
{
  "type": "action",
  "id": "2",
  "action": "join_group",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "group_option": 5,
    "apply_msg": "123456"
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `group_id` | number | 是 | 要加入的群号，必须大于 `0` |
| `group_option` | number | 是 | 使用同一目标群的 `get_group_join_info` 查询结果；决定申请条件及结果含义，取值见下表 |
| `apply_msg` | string | 条件必填 | 申请理由或验证问题的答案；模式 `4`、`5` 必须填写非空白文字，模式 `1`、`2` 可省略，默认为空字符串 |
| `source_sub_id` | number | 否 | 入群来源子编号，默认 `0`；为 uint32 范围内的整数，与入群方式无关 |
| `auth` | string | 否 | 入群授权信息，默认空字符串 |
| `token` | string | 否 | 完成额外安全验证后取得的 `webToken`，默认空字符串；不是插件连接令牌 |
| `no_verify_auth` | string | 否 | 免验证授权信息，默认空字符串 |
| `rich_msg` | string | 否 | Base64 格式的附加消息；省略或内容为空时使用默认“新人入群”内容 |
| `trans_info` | string | 否 | Base64 格式的附加参数；省略时按入群方式使用默认值，传空字符串表示不提供附加内容 |

本接口不会自动查询入群方式。回答验证问题时，`apply_msg` 直接填写答案，不需要拼接问题或“问题／答案”前缀。

### 按入群方式处理 {#group-option}

| `group_option` | 处理方式 |
| --- | --- |
| `1` | 提交直接加入请求，默认附加参数为空 |
| `2` | 提交申请，等待管理员审核 |
| `3` | 该群不允许加入，接口返回错误，不提交申请 |
| `4` | 校验答案非空后提交；返回 `result: 1` 时表示答案错误 |
| `5` | 校验答案非空后提交；返回 `result: 1` 时表示等待审核 |

常规申请只需填写目标群、查询得到的入群方式，以及该方式要求的理由或答案；其余可选附加参数通常可以省略。

## 返回值

以下为响应 `data` 的字段。`ok: true` 表示接口成功取得并解析了服务端响应，仍需读取 `success` 和 `status` 判断申请结果。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 已入群或申请已提交、等待审核时为 `true`；其余状态为 `false` |
| `error_code` | number | 请求错误码；`0` 不代表已经入群，还需检查 `result` 和 `status` |
| `error_message` | string | 错误或验证说明，空字符串时省略 |
| `group_id` | number | 本次申请的群号 |
| `group_option` | number | 本次请求传入的入群方式 |
| `result` | number | 服务端业务结果码，见[业务结果码](#result)；请求失败时省略 |
| `status` | string | 本次申请状态，见[申请状态](#status) |
| `verify_info` | [GroupJoinVerifyInfo](#verify-info) | 额外验证信息，服务端未返回时省略；也可能返回 `type: 0`、`url: ""` |
| `join_prompt` | string | 服务端入群提示原文，空字符串时省略 |
| `security_trans_info` | string | Base64 格式的安全附加数据，内容为空时省略 |

### 申请状态 {#status}

| `status` | `success` | 说明 |
| --- | --- | --- |
| `joined` | `true` | 已加入群聊 |
| `pending` | `true` | 申请已发送，等待管理员审核，尚未入群 |
| `answer_incorrect` | `false` | 模式 `4` 的问题答案错误 |
| `verification_required` | `false` | 需要额外安全验证，查看 `verify_info` |
| `blocked` | `false` | 被安全策略拦截，查看 `join_prompt`、`security_trans_info` 等返回信息 |
| `rejected` | `false` | 服务端拒绝申请，例如群满员；查看 `result` 和 `error_message` |
| `failed` | `false` | 请求失败，查看 `error_code` 和 `error_message` |

### 业务结果码 {#result}

| `result` | 含义 |
| --- | --- |
| `0` | 已入群 |
| `1` | `group_option: 4` 时为答案错误；模式 `1`、`2`、`5` 时为等待管理员审核 |
| `2` | 群主拒绝添加新成员 |
| `3` | 操作过于频繁 |
| `4` | 群号码无效 |
| `5` | 群不存在或已删除 |
| `8`、`11` | 群已满员 |
| `13` | 需要额外安全验证 |
| `14`、`15` | 安全策略拦截 |
| `26` | 认证 QQ 号无法加入该群 |
| 其他 | 保留原始结果码，状态为 `rejected` |

### verify_info（GroupJoinVerifyInfo） {#verify-info}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `type` | number | 验证类型：`0` 未指定，`1` 短信验证，`2` 图形验证 |
| `url` | string | 服务端返回的验证地址，没有地址时为空字符串 |

是否需要验证应结合 `status` 判断，不能仅凭 `verify_info` 字段存在就认为需要验证。接口返回验证信息后不会自动完成验证或重新提交申请。

参数校验、账号状态、网络请求或响应解析失败时，返回 `ok: false`，`error` 包含原因；服务端明确拒绝申请时则保留上述结构，返回 `ok: true`、`data.success: false`。请求超时无法确认是否已经提交时，不应立即重复申请。
