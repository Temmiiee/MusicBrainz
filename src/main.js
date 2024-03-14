import './assets/main.css'

import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import Notifications from '@kyvg/vue3-notification'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(Notifications)

app.mount('#app')
