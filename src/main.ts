import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';

import Aura from '@primeuix/themes/aura';




import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
 

app.mount('#app');
