// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import mockdata  from './mock.js'
Vue.use(mockdata)
Vue.prototype.$axiosTools=axios;//将使用$axiosTools 来使用axios的all方法和spread方法

let http = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
});
Vue.prototype.$axios=http;//这个$axios用来发请求
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
