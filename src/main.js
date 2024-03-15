import { createApp } from 'vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'
import App from './App.vue'

createApp(App)
    .use(router)
    .use(Notifications)
    .mount('#app')