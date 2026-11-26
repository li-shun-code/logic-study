import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import AiAssistant from './components/AiAssistant.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('AiAssistant', AiAssistant)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(AiAssistant)
    })
  }
}
