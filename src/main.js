import { createApp } from 'vue'
import 'tdesign-vue-next/es/style/index.css'
import './style/index.css'

import App from './App.vue'
import { pinia } from './store'
import { router } from './router'
import { registerLibComponent } from './lib'
const app=createApp(App).use(pinia).use(router)
registerLibComponent(app)
app.mount('#app')
