import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

/** PRIME VUE **/
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';

/** THEME **/
import Aura from '@primeuix/themes/aura';

/** TANSTACK QUERY **/
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

/** FONT **/
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';

/** TOAST **/
import Toast, { POSITION, type PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";



const options: PluginOptions = {
    position: POSITION.TOP_CENTER
};

const queryClient = new QueryClient()
const app = createApp(App);
app.use(router);
app.use(VueQueryPlugin, { queryClient });
app.use(Toast, options);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
 

app.mount('#app');
