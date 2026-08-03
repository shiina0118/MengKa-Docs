# API 总览

正向与反向 WebSocket SDK 提供相同的 API。除特别注明外，所有 API 都返回 Promise，成功时解析为业务数据，失败时抛出错误。

## 消息与媒体

| API | 说明 |
| --- | --- |
| [发送群聊消息](/api/send_group_msg) | 向指定群聊发送消息 |
| [发送好友消息](/api/send_friend_msg) | 向指定好友发送消息 |
| [设置 QQ 头像](/api/set_qq_avatar) | 通过 Highway 上传当前 Bot 头像 |
| [上传群聊图片](/api/upload_group_image) | 上传图片并生成图片消息段 |
| [上传群聊语音](/api/upload_group_voice) | 上传音频并生成语音消息段 |
| [上传群聊视频](/api/upload_group_video) | 上传 MP4 视频并生成视频消息段 |
| [获取群聊合并转发消息](/api/get_group_forward_msg) | 获取合并转发的完整内容 |
| [发送群聊合并转发消息](/api/send_group_forward_msg) | 创建文本合并转发消息 |
| [查询红包详细信息](/api/get_red_packet_info) | 查询收到的 QQ 红包状态与金额信息 |
| [领取红包](/api/grab_red_packet) | 领取收到的 QQ 群红包 |

## 好友与空间

| API | 说明 |
| --- | --- |
| [获取好友列表](/api/get_friend_list) | 获取完整好友列表 |
| [删除好友](/api/delete_friend) | 删除指定好友 |
| [获取好友动态](/api/get_qzone_friend_feeds) | 获取好友空间最新动态 |
| [发布空间动态](/api/publish_qzone_feed) | 发布一条文本空间动态 |
| [点赞好友动态](/api/like_qzone_feed) | 点赞指定动态 |
| [取消好友动态点赞](/api/unlike_qzone_feed) | 取消指定动态的点赞 |
| [获取 QQ 名片](/api/get_summary_card) | 获取自己或指定用户的 QQ 名片 |
| [点赞 QQ 名片](/api/like_summary_card) | 点赞指定用户的 QQ 名片 |
| [获取 skey](/api/get_skey) | 获取当前 Bot 的 skey |
| [获取 User-Agent](/api/get_user_agent) | 获取当前 Bot 协议和设备指纹对应的 User-Agent |
| [获取 clientkey](/api/get_clientkey) | 获取十六进制 clientkey |
| [获取 PsKey](/api/get_pskey) | 获取指定域名的 PsKey |

## 群聊管理

| API | 说明 |
| --- | --- |
| [获取群聊列表](/api/get_group_list) | 获取完整群聊列表 |
| [获取群聊成员列表](/api/get_group_member_list) | 获取指定群聊的成员 |
| [获取群聊系统通知](/api/get_group_system_notifications) | 获取群聊申请与通知 |
| [同意加入群聊申请](/api/approve_group_apply) | 同意指定申请 |
| [拒绝加入群聊申请](/api/reject_group_apply) | 拒绝指定申请 |
| [同意群聊邀请](/api/approve_group_invite) | 同意好友发来的群聊邀请 |
| [设置群聊管理员](/api/set_group_admin) | 设置或取消管理员 |
| [群聊打卡](/api/group_sign) | 在指定群聊打卡 |
| [设置群聊成员禁言](/api/set_group_mute) | 设置或取消成员禁言 |
| [设置群聊全员禁言](/api/set_group_mute_all) | 开启或取消全员禁言 |
| [设置群聊专属头衔](/api/set_group_special_title) | 设置或清除成员专属头衔 |
| [移出群聊成员](/api/kick_group_member) | 将指定成员移出群聊 |
| [撤回群聊消息](/api/recall_group_msg) | 撤回指定群聊消息 |

## Bot 管理

| API | 说明 |
| --- | --- |
| [获取 Bot 列表](/api/get_bot_list) | 获取当前节点的 Bot 列表 |
| [获取 Bot 信息](/api/get_bot_info) | 获取指定 Bot 的运行信息 |
| [获取协议列表](/api/get_protocol_list) | 获取可选协议 |
| [获取设备指纹列表](/api/get_device_profile_list) | 获取可选设备指纹 |
| [添加账号](/api/add_account) | 向当前节点添加账号 |
| [编辑账号](/api/update_account) | 编辑离线账号配置 |
| [离线账号](/api/offline_account) | 取消正在进行的登录，或下线已登录账号 |
| [删除账号](/api/delete_account) | 删除当前节点下的离线账号 |
| [密码登录](/api/login_account) | 发起密码登录 |
| [检查登录缓存](/api/check_cache) | 检查本地登录缓存 |
| [缓存登录](/api/cache_login) | 使用本地缓存登录 |
| [提交滑块验证](/api/submit_slider) | 提交滑块结果 |
| [查询安全验证方式](/api/get_security_verify_methods) | 查询安全验证原因与可用方式 |
| [创建登录二维码](/api/create_login_qr) | 创建安全验证登录二维码 |
| [查询登录二维码状态](/api/query_login_qr_status) | 查询扫码状态并在确认后继续登录 |
| [获取短信验证码](/api/get_sms) | 下发安全验证短信 |
| [提交短信验证码](/api/check_sms) | 提交短信验证码并继续登录 |
| [获取等级加速任务](/api/get_level_tasks) | 获取 QQ 等级加速面板 |
| [执行等级加速任务](/api/execute_level_tasks) | 执行指定的等级加速任务 |

## 通用约定

- Bot 业务 API 的 `self_id` 是执行操作的在线 Bot QQ 号。
- Bot 管理 API 的 `self_id` 是当前节点下被操作账号的 QQ 号，部分登录流程允许账号处于离线或登录中状态。
- 插件只能访问管理后台中绑定节点下的 Bot。
- Bot API 通常要求目标 Bot 在线。
- SDK默认请求超时为 30 秒；红包与头像为 60 秒，语音、视频和批量等级任务为 5 分钟。
- 同一插件连接上的 API 会并发执行，当前每连接最多同时执行 16 个 action；响应可能乱序，但 SDK 会按请求 ID 解析对应 Promise。
- 连续 `await` 会由调用方形成串行；需要并发时先发起多个调用，再使用 `Promise.all`。
- `file_path` 中的本地路径由萌卡NT后端读取。插件与后端不在同一主机时，应传后端可访问的 HTTP(S) 地址。
