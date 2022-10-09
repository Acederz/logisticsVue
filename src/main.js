// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//进行远程调用
import axios from 'axios'
//包装param参数
import qs from 'qs'
//import './plugins/element.js'

import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 声明基础访问地址

//const isPro = Object.is(process.env.NODE_ENV, 'production')
axios.defaults.baseURL = process.env.BASE_URL
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$url = process.env.BASE_URL
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

//请求拦截器 在请求头中加token
axios.interceptors.request.use(
  config => {
      if(localStorage.getItem('token')){
         // config.headers.token = localStorage.getItem('token');
         config.headers.common['token'] = localStorage.getItem('token');
      }
      return config;
  },
  error => {
      return Promise.reject(error);
  }
)

axios.interceptors.response.use(function (res,next) {
  console.log("token判断:"+res.data)
  const that = this
  if (res.data.code == '50000') {
    router.replace({
      path: '/login'
    })
    return false;
  }
  return res
})
ElementUI.Dialog.props.closeOnClickModal.default = false;

