# qqpet_report_event

上报宠物事件。仅支持 `android` 账号。

如需执行“摸一摸好友宠物”，请使用语义化接口
[qqpet_touch_friend_pet](/api/qqpet_touch_friend_pet)，无需自行填写行为事件字段。

本接口保留原始事件参数，部分 `field_*` 的业务含义尚未确认。除非已经掌握对应事件的完整参数，否则请优先使用具体的语义化接口。

## 调用

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_report_event",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "field_1": "example",
      "field_3": {
        "field_1": 1
      }
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
| `transport` | string | 否 | 传输方式，可选 `oidb` 或 `sso`；省略时使用 `oidb` |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `field_1` | string | 否 | 扩展参数，说明待补充 |
| `field_2` | string | 否 | 扩展参数，说明待补充 |
| `field_3` | [Field3](#request-field-3) | 否 | 扩展参数，说明待补充 |
| `field_4` | object | 否 | 扩展参数，含义暂未明确 |
| `field_5` | object | 否 | 扩展参数，含义暂未明确 |
| `field_6` | [Field6[]](#request-field-6) | 否 | 扩展参数，说明待补充 |
| `field_90` | object | 否 | 扩展参数，含义暂未明确 |
| `field_99` | number | 否 | 扩展参数，说明待补充 |

### request.field_6[]（Field6） {#request-field-6}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `key` | string | 否 | 扩展参数，说明待补充 |
| `value` | string | 否 | 扩展参数，说明待补充 |

### request.field_3（Field3） {#request-field-3}

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | number | 扩展参数，说明待补充 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `command` | string | 本次请求的命令标识，仅用于问题排查 |
| `transport` | string | 本次请求实际使用的传输方式 |
| `response` | [Response](#response) | 本次操作的返回数据 |
| `raw_response` | string | 原始响应的 Base64 字符串，通常使用 `response` 即可 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `field_1` | string[] | 扩展结果，说明待补充 |
