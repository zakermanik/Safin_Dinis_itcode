import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import router from "./router";
import 'element-plus/dist/index.css';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia)
    .use(ElementPlus)
    .use(router)
app.mount('#app')
