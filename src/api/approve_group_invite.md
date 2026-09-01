# approve_group_invite

同意好友通过 Ark 卡片发来的群聊邀请。

## 调用

```js
const result = await api.approve_group_invite(self_id, platform, group_id, msgseq)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `platform` | string | 是 | `linux` 或 `android`；`phone`、`pad` 视为 `android` |
| `group_id` | number | 是 | 邀请加入的群聊 ID |
| `msgseq` | number | 是 | 邀请卡片中的消息序列号 |

`group_id` 和 `msgseq` 分别来自 Ark 卡片 `jumpUrl` 中的 `groupcode` 和 `msgseq`。

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
    uid: 72057594000012345,
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

## 处理示例

```js
api.on('friend_message', async event => {
  const ark = event.message.find(segment => (
    segment.type === 'ark' && segment.data.bizsrc === 'qun.invite'
  ))?.data

  const jumpUrl = ark?.meta?.news?.jumpUrl
  if (!jumpUrl) return

  const query = new URL(jumpUrl).searchParams
  const groupID = Number(query.get('groupcode'))
  const msgseq = Number(query.get('msgseq'))
  if (!groupID || !msgseq) return

  await api.approve_group_invite(event.self_id, platform, groupID, msgseq)
})
```

## 返回值

返回邀请处理结果。
