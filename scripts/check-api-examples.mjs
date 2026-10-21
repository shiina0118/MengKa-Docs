import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'

const directory = new URL('../src/api/', import.meta.url)
const files = (await readdir(directory)).filter(name => name.endsWith('.md') && name !== 'index.md')
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

for (const file of files) {
  const action = file.slice(0, -3)
  const source = await readFile(new URL(file, directory), 'utf8')
  const call = source.match(/## 调用\s+([\s\S]*?)(?=\n## |$)/)?.[1]
  assert.ok(call?.includes('<ApiCallTabs>') && call.includes('</ApiCallTabs>'), `${file}: missing call tabs`)
  assert.match(call, /<template #websocket>[\s\S]+?<\/template>/, `${file}: missing WebSocket example`)
  const http = call.match(/<template #http>([\s\S]+?)<\/template>/)?.[1]
  assert.ok(http?.includes(`/api/${action}'`), `${file}: incorrect HTTP endpoint`)
  assert.ok(http.includes('Authorization:') && http.includes('Bearer TOKEN'), `${file}: missing token`)
  assert.ok(http.includes('Content-Type') && http.includes('application/json'), `${file}: missing content type`)

  let params
  if (http.includes('```bash')) {
    assert.match(http, /--request POST/, `${file}: expected POST`)
    const body = http.match(/--data '([\s\S]+?)'/)?.[1]
    params = JSON.parse(body)
    assert.ok(params && !Array.isArray(params) && typeof params === 'object', `${file}: body must be an object`)
    assert.ok(!Object.hasOwn(params, 'params'), `${file}: HTTP body must not use a WS envelope`)
  } else {
    // These actions preserve complete objects returned by a preceding query.
    const avatar = action === 'qqpet_save_avatar'
    const suit = action === 'qqpet_save_one_suit'
    assert.ok(avatar || suit || ['like_qzone_feed', 'unlike_qzone_feed'].includes(action), `${file}: unexpected fetch example`)
    const feed = { app_id: 311, feed_id: 'original-feed', forward: { feed_id: 'original-forward' } }
    const accessory = { field_1: '18446744073709551615', field_3: ['9007199254740993'], field_10: { field_1: ['asset'] }, _unknown_fields: ['oAYB'] }
    const model = { field_1: 'model', field_2: '9007199254740993', field_5: -1 }
    const completeSuit = { field_1: { field_1: [accessory] }, field_2: model, field_3: 'suit', field_4: '18446744073709551615', field_5: 'name', _unknown_fields: ['oAYB'] }
    const queryAction = avatar ? 'qqpet_get_user_pet' : suit ? 'qqpet_get_my_suits' : 'get_qzone_friend_feeds'
    const queryData = avatar ? { response: { pet: { field_2: [accessory], field_3: model } } }
      : suit ? { response: { field_1: [completeSuit] } } : { feeds: [feed] }
    const requests = []
    const fetch = async (url, options) => {
      assert.equal(options.method, 'POST')
      assert.equal(options.headers.Authorization, 'Bearer TOKEN')
      assert.equal(options.headers['Content-Type'], 'application/json')
      requests.push({ url, body: JSON.parse(options.body) })
      return { ok: true, json: async () => ({ ok: true, data: requests.length === 1 ? queryData : null }) }
    }
    const code = http.match(/```js\s+([\s\S]+?)```/)[1]
    await new AsyncFunction('fetch', 'console', code)(fetch, { log() {} })
    assert.equal(requests.length, 2)
    assert.ok(requests[0].url.endsWith(`/api/${queryAction}`))
    assert.ok(requests[1].url.endsWith(`/api/${action}`))
    if (avatar) {
      assert.deepEqual(requests[1].body.request, { field_1: [accessory], field_2: model }, `${file}: preserve and remap the complete appearance`)
    } else if (suit) {
      assert.deepEqual(requests[1].body.request.suit, completeSuit, `${file}: preserve the complete suit`)
      assert.equal(requests[1].body.request.field_1, requests[0].body.request.client_version)
      assert.equal(requests[1].body.request.field_2, requests[0].body.request.field_2)
    } else {
      assert.deepEqual(requests[1].body.feed, feed, `${file}: must preserve the complete feed`)
    }
    params = requests[1].body
  }

  const table = source.match(/## 参数\s+([\s\S]*?)(?=\n## |$)/)?.[1] ?? ''
  for (const match of table.matchAll(/^\|\s*`([^`]+)`\s*\|\s*([^|]+)\|\s*是\s*\|/gm)) {
    const [, name, type] = match
    const value = name.split('.').reduce((object, key) => object?.[key], params)
    assert.notEqual(value, undefined, `${file}: missing required parameter ${name}`)
    if (type.trim().endsWith('[]')) assert.ok(Array.isArray(value), `${file}: ${name} must be an array`)
    else if (['number', 'string', 'boolean', 'object'].includes(type.trim())) {
      assert.equal(typeof value, type.trim(), `${file}: incorrect type for ${name}`)
    }
  }
}
console.log(`Validated WebSocket / HTTP examples for ${files.length} API pages.`)
