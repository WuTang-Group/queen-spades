import * as axios from 'axios'
import Vue from 'vue'
let options = {}
options.timeout = 60000
options.baseURL = '/storeApi'
options.withCredentials = true
const instance = axios.create(options);
// 拦截请求
instance.interceptors.request.use(config => {
  return config
}, (err) => {
  return Promise.reject(err)
});

// 拦截响应
instance.interceptors.response.use(config => {
  return config
}, (err) => {
  const $message = Vue.prototype.$message;
  switch (err.response.status) {
    case 401:
      $message({
        message: "请先登录",
        type: 'error'
      })
      break
    default:
      $message({
        message: '页面异常，请稍后刷新再试',
        type: 'error'
      })
      break
  }
  return Promise.reject(err)
});

export default instance;