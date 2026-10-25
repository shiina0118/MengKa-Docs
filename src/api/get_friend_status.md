# get_friend_status

查询指定好友当前对本账号可见的在线状态。传入好友 QQ 号，返回在线状态及相关附加信息。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "get_friend_status",
  "params": {
    "self_id": 1577159758,
    "protocol_id": 0,
    "user_id": 1223134470
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/get_friend_status' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{"self_id":1577159758,"protocol_id":0,"user_id":1223134470}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 与 `self_id` 共同定位实例，允许为 `0` |
| `user_id` | number | 是 | 好友 QQ 号（UIN），必须大于 `0`；不传 UID |

查询前可先调用 [`get_friend_list`](/api/get_friend_list) 获取好友列表。目标好友身份信息不可用时，状态查询会返回错误；此时可刷新好友列表后再查询。

## 返回值

成功响应中的 `data`，以下为“我的电量”示例：

```json
{
  "user_id": 1223134470,
  "user_uid": "u_example",
  "status": 10,
  "status_name": "在线",
  "ext_status": 1000,
  "ext_status_name": "我的电量",
  "set_time": 1792684800,
  "offline_type": 0,
  "active_state": 1,
  "active_state_change_time": 1792684800,
  "device": {
    "term_type": 65799,
    "description": "",
    "network_type": 1,
    "e_network_type": 1,
    "icon_type": 1,
    "abi_flag": 0
  },
  "extra": {
    "type": "battery",
    "data": { "percent": 85, "charging": true }
  }
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_id` | number | 查询的好友 QQ 号 |
| `user_uid` | string | 查询使用的 UID |
| `status` | number | 基础状态，保留服务端返回值 |
| `status_name` | string | 基础状态中文名称，未识别时为 `未知` |
| `ext_status` | number | 扩展状态 ID，`0` 表示无扩展状态 |
| `ext_status_name` | string | 已识别扩展类型的中文名称；`0` 为 `无`，其他未识别值为 `未知` |
| `set_time` | number | 状态设置时间，Unix 秒；未提供时为 `0` |
| `offline_type` | number | 服务端离线类型值，未提供时为 `0` |
| `active_state` | number | 服务端活跃状态值，未提供时为 `0` |
| `active_state_change_time` | number | 服务端活跃状态变化时间原值，未提供时为 `0` |
| `device` | object | 终端和网络信息，见下表 |
| `extra` | object | 按扩展状态类型解析的附加数据 |

基础状态：`10` 在线、`20` 离线、`30` 离开、`40` 隐身、`50` 忙碌、`60` Q我吧、`70` 请勿打扰。仅返回服务端对当前账号提供的状态，不推断对方隐藏的真实状态。

### device

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `term_type` | number | 终端类型，例如 `65799` Android、`67586` iPhone、`65793` PC |
| `description` | string | 服务端终端描述，无数据时为 `""` |
| `network_type` | number | 网络类型原值 |
| `e_network_type` | number | 扩展网络类型原值 |
| `icon_type` | number | 终端/网络图标类型原值 |
| `abi_flag` | number | 终端标志原值 |
| `custom` | object | 服务端提供自定义设备信息时出现 |
| `custom.has_custom_info` | number | 是否有自定义信息的原始标志 |
| `custom.description` | string | 自定义描述 |
| `custom.model` | string | 自定义机型 |

### extra

插件按 `extra.type` 分支读取 `extra.data`：

| `ext_status` | `extra.type` | `extra.data` 内容 |
| --- | --- | --- |
| `0` | `none` | 通常为 `{}` |
| `1000` | `battery` | 电量百分比、是否充电 |
| `1028` | `music` | 歌曲、歌手、播放时间等 |
| `2000` | `custom` | 自定义状态文案和表情 |
| `1021` | `video` | 视频 CID、链接、同步类型 |
| `1030` | `weather` | 天气、城市、温度等 |
| `1040` | `zodiac` | 星座运势、幸运颜色等 |
| `2017` | `auto` | 自动状态更新时间 |
| 其他 | `unknown` | 保留附加数据的 Base64，不套用其他状态的数据格式 |

已识别类型缺少附加数据时，`extra.type` 仍标识类型，`extra.data` 为 `null`。例如 `battery` 的 `data: null` 表示没有提供电量，区别于 `percent: 0`。

#### battery

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `percent` | number | 电量百分比，范围 `0–100` |
| `charging` | boolean | 是否正在充电 |

#### music

```json
{
  "type": "music",
  "data": {
    "song_id": "SONG_ID",
    "song_name": "歌曲名",
    "song_type": 0,
    "singer_name": "歌手名",
    "end_time": 1792685000,
    "source_type": 0,
    "pause_remaining_time": 0,
    "play_time": 30
  }
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `song_id` | string | 歌曲 ID |
| `song_name` | string | 歌曲名称 |
| `song_type` | number | 歌曲类型原值 |
| `singer_name` | string | 歌手名称 |
| `end_time` | number | 服务端歌曲结束时间原值 |
| `source_type` | number | 音乐来源类型原值 |
| `pause_remaining_time` | number | 暂停剩余时间原值 |
| `play_time` | number | 歌曲播放时间原值 |

#### custom

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `wording` | string | 自定义状态文案 |
| `face_id` | string | 表情 ID 的十进制字符串，保留 uint64 精度 |
| `face_type` | string | 表情类型的十进制字符串 |

#### video

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `cid` | string | 视频内容 ID |
| `url` | string | 视频链接 |
| `sync_type` | number | 同步类型原值 |

不为补充视频名称额外发起查询。

#### weather

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `weather_type` / `weather_type_id` | string | 天气类型及其 ID |
| `city` / `area` | string | 城市、地区 |
| `temperature` | string | 温度文本 |
| `adcode` | number | 地区编码 |
| `update_time` | number | 天气更新时间原值 |
| `flag` | number | 天气标志原值 |
| `description` | string | 天气描述 |
| `icon_key` | string | 图标资源键 |
| `prompt` | string | 展示提示文案 |

#### zodiac

以下字段均为字符串：`today_trend`（今日运势）、`tomorrow_trend`（明日运势）、`miniapp`（小程序信息）、`today_date`（日期）、`lucky_color`（幸运颜色）、`lucky_number`（幸运数字）。

#### auto

`update_time` 为 number，表示自动状态的更新时间（Unix 秒）。

#### unknown

`data` 可能包含 `business_base64`、`music_base64`、`buffer_base64`，分别保留未归类的附加数据；无数据时为 `{}`。无扩展状态但服务端仍返回附加数据时，`none` 也按此方式保留。

请求失败、响应内容损坏或身份不匹配时，沿用统一的 `ok: false`、`error` 响应。本接口为主动查询，不订阅或推送好友状态变化事件。
