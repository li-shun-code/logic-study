import Teek from 'vitepress-theme-teek'
import 'vitepress-theme-teek/index.css'
import { h } from 'vue'
import AiAssistant from './components/AiAssistant.vue'
import './custom.css'

export default {
  extends: Teek,
  enhanceApp({ app }) {
    app.component('AiAssistant', AiAssistant)
  },
  Layout() {
    return h(Teek.Layout, null, {
      'layout-bottom': () => h(AiAssistant)
    })
  }
}
