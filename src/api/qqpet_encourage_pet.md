# 鼓励宠物

`qqpet_encourage_pet`：鼓励正在学习或打工的宠物，获取宠物回应文案。仅支持 `android` 账号。

## 调用流程

1. 使用 [qqpet_start_story](./qqpet_start_story) 发起学习或打工，保存返回的 `response.story_id`。
2. 调用本接口，传入发起活动时的 `pet_id` 和该次活动返回的 `story_id`。学习与打工使用相同参数，无需传入 `type` 或 `event_type`。
3. 优先展示返回的 `toast`；为空时可使用 `toast_words` 中的非空文案。两者均为空时无需展示文字。

`story_id` 是本次活动的标识，须原样传递，不要自行构造，也不要用活动类型、课程编号或上一次活动的标识代替。

## 调用

示例中的 `PET_ID` 和 `STORY_ID` 须替换为本次活动的实际值。

```json
{
  "type": "action",
  "id": "1",
  "action": "qqpet_encourage_pet",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "request": {
      "pet_id": "PET_ID",
      "story_id": "STORY_ID"
    }
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `request` | [Request](#request) | 是 | 本次鼓励的宠物及活动 |
| `transport` | string | 否 | 使用默认值 `oidb`；本接口仅支持该值 |

### request（Request） {#request}

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `pet_id` | string | 是 | 与发起本次活动时使用的 `request.pet_id` 相同，不能为空 |
| `story_id` | string | 是 | 发起本次活动返回的 `response.story_id`，原样传入，不能为空 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `self_id` | number | 当前 Bot QQ 号 |
| `command` | string | 本次请求的命令标识，仅用于问题排查 |
| `transport` | string | 本次请求使用的方式，为 `oidb` |
| `response` | [Response](#response) | 本次鼓励的返回数据 |
| `raw_response` | string | 原始响应的 Base64 字符串，通常使用 `response` 即可 |

### response（Response） {#response}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `credit` | string | 服务端返回的计分数值，使用十进制整数字符串；具体计分含义尚未确认，缺省为 `"0"` |
| `toast_words` | string[] | 可用于后续轮播的回应文案，缺省为 `[]` |
| `toast` | string | 本次优先展示的回应文案，缺省为 `""` |

`response` 示例（实际文案和数值以返回结果为准）：

```json
{
  "credit": "0",
  "toast_words": ["我会努力的！"],
  "toast": "我会努力的！"
}
```

## 使用限制与错误处理

- 每次调用都会执行一次鼓励请求，不会替调用方播放动画或定时轮播文案。仅需重复展示文案时，可保存并使用 `toast_words`。
- 本接口不承诺缩短活动时间、提高预计收益或增加学分；应以活动状态和结算结果为准。
- 缺少或传入空白 `pet_id`、`story_id` 会返回参数错误；`story_id` 必须为字符串。
- 请求失败或超时不会自动重试。超时不能证明操作未生效，请确认当前活动状态后再决定是否重新调用。
