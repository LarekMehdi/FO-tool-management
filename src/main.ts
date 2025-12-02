import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import 'primeicons/primeicons.css'

import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';


createApp(App)
    .use(router)
    .mount('#app')
