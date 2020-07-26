import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/globel.css'
import axios from "axios"

Vue.prototype.$http = axios;
axios.defaults.baseURL ='http://localhost:80/' //配置请求的根路径
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
