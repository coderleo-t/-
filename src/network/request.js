import axios from 'axios'
import Vue from 'vue'
import NProgress from 'nprogress'

// axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
const instance = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1',
  timeout: 2000
})

Vue.prototype.$http = instance

instance.interceptors.request.use(config => {
  NProgress.start();
  // 必须在每次请求的时候添加一个验证token的请求头才能请求到数据
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

instance.interceptors.response.use(config => {
  NProgress.done();
  return config
})