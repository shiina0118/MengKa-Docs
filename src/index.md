---
layout: home
title: 开发文档

hero:
  name: Meng Ka
  text: 插件开发文档
  tagline: 通过 WebSocket 接入，开发账号管理、消息处理与 QQ 业务插件。
  image:
    src: /logo.png
    alt: Meng Ka 形象
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/
    - theme: alt
      text: API 文档
      link: /api/get_bot_list
    - theme: alt
      text: 事件参考
      link: /events/

features:
  - title: WebSocket 接入
    details: 支持正向和反向 WebSocket，按部署环境选择接入方式。
    link: /guide/
    linkText: 选择接入方式
  - title: 账号与登录
    details: 管理 Android 与 Linux 账号，在绑定节点范围内查询 Bot、处理登录和身份验证。
    link: /guide/login-flow
    linkText: 查看登录流程
  - title: 消息与媒体
    details: 发送好友和群聊消息，使用图片、语音、视频及合并转发，了解消息段与媒体有效期。
    link: /guide/message-segments
    linkText: 了解消息格式
  - title: 群聊与好友
    details: 查询好友、群聊与成员，处理入群申请、管理员设置、禁言、撤回和资料点赞。
    link: /api/get_friend_list
    linkText: 查阅 API
  - title: QQ 业务接口
    details: 接入 QQ 宠物、红包、空间动态和经典农场登录等业务，按接口说明处理参数与返回结果。
    link: /api/qqpet_get_profile
    linkText: 浏览业务接口
  - title: 事件订阅
    details: 通过 WebSocket 接收群聊与好友消息、通知和 Bot 离线事件。
    link: /events/
    linkText: 查看事件类型
---
