import 'bootstrap/dist/css/bootstrap.min.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

createApp(App).use(createPinia()).use(router).mount('#app')
