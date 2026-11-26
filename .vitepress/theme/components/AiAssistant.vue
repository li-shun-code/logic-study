<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const STORAGE_CONFIG = 'logic-study-ai-config'
const STORAGE_CHAT = 'logic-study-ai-chat'

const DEFAULTS = {
  endpoint: 'https://api.openai.com/v1/chat/completions',
  model: 'gpt-4o-mini',
  apiKey: '',
  temperature: 0.3,
  maxTokens: 800,
  systemPrompt: '你是一位耐心的逻辑学学习助手。只依据用户正在阅读的课文和对话历史回答；用中文、通俗但严谨；不要编造例子。若课文没有答案，明确说明并给出思考方向。'
}

const route = useRoute()
const { page, isDark } = useData()

const open = ref(false)
const view = ref('chat')
const config = ref({ ...DEFAULTS })
const messages = ref([])
const draft = ref('')
const sending = ref(false)
const error = ref('')
const status = ref('')
const scroller = ref(null)
const inputEl = ref(null)

const article = computed(() => {
  const main = document.querySelector('.vp-doc')
  const text = main?.innerText || ''
  return text.replace(/\n{3,}/g, '\n\n').trim().slice(0, 12000)
})

const articleTitle = computed(() => page.value?.title || document.title || '当前页面')

const modelLabel = computed(() => config.value.model || '未设置模型')

const canSend = computed(() => !sending.value && draft.value.trim() && config.value.apiKey && config.value.model)

function load() {
  try {
    const c = JSON.parse(localStorage.getItem(STORAGE_CONFIG) || '{}')
    config.value = { ...DEFAULTS, ...c }
  } catch { config.value = { ...DEFAULTS } }
  try {
    const m = JSON.parse(localStorage.getItem(STORAGE_CHAT) || '[]')
    if (Array.isArray(m)) messages.value = m.slice(-40)
  } catch { messages.value = [] }
  if (!messages.value.length) seed()
}

function seed() {
  messages.value = [{
    role: 'assistant',
    content: `你好！我是这站点的学习助手。现在你正在阅读《${articleTitle.value}》，我可以就这一课回答你的问题。先告诉我哪里卡住了？`
  }]
}

function saveConfig() {
  localStorage.setItem(STORAGE_CONFIG, JSON.stringify(config.value))
  status.value = '配置已保存到本机浏览器'
  setTimeout(() => { status.value = '' }, 2000)
}

function clearChat() {
  messages.value = []
  seed()
  localStorage.setItem(STORAGE_CHAT, JSON.stringify(messages.value))
}

async function scrollBottom() {
  await nextTick()
  if (scroller.value) scroller.value.scrollTop = scroller.value.scrollHeight
}

function toggle() {
  open.value = !open.value
  if (open.value) {
    if (!messages.value.length) seed()
    nextTick(() => { if (view.value === 'chat') inputEl.value?.focus(); scrollBottom() })
  }
}

function onKeydown(e) {
  if (e.key === 'Escape' && open.value) { open.value = false }
}

watch(() => route.path, () => {
  messages.value = []
  seed()
  localStorage.setItem(STORAGE_CHAT, JSON.stringify(messages.value))
  scrollBottom()
})

function buildSystem() {
  const exerciseHint = article.value.includes('自测题')
    ? '课文末尾有自测题，若用户问练习，优先依据那些题目和课文内容讲解。'
    : ''
  return [
    config.value.systemPrompt,
    exerciseHint,
    '【当前课文标题】' + articleTitle.value,
    '【当前课文内容】\n' + (article.value || '（未检测到课文正文）')
  ].filter(Boolean).join('\n\n')
}

