import {createApp} from 'vue';
import 'element-plus/dist/index.css';
import router from './router';
import store from './common/store';

import App from './App.vue';
import './style.scss';

const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');
