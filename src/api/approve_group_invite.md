# approve_group_invite

同意好友通过 Ark 卡片发来的群聊邀请。

## 调用

<ApiCallTabs>
<template #websocket>

```json
{
  "type": "action",
  "id": "1",
  "action": "approve_group_invite",
  "params": {
    "self_id": 123456789,
    "protocol_id": 0,
    "group_id": 987654321,
    "msg_seq": 123
  }
}
```

</template>
<template #http>

```bash
curl --request POST 'http://127.0.0.1:3003/api/approve_group_invite' \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "self_id": 123456789,
  "protocol_id": 0,
  "group_id": 987654321,
  "msg_seq": 123
}'
```

</template>
</ApiCallTabs>

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `protocol_id` | number | 是 | 目标账号的协议 ID，与 `self_id` 共同定位实例；允许为 `0` |
| `group_id` | number | 是 | 邀请加入的群聊 ID |
| `msg_seq` | number | 是 | 邀请卡片中的消息序列号 |

`group_id` 和 `msg_seq` 分别来自 Ark 卡片 `jumpUrl` 中的 `groupcode` 和 `msgseq`。

## Ark 示例

以下账号、群号、消息标识、时间、名称和 token 均为示例数据：

```js
{
  self_id: 135792468,
  post_type: 'friend_message',
  sender: {
    user_id: 246813579,
    nickname: '示例好友',
  },
  msg: {
    uid: '72057594000012345',
    seq: 28417,
    random: 763219845,
    time: 1765432100,
  },
  message: [
    {
      type: 'ark',
      data: {
        app: 'com.tencent.tuwen.lua',
        prompt: '[链接]邀请你加入群聊',
        view: 'news',
        meta: {
          news: {
            desc: '邀请你加入群聊“示例技术交流群”，进入可查看详情。',
            jumpUrl: 'mqqapi://group/invite_join?src_type=internal&version=1&groupcode=938475621&msgseq=1765432100123456&groupname=%E7%A4%BA%E4%BE%8B%E6%8A%80%E6%9C%AF%E4%BA%A4%E6%B5%81%E7%BE%A4&senderuin=246813579&receiveruin=135792468',
            preview: 'https://p.qlogo.cn/gh/938475621/938475621/?t=1765432100',
            tag: '邀请加群',
            tagIcon: 'https://downv6.qq.com/innovate/group_ark_icon.png',
            title: '邀请你加入群聊',
          },
        },
        config: {
          autosize: 0,
          collect: 0,
          ctime: 1765432100,
          forward: 0,
          height: 318,
          reply: 0,
          round: 1,
          token: '72d1c4a98b6e40f5a3c17d2e9b8046fa',
          type: 'normal',
          width: 526,
        },
        bizsrc: 'qun.invite',
        ver: '0.0.0.1',
      },
    },
  ],
  alt_message: '[链接]邀请你加入群聊',
}
```

## 处理流程

1. 收到 `friend_message` 事件后，在 `message` 中查找 `type` 为 `ark` 且 `data.bizsrc` 为 `qun.invite` 的消息段。
2. 读取该消息段的 `data.meta.news.jumpUrl`，从链接查询参数中取出 `groupcode` 和 `msgseq`。
3. 两者均为有效数字时，以事件的 `self_id`、`protocol_id` 和取出的值发送请求：

```json
{
  "type": "action",
  "id": "1",
  "action": "approve_group_invite",
  "params": {
    "self_id": 135792468,
    "protocol_id": 0,
    "group_id": 987654321,
    "msg_seq": 1234567890
  }
}
```

`group_id` 对应 `groupcode`，`msg_seq` 对应 `msgseq`。缺少任一值时不要发送请求。

## 返回值

成功返回：

```js
{ success: true, error_code: 0 }
```

处理失败时返回 `ok: false`，`error` 包含原因。
