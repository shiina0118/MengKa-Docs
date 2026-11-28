# get_qq_level_icons

查询指定用户（或指定样式）的 QQ 等级图标官方资源包直链与等级图标切片序列。后端仅通过 SSO 查询名片/等级与 `scupdate.handle` 资源元数据，不下载或落盘缓存压缩包。

支持 Android 和 Linux（PC）账号。Android 账号会自动读取目标用户当前佩戴的个性等级图标样式（未佩戴时为默认样式 `136`）；Linux 账号未显式传入 `style_id` 时使用默认样式 `136`。

## 调用

查询当前 Bot 自身的等级与佩戴图标样式：

```json
{
  "type": "action",
  "id": "1",
  "action": "get_qq_level_icons",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0
  }
}
```

查询指定用户的等级与佩戴图标样式：

```json
{
  "type": "action",
  "id": "1",
  "action": "get_qq_level_icons",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "user_id": 234567890
  }
}
```

已知等级与样式 ID 时直接获取资源包链接（跳过名片/等级查询）：

```json
{
  "type": "action",
  "id": "1",
  "action": "get_qq_level_icons",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "style_id": 136,
    "level": 75
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `user_id` | number | 否 | 目标 QQ 号；当未同时显式指定 `style_id` 和 `level` 时用于查询目标账号，省略时默认查询当前 Bot |
| `style_id` | number | 否 | 覆盖等级图标样式 ID（非负整数，`0` 会归一为默认样式 `136`） |
| `level` | number | 否 | 覆盖用于拆解图标序列的 QQ 等级数值（非负整数） |

当 `style_id` 与 `level` 同时提供时，后端不再查询目标用户名片或等级，仅发送 `scupdate.handle` 获取对应样式的 ZIP 资源信息。

## 返回值

返回等级图标资源信息与拆解后的图标切片序列，示例：

```json
{
  "user_id": 234567890,
  "level": 75,
  "style_id": 136,
  "resource_id": "qqVipLevel.136",
  "version": "12",
  "zip_url": "https://...",
  "icons": ["crown", "moon", "moon", "star", "star", "star"]
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_id` | number | 目标 QQ 号；当同时显式传入 `style_id` 和 `level` 且未传 `user_id` 时省略 |
| `level` | number | QQ 等级数值 |
| `style_id` | number | 实际生效的等级图标样式 ID（默认样式为 `136`） |
| `resource_id` | string | `scupdate` 资源标识，格式为 `qqVipLevel.<style_id>` |
| `version` | string | 服务端返回的该样式资源版本号 |
| `zip_url` | string | 官方等级图标 ZIP 压缩包下载直链 |
| `zip_base64` | string | 仅当服务端未返回 `zip_url` 而直接内联返回归档字节时出现（Base64 编码） |
| `icons` | string[] | 按等级权值从高到低拆解出的切片名有序列表（最多 15 项） |

## 压缩包结构与切片拼接说明

`zip_url` 下载的 ZIP 压缩包（注意部分 `scupdate` 资源可能外包一层传输 ZIP，解压时建议按文件名匹配 `.png`）内包含以下 PNG / APNG 切片文件：

| 切片名（`icons` 元素） | 对应压缩包内文件名 | 等级权值 / 规则 |
| --- | --- | --- |
| `penguin` | `penguin.png` | `256` 级（时光企鹅） |
| `crown` | `crown.png` | `64` 级（皇冠） |
| `sun` | `sun.png` | `16` 级（太阳） |
| `moon` | `moon.png` | `4` 级（月亮） |
| `star` | `star.png` | `1` 级（星星） |
| `half` | `half.png` | `0` 级专用（半颗星） |
| `more` | `more.png` | 当拆解出的图标总数超过 15 个时，替换第 15 个图标 |

插件端可按 `style_id + version` 在本地缓存解压后的切片图片，并根据返回的 `icons` 数组顺序依次横向排列渲染（注意 SVIP 个性样式切片可能为包含动画帧的 APNG）。
