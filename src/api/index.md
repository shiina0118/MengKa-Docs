# API 总览

正向与反向 WebSocket SDK 提供相同的 API。除特别注明外，所有 API 都返回 Promise，成功时解析为业务数据，失败时抛出错误。

全部 API 也支持通过[正向 HTTP](/guide/forward-http)调用：向独立服务端口的 `POST /api/{action}` 发送 JSON 参数，并在请求头携带 `Authorization: Bearer TOKEN`。HTTP 成功响应为 `{ "ok": true, "data": ... }`。

## 通用约定

- 用户资料、好友和群成员返回 `user_id`；当前账号返回 `self_id`；群号返回 `group_id`。
- 名片返回 `like_count`（收到的点赞总数）、`sent_like_count`（当前 Bot 已对该用户点赞次数）和 `available_like_count`（当前 Bot 仍可对该用户点赞次数）。点赞记录列表使用 `like_count` 与 `available_like_count`，其中 `like_count` 按查询方向表示发出或收到的次数。

- 带 `self_id` 的 API，SDK 参数顺序都是 `self_id, platform, …`。SDK 只负责传参，是否必填、取值是否合法由萌卡NT校验。
- `platform` 用于区分同一 QQ 号下的不同端。常见取值：`linux`、`android`（`phone`、`pad` 视为 `android`）。缺省或非法时萌卡NT返回 `platform 不能为空` 或 `platform 只支持 linux 或 android`。
- 扫码登录用 [`get_login_qr`](/api/get_login_qr) / [`query_login_qr`](/api/query_login_qr)，`platform` 指定端；`windows` 暂未支持。已登录的 Android Bot 可用 [`scan_qr`](/api/scan_qr) / [`auth_qr`](/api/auth_qr) 扫并确认。
- `add_account` 只用于密码登录账号（`android`）。扫码登录账号通过 [`get_login_qr`](/api/get_login_qr) 创建。
- 无 `self_id` 的接口不需要 `platform`：[`get_bot_list`](/api/get_bot_list)、[`get_client_profile_list`](/api/get_client_profile_list)、[`get_device_profile_list`](/api/get_device_profile_list)。
- Bot 业务 API 的 `self_id` 是执行操作的在线 Bot QQ 号。
- Bot 管理 API 的 `self_id` 是当前节点下被操作账号的 QQ 号，部分登录流程允许账号处于离线或登录中状态。
- 插件只能访问管理后台中绑定节点下的 Bot。
- Bot API 通常要求目标 Bot 在线。
- 事件目前只带 `self_id`，调用 API 时仍需传入该 Bot 对应的 `platform`。同一 QQ 可同时存在 android 与 linux 账号，可用 [`get_bot_list`](/api/get_bot_list) 按 `self_id` + `platform` 区分。
- SDK默认请求超时为 30 秒；红包与头像为 60 秒，语音、视频和批量等级任务为 5 分钟。
- 同一插件连接上的 API 会并发执行，当前每连接最多同时执行 16 个 action；响应可能乱序，但 SDK 会按请求 ID 解析对应 Promise。
- 连续 `await` 会由调用方形成串行；需要并发时先发起多个调用，再使用 `Promise.all`。
- `file_path` 中的本地路径由萌卡NT后端读取。插件与后端不在同一主机时，应传后端可访问的 HTTP(S) 地址。
- Windows 文件地址示例：`file:///D:/images/example.png`，也可直接传 `D:/images/example.png`；Linux 示例：`file:///home/user/images/example.png`。文件地址中的空格等特殊字符应使用 URL 编码。
- 完整 API 请求的大小上限为 4 MiB，Base64 音频也计入其中，见[请求大小限制](/guide/protocol#请求大小限制)。
- 图片、语音、视频的发送标识需在 2 分钟内使用，超过期限或后端重启后需重新上传，见[媒体有效期](/guide/message-segments#媒体有效期)。

## 农场登录

| API | 用途 |
| --- | --- |
| [`get_qq_classic_farm_code`](/api/get_qq_classic_farm_code) | 按 `self_id` 和 `platform` 获取在线 Bot 的 QQ 经典农场登录 code |

```js
const { code } = await api.get_qq_classic_farm_code(self_id, platform)
```

支持 `android` 和 `linux`。接口仅获取 code，由插件使用该 code 登录农场。HTTP 调用使用 `POST /api/get_qq_classic_farm_code`。

## 用户资料与点赞

| API | 用途 |
| --- | --- |
| [`get_user_profile`](/api/get_user_profile) | 查询当前 Bot 或指定用户的资料 |
| [`like_user_profile`](/api/like_user_profile) | 给指定用户的资料点赞 |
| [`get_sent_profile_likes`](/api/get_sent_profile_likes) | 分页查询当前 Bot 发出的资料点赞 |
| [`get_received_profile_likes`](/api/get_received_profile_likes) | 分页查询当前 Bot 收到的资料点赞 |
