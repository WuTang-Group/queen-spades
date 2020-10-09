import Cookie from 'js-cookie';
import axios from "~/plugins/axios";
import Vue from 'vue'

//获取服务端cookie
export function getcookiesInServer (req) {
  let service_cookie = {};
  req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
    let parts = val.split('=');
    service_cookie[parts[0].trim()] = (parts[1] || '').trim();
  });
  return service_cookie;
}
//获取客户端cookie
export function getcookiesInClient (key) {
  return Cookie.get(key) ? Cookie.get(key) : ''
}


//设置cookie
export function setCookie (c_name, value, expiredays) {
  var expiresVal = 1
  if (expiredays) {
    expiresVal = expiredays
  }
  Cookie.set(c_name, value, { expires: expiresVal, path: '/' })
}

//删除cookie
export function delCookie (name) {
  Cookie.remove(name);
}

//获取地址栏参数
export function getQueryString (name) {
  const queryUrl = window.location.href; //默认使用当前网址
  const path = window.location.pathname; //路径地址
  if (path.indexOf('wlcalback') > -1) { //有回调

  }
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

  //将URl里面的问号替换为&
  const content = queryUrl.replace(/\?/gi, "&");

  const r = content.match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  } else {
    return null;
  }
}

// 手机号验证
export function validatePhone (rule, value, callback) {
  const phoneReg = /^(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/
  if (!value) {
    return callback(new Error('请输入手机号码'))
  }
  if (!phoneReg.test(value)) {
    callback(new Error('手机号码格式有误'))
  } else {
    callback()
  }
}

// loading层
export function loadingTips (tipsValue) {
  if (!tipsValue) {
    var tipsValue = ""
  }
  var loadingHtml = '<div id = "loading"><div class="mask"></div><div class="loadCon"><img src="/image/loading.gif" class="loadImg"><p class="tipsTxt">' + tipsValue + '</p></div></div>'
  $("body").append(loadingHtml)
}
// 移除loading层
export function removeLoading (tipsValue) {
  $("#loading").remove();
}
export function loginRequest (formData) {
  loadingTips("登录中...")
  axios.post(`/api/auth/login`, formData)
    .then(res => {
      if (res.data.code === 20001) {
        delCookie("token")
        setCookie("token", res.data.data.access_token, 1 / 3)
        removeLoading()
        setTimeout(() => {
          Vue.prototype.$message({
            message: "登录成功",
            type: 'success'
          });
        }, 200);
        setTimeout(() => {
          if (getQueryString("ref")) {
            window.location.href = decodeURIComponent(getQueryString("ref"))
          } else {
            window.location.href = '/my-account'
          }
        }, 300);
      } else {
        removeLoading()
        setTimeout(() => {
          Vue.prototype.$message({
            message: res.data.msg,
            type: 'error'
          });
        }, 200);
      }
    })
    .catch(e => {
      removeLoading()
      setTimeout(() => {
        Vue.prototype.$message({
          message: '页面异常，请稍后刷新再试',
          type: 'error'
        });
      }, 200);
    });
}
export function logoutRequest (tipsVal) {
  axios.delete(`/api/auth/logout`)
    .then(res => {
      if (res.data.code === 20001) {
        delCookie("token")
        removeLoading()
        setTimeout(() => {
          Vue.prototype.$message({
            message: tipsVal,
            type: 'success'
          });
        }, 200);
        setTimeout(() => {
          window.location.href = '/'
        }, 300);
      } else {
        removeLoading()
        setTimeout(() => {
          Vue.prototype.$message({
            message: res.data.msg,
            type: 'error'
          });
        }, 200);
      }
    })
    .catch(e => {
      removeLoading()
      setTimeout(() => {
        Vue.prototype.$message({
          message: '页面异常，请稍后刷新再试',
          type: 'error'
        });
      }, 200);
    });
}
export async function getShoppingCartData () {
  var listData
  await axios.get(`/api/shop_carts`)
    .then(res => {
      if (res.data.code === 20001) {
        listData = res.data.data
      } else {
        Vue.prototype.$message({
          message: res.data.msg,
          type: 'error'
        });
        listData = "error"
      }
    });
  return listData
}

export async function delShoppingCart (product_id) {
  var state
  await axios.delete(`/api/shop_carts/${product_id}`)
    .then(res => {
      if (res.data.code === 20001) {
        Vue.prototype.$message({
          message: "已成功删除该商品",
          type: 'success'
        });
        state = true
      } else {
        Vue.prototype.$message({
          message: res.data.msg,
          type: 'error'
        });
        state = false
      }
    })
  return state
}