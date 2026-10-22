import { defineConfig, type DefaultTheme } from "vitepress";

const base = process.env.DOCS_BASE || "/";

function findSidebarTitle(items: DefaultTheme.SidebarItem[], link: string): string | undefined {
  for (const item of items) {
    if (item.link === link) return item.text;
    const title = item.items && findSidebarTitle(item.items, link);
    if (title) return title;
  }
}

export default defineConfig({
  base,
  lang: "zh-CN",
  title: "Meng Ka 开发文档",
  titleTemplate: ":title | Meng Ka",
  transformPageData(pageData, { siteConfig }) {
    if (!pageData.relativePath.startsWith("api/")) return;
    const link = "/" + pageData.relativePath.replace(/(?:index)?\.md$/, "");
    const title = findSidebarTitle(siteConfig.site.themeConfig.sidebar["/api/"], link);
    if (title) return { title };
  },
  description: "Meng Ka API 参考文档",
  cleanUrls: true,
  head: [
    ["link", { rel: "icon", href: `${base}favicon.ico` }],
    ["link", { rel: "apple-touch-icon", href: `${base}apple-touch-icon.png` }],
    ["link", { rel: "manifest", href: `${base}manifest.webmanifest` }],
    ["meta", { name: "theme-color", content: "#4268d6" }],
  ],
  themeConfig: {
    logo: "/pwa-192x192.png",
    siteTitle: "Meng Ka",
    nav: [
      { text: "快速开始", link: "/guide/" },
      { text: "API", link: "/api/get_bot_list" },
      { text: "事件", link: "/events/" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "开发指南",
          items: [
            { text: "快速开始", link: "/guide/" },
            { text: "正向 WebSocket", link: "/guide/forward-websocket" },
            { text: "反向 WebSocket", link: "/guide/reverse-websocket" },
            { text: "正向 HTTP", link: "/guide/forward-http" },
            { text: "WebSocket API 格式", link: "/guide/protocol" },
            { text: "消息段", link: "/guide/message-segments" },
            { text: "登录流程", link: "/guide/login-flow" },
          ],
        },
      ],
      "/api/": [
        {
          text: "账号相关",
          items: [
            {
              text: "账号管理",
              collapsed: true,
              items: [
                { text: "获取 Bot 列表", link: "/api/get_bot_list" },
                { text: "获取 Bot 信息", link: "/api/get_bot_info" },
                { text: "设置 Bot 头像", link: "/api/set_qq_avatar" },
                { text: "添加账号", link: "/api/add_account" },
                { text: "编辑账号", link: "/api/update_account" },
                { text: "离线账号", link: "/api/offline_account" },
                { text: "删除账号", link: "/api/delete_account" },
              ],
            },
            {
              text: "登录类",
              collapsed: true,
              items: [
                { text: "获取协议列表", link: "/api/get_protocol_list" },
                { text: "获取设备配置", link: "/api/get_device_profile_list" },
                { text: "密码登录", link: "/api/login_account" },
                { text: "检查登录缓存", link: "/api/check_cache" },
                { text: "缓存登录", link: "/api/cache_login" },
                { text: "提交滑块验证", link: "/api/submit_slider" },
                { text: "提交身份验证", link: "/api/submit_identity_captcha" },
                { text: "身份验证·验证手机号", link: "/api/submit_identity_phone" },
                { text: "身份验证·确认短信", link: "/api/confirm_identity_sms" },
                { text: "查询安全验证方式", link: "/api/get_security_verify_methods" },
                { text: "获取安全验证二维码", link: "/api/get_security_verify_qr" },
                { text: "查询安全验证二维码状态", link: "/api/query_security_verify_qr" },
                { text: "查询登录二维码", link: "/api/query_login_qr" },
                { text: "扫描应用登录二维码", link: "/api/scan_qr" },
                { text: "确认应用登录二维码", link: "/api/auth_qr" },
                { text: "获取短信验证码", link: "/api/get_sms" },
                { text: "提交短信验证码", link: "/api/check_sms" },
              ],
            },
            {
              text: "凭据类",
              collapsed: true,
              items: [
                { text: "获取 skey", link: "/api/get_skey" },
                { text: "获取 User-Agent", link: "/api/get_user_agent" },
                { text: "获取 clientkey", link: "/api/get_client_key" },
                { text: "获取 PsKey", link: "/api/get_ps_key" },
                { text: "获取农场登录 code", link: "/api/get_qq_classic_farm_code" },
              ],
            },
            {
              text: "任务类",
              collapsed: true,
              items: [
                { text: "获取等级加速任务", link: "/api/get_level_tasks" },
                { text: "执行等级加速任务", link: "/api/execute_level_tasks" },
              ],
            },
          ],
        },
        {
          text: "好友相关",
          items: [
            {
              text: "消息类",
              collapsed: true,
              items: [
                { text: "发送好友消息", link: "/api/send_friend_msg" },
                { text: "撤回好友消息", link: "/api/recall_friend_msg" },
              ],
            },
            {
              text: "媒体类",
              collapsed: true,
              items: [
                { text: "上传好友图片", link: "/api/upload_friend_image" },
              ],
            },
            {
              text: "功能类",
              collapsed: true,
              items: [
                { text: "获取好友列表", link: "/api/get_friend_list" },
                { text: "设置好友备注", link: "/api/set_friend_remark" },
                { text: "删除好友", link: "/api/delete_friend" },
                { text: "同意群聊邀请", link: "/api/approve_group_invite" },
                { text: "获取用户资料", link: "/api/get_user_profile" },
                { text: "点赞用户资料", link: "/api/like_user_profile" },
                { text: "获取发出的资料点赞", link: "/api/get_sent_profile_likes" },
                { text: "获取收到的资料点赞", link: "/api/get_received_profile_likes" },
                { text: "获取好友动态", link: "/api/get_qzone_friend_feeds" },
                { text: "发布空间动态", link: "/api/publish_qzone_feed" },
                { text: "点赞好友动态", link: "/api/like_qzone_feed" },
                { text: "取消好友动态点赞", link: "/api/unlike_qzone_feed" },
              ],
            },
          ],
        },
        {
          text: "群聊相关",
          items: [
            {
              text: "消息类",
              collapsed: true,
              items: [
                { text: "发送群聊消息", link: "/api/send_group_msg" },
                { text: "获取群聊合并转发消息", link: "/api/get_group_forward_msg" },
                { text: "上传群聊合并转发消息", link: "/api/upload_group_forward_msg" },
                { text: "撤回群聊消息", link: "/api/recall_group_msg" },
              ],
            },
            {
              text: "媒体类",
              collapsed: true,
              items: [
                { text: "上传群聊图片", link: "/api/upload_group_image" },
                { text: "上传群聊语音", link: "/api/upload_group_voice" },
                { text: "上传群聊视频", link: "/api/upload_group_video" },
              ],
            },
            {
              text: "红包类",
              collapsed: true,
              items: [
                { text: "查询红包详细信息", link: "/api/get_red_packet_info" },
                { text: "查询群内可领取红包", link: "/api/get_group_red_packets" },
                { text: "领取红包", link: "/api/grab_red_packet" },
                { text: "上传语音红包口令", link: "/api/upload_red_packet_voice" },
                { text: "领取群聊语音红包", link: "/api/grab_group_voice_red_packet" },
              ],
            },
            {
              text: "功能类",
              collapsed: true,
              items: [
                { text: "获取群聊列表", link: "/api/get_group_list" },
                { text: "查询入群方式", link: "/api/get_group_join_info" },
                { text: "申请加入群聊", link: "/api/join_group" },
                { text: "获取群聊成员列表", link: "/api/get_group_member_list" },
                { text: "获取群聊系统通知", link: "/api/get_group_system_notifications" },
                { text: "同意加入群聊申请", link: "/api/approve_group_apply" },
                { text: "拒绝加入群聊申请", link: "/api/reject_group_apply" },
                { text: "设置群聊管理员", link: "/api/set_group_admin" },
                { text: "群聊打卡", link: "/api/sign_group" },
                { text: "设置群聊成员禁言", link: "/api/set_group_mute" },
                { text: "设置群聊全员禁言", link: "/api/set_group_mute_all" },
                { text: "设置群聊专属头衔", link: "/api/set_group_special_title" },
                { text: "移出群聊成员", link: "/api/kick_group_member" },
              ],
            },
          ],
        },
        {
          text: "QQ宠物",
          items: [
            {
              text: "宠物与资料",
              collapsed: true,
              items: [
                { text: "获取用户宠物", link: "/api/qqpet_get_user_pet" },
                { text: "领养宠物", link: "/api/qqpet_adopt_pet" },
                { text: "获取待领养宠物", link: "/api/qqpet_get_candidate_pets" },
                { text: "获取他人宠物", link: "/api/qqpet_get_other_user_pet" },
                { text: "获取宠物资料", link: "/api/qqpet_get_profile" },
                { text: "保存宠物头像", link: "/api/qqpet_save_avatar" },
                { text: "更新宠物资料", link: "/api/qqpet_update_profile" },
                { text: "检查宠物灰度资格", link: "/api/qqpet_check_user_in_gray" },
                { text: "获取宠物升级配置", link: "/api/qqpet_get_upgrade_config" },
                { text: "获取宠物展示数值", link: "/api/qqpet_get_display_value" },
                { text: "获取宠物数值指标", link: "/api/qqpet_get_numeric_metrics" },
              ],
            },
            {
              text: "喂养与照料",
              collapsed: true,
              items: [
                { text: "喂养宠物", link: "/api/qqpet_feeding" },
                { text: "获取宠物喂食次数信息", link: "/api/qqpet_get_feed_times_info" },
                { text: "获取宠物喂食红点", link: "/api/qqpet_get_feed_red_dot" },
                { text: "推送宠物喂食消息", link: "/api/qqpet_push_feed_msg" },
                { text: "上报喂食红点", link: "/api/qqpet_report_feed_red_dot" },
                { text: "领取宠物每日食物", link: "/api/qqpet_claim_daily_food" },
                { text: "获取宠物行为反应", link: "/api/qqpet_get_reaction" },
                { text: "获取宠物一键照料配置", link: "/api/qqpet_get_care_config" },
                { text: "执行宠物一键照料", link: "/api/qqpet_do_care" },
                { text: "获取宠物照料补给信息", link: "/api/qqpet_get_care_supply_info" },
                { text: "设置宠物一键照料配置", link: "/api/qqpet_set_care_config" },
              ],
            },
            {
              text: "装扮与套装",
              collapsed: true,
              items: [
                { text: "获取宠物装扮", link: "/api/qqpet_get_clothing" },
                { text: "获取我的宠物套装", link: "/api/qqpet_get_my_suits" },
                { text: "获取宠物装扮红点", link: "/api/qqpet_get_clothing_red_dot" },
                { text: "删除宠物套装", link: "/api/qqpet_remove_one_suit" },
                { text: "上报宠物装扮红点", link: "/api/qqpet_report_clothing_red_dot" },
                { text: "保存宠物套装", link: "/api/qqpet_save_one_suit" },
              ],
            },
            {
              text: "活动与故事",
              collapsed: true,
              items: [
                { text: "处理宠物故事后续", link: "/api/qqpet_do_after_story_info" },
                { text: "获取其他宠物状态", link: "/api/qqpet_get_other_pet_status_info" },
                { text: "获取宠物故事状态", link: "/api/qqpet_get_pet_story_status" },
                { text: "发起宠物活动或PK", link: "/api/qqpet_start_story" },
                { text: "获取宠物活动详情", link: "/api/qqpet_get_story_info" },
                { text: "获取宠物活动过程", link: "/api/qqpet_get_story_process" },
                { text: "获取宠物活动选项", link: "/api/qqpet_get_activity_options" },
                { text: "获取宠物活动总览与属性", link: "/api/qqpet_get_activity_overview" },
              ],
            },
            {
              text: "职业、战力与勋章",
              collapsed: true,
              items: [
                { text: "获取宠物职业树", link: "/api/qqpet_get_career_tree" },
                { text: "装备宠物职业", link: "/api/qqpet_equip_career" },
                { text: "获取宠物实时战力", link: "/api/qqpet_get_pk_power" },
                { text: "获取宠物勋章图鉴", link: "/api/qqpet_get_medal_gallery" },
                { text: "获取宠物勋章详情", link: "/api/qqpet_get_medal_detail" },
                { text: "佩戴宠物勋章", link: "/api/qqpet_equip_medal" },
                { text: "卸下宠物勋章", link: "/api/qqpet_unequip_medal" },
              ],
            },
            {
              text: "互动与关系",
              collapsed: true,
              items: [
                { text: "获取 C2C 宠物信息", link: "/api/qqpet_get_c2c_pet_info" },
                { text: "设置 C2C 宠物信息", link: "/api/qqpet_set_c2c_pet_info" },
                { text: "设置 C2C 宠物开关", link: "/api/qqpet_set_c2c_pet_switch" },
                { text: "宠物点赞", link: "/api/qqpet_like" },
                { text: "查询宠物获赞数", link: "/api/qqpet_query_like_count" },
                { text: "获取宠物关系目录", link: "/api/qqpet_get_relation_list" },
                { text: "获取宠物互动消息摘要", link: "/api/qqpet_get_interaction_messages" },
                { text: "删除宠物互动记录", link: "/api/qqpet_delete_interaction_record" },
                { text: "获取宠物互动历史", link: "/api/qqpet_get_interaction_history" },
                { text: "踩一踩好友宠物", link: "/api/qqpet_poke_friend_pet" },
              ],
            },
            {
              text: "商店与物品",
              collapsed: true,
              items: [
                { text: "获取宠物食物商品", link: "/api/qqpet_get_food_shop" },
                { text: "购买宠物食物", link: "/api/qqpet_buy_food" },
                { text: "获取宠物洗护用品目录", link: "/api/qqpet_get_bath_catalog" },
                { text: "获取宠物洗护用品库存", link: "/api/qqpet_get_bath_inventory" },
                { text: "使用宠物洗护用品", link: "/api/qqpet_use_bath_item" },
                { text: "购买宠物商城商品", link: "/api/qqpet_place_order" },
              ],
            },
            {
              text: "资源、规则与上报",
              collapsed: true,
              items: [
                { text: "获取宠物事件规则", link: "/api/qqpet_get_event_rule" },
                { text: "获取宠物页面规则", link: "/api/qqpet_get_page_rules" },
                { text: "上报宠物事件", link: "/api/qqpet_report_event" },
                { text: "宠物心跳", link: "/api/qqpet_heart_beat" },
                { text: "获取宠物家园资源", link: "/api/qqpet_get_home_resource" },
                { text: "设置宠物设备信息", link: "/api/qqpet_set_device_info" },
                { text: "上报宠物行为", link: "/api/qqpet_report_action" },
                { text: "获取宠物增量资源", link: "/api/qqpet_get_incr_resource" },
                { text: "获取宠物资源", link: "/api/qqpet_get_resource" },
                { text: "获取宠物资源详情", link: "/api/qqpet_get_resource_detail" },
                { text: "获取宠物资源序列", link: "/api/qqpet_get_sequence" },
                { text: "上报宠物引导完成", link: "/api/qqpet_report_guide" },
              ],
            },
          ],
        },
      ],
      "/events/": [
        {
          text: "事件参考",
          items: [
            { text: "事件概述", link: "/events/" },
          ],
        },
        {
          text: "账号相关",
          items: [
            {
              text: "状态类",
              collapsed: true,
              items: [
                { text: "Bot 上线", link: "/events/bot_online" },
                { text: "Bot 离线", link: "/events/bot_offline" },
              ],
            },
          ],
        },
        {
          text: "好友相关",
          items: [
            {
              text: "消息类",
              collapsed: true,
              items: [
                { text: "好友消息", link: "/events/friend_message" },
                { text: "好友消息撤回", link: "/events/friend_recall" },
              ],
            },
            {
              text: "通知类",
              collapsed: true,
              items: [
                { text: "好友点赞", link: "/events/friend_like" },
              ],
            },
          ],
        },
        {
          text: "群聊相关",
          items: [
            {
              text: "消息类",
              collapsed: true,
              items: [
                { text: "群聊消息", link: "/events/group_message" },
                { text: "群聊消息撤回", link: "/events/group_recall" },
              ],
            },
            {
              text: "通知类",
              collapsed: true,
              items: [
                { text: "入群申请", link: "/events/group_apply" },
                { text: "成员加入", link: "/events/group_increase" },
                { text: "成员退出", link: "/events/group_decrease" },
                { text: "成员禁言", link: "/events/group_mute" },
              ],
            },
          ],
        },
      ],
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            displayDetails: "显示详细列表",
            resetButtonTitle: "清除搜索",
            backButtonTitle: "返回",
            noResultsText: "没有找到结果",
            footer: {
              selectText: "选择",
              selectKeyAriaLabel: "回车键",
              navigateText: "切换",
              navigateUpKeyAriaLabel: "向上键",
              navigateDownKeyAriaLabel: "向下键",
              closeText: "关闭",
              closeKeyAriaLabel: "Esc 键",
            },
          },
        },
      },
    },
    outline: {
      level: [2, 3],
      label: "本页内容",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    returnToTopLabel: "返回顶部",
    sidebarMenuLabel: "目录",
    darkModeSwitchLabel: "外观",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    footer: {
      message: "Meng Ka 开发文档",
      copyright: "Meng Ka",
    },
  },
});
