import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createModal, type DefineGroups } from '@kolirt/vue-modal'

import App from './App.vue'
import router from './router'

declare module '@kolirt/vue-modal' {
  interface ModalGroupRegistry extends DefineGroups<['default']> {}
}

const app = createApp(App)

app.use(createPinia())
app.use(
  createModal({
    groups: {
      default: {}
    }
  })
)
app.use(router)

app.mount('#app')
