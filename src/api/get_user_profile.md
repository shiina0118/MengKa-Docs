# get_user_profile

获取用户的 QQ 资料。省略 `user_id` 时查询当前 Bot。

支持 Android 和 Linux（PC）账号。调用方式相同；Linux 可获取的资料字段较少，无法获取的字段会省略，不再返回 `skipped`。

## 调用


查询当前 Bot（省略 `user_id`）：

```json
{
  "type": "action",
  "id": "1",
  "action": "get_user_profile",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```

查询指定用户：

```json
{
  "type": "action",
  "id": "1",
  "action": "get_user_profile",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890
  }
}
```


## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `user_id` | number | 否 | 目标 QQ 号，省略时查询自己 |

## 返回值

返回目标用户的名片对象，示例：

```js
{
  user_id: 234567890,
  nickname: '示例用户',
  remark: '项目联系人',
  age: 20,
  level: 42,
  sign: '个性签名',
  country: '中国',
  province: '广东',
  city: '深圳',
  like_count: 100,
  available_like_count: 10,
  open_privileges: [
    {
      type: 3,
      name: '超级会员',
      sort: 1,
      level: 8,
      big: true,
      icon_url: 'https://...',
      deluxe_icon_url: 'https://...',
    },
  ],
  vip_nameplate: {
    type: 258,
    level: 8,
    style_id: 20712,
    url: 'https://tianquan.gtimg.cn/namePlate/item/20712/258/8.png',
  },
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_id` | number | 目标 QQ 号 |
| `nickname`, `remark` | string | 昵称、备注 |
| `age`, `level` | number | 年龄、QQ 等级 |
| `sex` | number | 性别标识：`0` 为男、`1` 为女，其他值表示未知；Android 未取得时可能为 `0`，Linux 未取得时省略 |
| `sign` | string | 个性签名 |
| `contact_name` | string | 联系人名称 |
| `email`, `mobile`, `personal` | string | 邮箱、手机号、个人介绍，取决于可见权限，可能为空字符串 |
| `country`, `province`, `city` | string | 地区信息 |
| `group_name`, `group_nick` | string | 群名称、群昵称信息，可能为空字符串 |
| `like_count` | number | 目标名片收到的点赞总数 |
| `sent_like_count`, `available_like_count` | number | 当前 Bot 对目标用户已点赞次数、仍可点赞次数 |
| `like_limit_notice` | string | 点赞限制提示，可能为空字符串 |
| `photo_count` | number | 照片数量 |
| `status_text` | string | 状态文案 |
| `open_privileges` | [ProfilePrivilege[]](#profile-privilege) | 已点亮的特权业务及图标列表（按大徽章优先、`sort` 升序排列）；无已开通特权时为 `[]` |
| `vip_nameplate` | [VipNameplate](#vip-nameplate) | 当前生效的会员铭牌信息；未开通或灰态未展示时省略 |

### 已开通特权（ProfilePrivilege） {#profile-privilege}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `type` | number | 特权业务类型编号（如 `1` QQ会员、`3` 超级会员、`101` 红钻、`102` 黄钻、`103` 绿钻、`113` 大会员等） |
| `name` | string | 特权业务中文名称 |
| `sort` | number | 官方展示排序权重 |
| `level` | number | 该项特权的等级 |
| `big` | boolean | 是否为大尺寸徽章 |
| `icon_url` | string | 普通版特权图标直链，未提供时为空字符串 |
| `deluxe_icon_url` | string | 豪华版/年费版特权图标直链，未提供时为空字符串 |

### 会员铭牌（VipNameplate） {#vip-nameplate}

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `type` | number | 铭牌会员类型：`1` QQ会员、`2` 超级会员、`3` 大会员；年费版对应加 `256`（即 `257` / `258` / `259`） |
| `level` | number | 会员等级 |
| `style_id` | number | 铭牌模板 ID，`0` 表示使用默认模板（对应资源目录 `20712`） |
| `url` | string | 会员铭牌 PNG 图片直链 |

返回字段以上表为准，统一使用下划线命名。可见信息取决于目标账号和可见权限。Android 保持原有返回方式，缺失的信息可能为空字符串或 `0`，不应据此推断账号的真实资料。调用失败时返回 `ok: false`。

### Linux 字段支持

Linux 返回 `user_id`，并按实际获取结果返回以下可选字段：

- `nickname`、`remark`、`sex`、`age`、`level`、`sign`
- `country`、`province`、`city`、`email`、`mobile`
- `like_count`、`open_privileges`、`vip_nameplate`

Linux 暂时无法获取以下字段，因此响应中不包含它们：

- `group_name`、`group_nick`、`contact_name`、`status_text`、`personal`
- `photo_count`、`sent_like_count`、`available_like_count`、`like_limit_notice`

受支持的可选字段也可能因目标用户或可见权限而缺失。请通过字段是否存在判断是否取得资料，不要把省略的字段当作 `0` 或空字符串。若实际取得的值就是 `0` 或空字符串，该字段仍会返回。例如：

```js
{
  user_id: 234567890,
  nickname: '示例用户',
  remark: '',
  level: 42,
  like_count: 0,
}
```

点赞该用户使用 [`like_user_profile`](/api/like_user_profile)；查询当前 Bot 的点赞记录使用 [`get_sent_profile_likes`](/api/get_sent_profile_likes) 和 [`get_received_profile_likes`](/api/get_received_profile_likes)。
