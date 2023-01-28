import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import { directive } from '/@/utils/directive';
import other from '/@/utils/other';
import print from 'vue3-print-nb';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '/@/theme/index.scss';
// import '/@/assets/iconfont.css'
import mitt from 'mitt';

const app = createApp(App);

directive(app);
other.elSvg(app);
window.EMPTY_PLACEHOLDER="--"
app.use(router).use(store).use(ElementPlus).use(print).mount('#app');

app.config.globalProperties.mittBus = mitt();
