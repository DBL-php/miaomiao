import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import axios from 'axios'

Vue.prototype.axios = axios

Vue.config.productionTip = false


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Loding from '@/components/Loading'
Vue.component('Loading',Loding)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