async function send() {
  const text = draft.value.trim()
  if (!canSend.value) return
  error.value = ''
  messages.value.push({ role: 'user', content: text })
  draft.value = ''
  localStorage.setItem(STORAGE_CHAT, JSON.stringify(messages.value))
  await scrollBottom()

  const history = messages.value.slice(-20).map(m => ({ role: m.role, content: m.content }))
  sending.value = true
  try {
    const resp = await fetch(config.value.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.value.apiKey}`
      },
      body: JSON.stringify({
        model: config.value.model,
        messages: [{ role: 'system', content: buildSystem() }, ...history],
        temperature: Number(config.value.temperature),
        max_tokens: Number(config.value.maxTokens)
      })
    })
    if (!resp.ok) throw new Error(`接口返回 ${resp.status}：${(await resp.text()).slice(0, 200)}`)
    const data = await resp.json()
    const content = data.choices?.[0]?.message?.content || data.content?.[0]?.text || '（没有收到回答）'
    messages.value.push({ role: 'assistant', content })
    localStorage.setItem(STORAGE_CHAT, JSON.stringify(messages.value))
  } catch (e) {
    error.value = `请求失败：${e.message}。请检查模型地址、密钥和网络；配置保存在本机，不会上传到这里以外的服务器。`
  } finally {
    sending.value = false
    await scrollBottom()
  }
}

onMounted(() => {
  load()
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="ai-assistant">
    <button class="ai-fab" type="button" :aria-expanded="open" aria-label="打开学习助手" @click="toggle">
      <span v-if="!open" aria-hidden="true">✦</span>
      <span v-else aria-hidden="true">×</span>
    </button>

    <section v-if="open" class="ai-panel" :class="{ 'ai-panel--dark': isDark }" role="dialog" aria-label="逻辑学学习助手">
      <header class="ai-head">
        <div class="ai-head-main">
          <strong>学习助手</strong>
          <span class="ai-model" :title="modelLabel">基于 {{ modelLabel }}</span>
        </div>
        <div class="ai-head-actions">
          <button type="button" class="ai-icon-btn" :class="{ active: view === 'config' }" aria-label="模型配置" title="模型配置" @click="view = view === 'config' ? 'chat' : 'config'">⚙</button>
          <button type="button" class="ai-icon-btn" aria-label="清空对话" title="清空对话" @click="clearChat">↺</button>
          <button type="button" class="ai-icon-btn" aria-label="关闭助手" title="关闭助手" @click="open = false">×</button>
        </div>
      </header>

      <div v-if="view === 'config'" class="ai-config">
        <label>接口地址（OpenAI 兼容）<input v-model="config.endpoint" type="url" spellcheck="false" /></label>
        <label>模型名称<input v-model="config.model" type="text" spellcheck="false" /></label>
        <label>API Key<input v-model="config.apiKey" type="password" autocomplete="off" spellcheck="false" /></label>
        <div class="ai-config-row">
          <label>温度<input v-model.number="config.temperature" type="number" min="0" max="1" step="0.1" /></label>
          <label>最大回复<input v-model.number="config.maxTokens" type="number" min="100" max="4000" step="100" /></label>
        </div>
        <label>回答要求<textarea v-model="config.systemPrompt" rows="4" /></label>
        <p class="ai-hint">配置只保存在当前浏览器本地存储；请求直接从浏览器发往你填写的接口。</p>
        <button type="button" class="ai-save" @click="saveConfig">保存配置</button>
        <p v-if="status" class="ai-status" role="status">{{ status }}</p>
      </div>

      <template v-else>
        <div ref="scroller" class="ai-messages" role="log" aria-live="polite" :aria-busy="sending">
          <div v-for="(m, i) in messages" :key="i" class="ai-msg" :class="m.role">
            <span class="ai-role">{{ m.role === 'user' ? '你' : '助手' }}</span>
            <div class="ai-bubble">{{ m.content }}</div>
          </div>
          <div v-if="sending" class="ai-msg assistant">
            <span class="ai-role">助手</span>
            <div class="ai-bubble ai-thinking">正在思考…</div>
          </div>
        </div>
        <p v-if="error" class="ai-error" role="alert">{{ error }}</p>
        <form class="ai-composer" @submit.prevent="send">
          <textarea ref="inputEl" v-model="draft" rows="2" placeholder="就当前课文提问…" aria-label="输入问题" @keydown.enter.exact.prevent="send" />
          <button type="submit" :disabled="!canSend" aria-label="发送问题">发送</button>
        </form>
        <p class="ai-context">已携带当前页面：{{ articleTitle }}</p>
      </template>
    </section>
  </div>
</template>

<style scoped>
.ai-assistant { position: fixed; right: 20px; bottom: 20px; z-index: 1000; font-family: inherit; }
.ai-fab {
  width: 52px; height: 52px; border: 0; border-radius: 50%; cursor: pointer;
  background: #1e5a8e; color: #fff; font-size: 24px; line-height: 1;
  box-shadow: 0 6px 20px rgba(30, 90, 142, .35);
}
.ai-fab:hover { background: #2a7ab8; }
.ai-fab:focus-visible, .ai-icon-btn:focus-visible, .ai-save:focus-visible,
.ai-composer button:focus-visible, .ai-config input:focus-visible,
.ai-config textarea:focus-visible, .ai-composer textarea:focus-visible {
  outline: 2px solid currentColor; outline-offset: 2px;
}
.ai-panel {
  position: absolute; right: 0; bottom: 64px; width: min(380px, calc(100vw - 32px));
  height: min(560px, calc(100vh - 100px)); display: flex; flex-direction: column;
  background: #fff; color: #18181b; border: 1px solid #e4e4e7; border-radius: 14px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, .18); overflow: hidden;
}
.ai-panel--dark { background: #18181b; color: #fafafa; border-color: #3f3f46; }
.ai-head { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; border-bottom: 1px solid #e4e4e7; }
.ai-panel--dark .ai-head { border-color: #3f3f46; }
.ai-head-main { display: flex; flex-direction: column; gap: 2px; }
.ai-model { font-size: 12px; color: #475569; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ai-panel--dark .ai-model { color: #a1a1aa; }
.ai-head-actions { display: flex; gap: 4px; }
.ai-icon-btn { width: 32px; height: 32px; border: 0; border-radius: 6px; background: transparent; color: inherit; font-size: 16px; cursor: pointer; }
.ai-icon-btn:hover, .ai-icon-btn.active { background: rgba(30, 90, 142, .12); }
.ai-messages { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 12px; }
.ai-msg { display: flex; flex-direction: column; gap: 4px; max-width: 92%; }
.ai-msg.user { align-self: flex-end; align-items: flex-end; }
.ai-role { font-size: 11px; color: #64748b; }
.ai-bubble { padding: 9px 12px; border-radius: 10px; background: #f1f5f9; line-height: 1.6; font-size: 14px; white-space: pre-wrap; word-break: break-word; }
.ai-msg.user .ai-bubble { background: #1e5a8e; color: #fff; }
.ai-panel--dark .ai-bubble { background: #27272a; }
.ai-panel--dark .ai-msg.user .ai-bubble { background: #2a7ab8; }
.ai-thinking { opacity: .7; }
.ai-error { margin: 0 14px 8px; font-size: 12px; color: #dc2626; }
.ai-composer { display: flex; gap: 8px; padding: 10px 14px 4px; border-top: 1px solid #e4e4e7; }
.ai-panel--dark .ai-composer { border-color: #3f3f46; }
.ai-composer textarea { flex: 1; resize: none; font: inherit; font-size: 14px; padding: 8px; border: 1px solid #d4d4d8; border-radius: 8px; background: transparent; color: inherit; }
.ai-composer button { align-self: stretch; border: 0; border-radius: 8px; padding: 0 14px; background: #1e5a8e; color: #fff; cursor: pointer; }
.ai-composer button:disabled { opacity: .5; cursor: not-allowed; }
.ai-context { margin: 0; padding: 0 14px 10px; font-size: 11px; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ai-config { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 12px; }
.ai-config label { display: flex; flex-direction: column; gap: 5px; font-size: 13px; }
.ai-config input, .ai-config textarea { font: inherit; font-size: 13px; padding: 8px; border: 1px solid #d4d4d8; border-radius: 8px; background: transparent; color: inherit; }
.ai-config-row { display: flex; gap: 12px; }
.ai-config-row label { flex: 1; }
.ai-hint { font-size: 12px; color: #64748b; line-height: 1.5; margin: 0; }
.ai-save { border: 0; border-radius: 8px; padding: 9px; background: #1e5a8e; color: #fff; cursor: pointer; }
.ai-status { font-size: 12px; color: #3f9d6d; margin: 0; }
@media (max-width: 640px) {
  .ai-assistant { right: 12px; bottom: 12px; }
  .ai-panel { right: 0; bottom: 64px; width: calc(100vw - 24px); height: min(70vh, 520px); }
}
@media (prefers-reduced-motion: reduce) { .ai-assistant * { transition: none !important; animation: none !important; } }
</style>
