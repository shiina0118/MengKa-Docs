# API 总览

正向与反向 WebSocket SDK 提供相同的 API。除特别注明外，所有 API 都返回 Promise，成功时解析为业务数据，失败时抛出错误。

## 通用约定

- 带 `self_id` 的 API，SDK 参数顺序都是 `self_id, platform, …`。SDK 只负责传参，是否必填、取值是否合法由萌卡NT校验。
- `platform` 用于区分同一 QQ 号下的不同端。常见取值：`linux`、`android`（`phone`、`pad` 视为 `android`）。缺省或非法时萌卡NT返回 `platform 不能为空` 或 `platform 只支持 linux 或 android`。
- 扫码登录用 [`get_login_qr`](/api/get_login_qr) / [`query_login_qr`](/api/query_login_qr)，`platform` 指定端；`windows` 暂未支持。已登录的 Android Bot 可用 [`scan_qr`](/api/scan_qr) / [`auth_qr`](/api/auth_qr) 扫并确认。
- `add_account` 只用于密码登录账号（`android`）。扫码登录账号通过 [`get_login_qr`](/api/get_login_qr) 创建。
- 无 `self_id` 的接口不需要 `platform`：[`get_bot_list`](/api/get_bot_list)、[`get_protocol_list`](/api/get_protocol_list)、[`get_device_profile_list`](/api/get_device_profile_list)。
- Bot 业务 API 的 `self_id` 是执行操作的在线 Bot QQ 号。
- Bot 管理 API 的 `self_id` 是当前节点下被操作账号的 QQ 号，部分登录流程允许账号处于离线或登录中状态。
- 插件只能访问管理后台中绑定节点下的 Bot。
- Bot API 通常要求目标 Bot 在线。
- 事件目前只带 `self_id`，调用 API 时仍需传入该 Bot 对应的 `platform`。同一 QQ 可同时存在 android 与 linux 账号，可用 [`get_bot_list`](/api/get_bot_list) 按 `self_id` + `platform` 区分。
- SDK默认请求超时为 30 秒；红包与头像为 60 秒，语音、视频和批量等级任务为 5 分钟。
- 同一插件连接上的 API 会并发执行，当前每连接最多同时执行 16 个 action；响应可能乱序，但 SDK 会按请求 ID 解析对应 Promise。
- 连续 `await` 会由调用方形成串行；需要并发时先发起多个调用，再使用 `Promise.all`。
- `file_path` 中的本地路径由萌卡NT后端读取。插件与后端不在同一主机时，应传后端可访问的 HTTP(S) 地址。
