# upload_group_video

上传群聊 MP4 视频，并返回可直接发送的视频消息段。

## 调用

```js
const video = await api.upload_group_video(self_id, platform, group_id, file_path)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `group_id` | number | 是 | 目标群聊 ID |
| `file_path` | string | 是 | MP4 的后端本地路径、`file://` 或后端可访问的 HTTP(S) 地址 |

后端纯 Go 读取普通 MP4 的视频尺寸与时长、解码首帧并生成 PNG 封面。支持独立 JPEG/PNG 帧、满足限制的 H.264 Baseline/Main/High 8 位 IDR，以及 HEVC Main/Main Intra/Main10 8/10 位 IRAP I 首帧。AVC/HEVC 均要求逐行扫描、4:2:0；H.264 支持 CAVLC/CABAC、4×4/8×8 和默认及自定义缩放矩阵，HEVC 支持默认矩阵、WPP 和多个 slice。10 位 HEVC 使用 16 位 PNG 保留转换后的 RGB 精度。视频原始内容不转码。

支持首个解码样本同时为首个展示帧、起始编辑时间与首帧一致的 CTTS/edit 时间线，以及 nclx/nclc 中已支持的 SDR 颜色描述。其他 codec/位深、需要 P/B 参考链的首帧、HEVC 自定义缩放矩阵、HDR/ICC、复杂编辑列表、分片 MP4、旋转及其他未支持的显示特性会返回明确错误。

## 返回值

```js
{
  type: 'video',
  data: {
    file_id: 'FILE_ID',
  },
}
```

返回段可直接传给 `send_group_msg`，并应发送到上传时指定的群聊。视频必须作为唯一消息段单独发送。

## 示例

```js
const video = await api.upload_group_video(
  123456789,
  'android',
  987654321,
  'D:/videos/example.mp4',
)

await api.send_group_msg(123456789, 'android', 987654321, [video])
```

插件与萌卡NT不在同一台主机时，应传后端可访问的 HTTP(S) 地址。
