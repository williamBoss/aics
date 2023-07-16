import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import pinia from '@/store/index.js'
import router from '@/router/index.js'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'

const app = createApp(App)
app.use(pinia).use(router)
app.component('SvgIcon', SvgIcon).mount('#app')
