import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './utils/https'

const vueApp = createApp(App)

vueApp.config.globalProperties.$http = http
vueApp.use(store).use(router).mount('#app')
