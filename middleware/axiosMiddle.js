import { getcookiesInClient } from '../util/util';
export default function ({ route, req, res, redirect}) {
  let isClient = process.client;
  let isServer = process.server;
  let redirectURL = '/login';
  let blacklist = [
    '/my-account',
    '/my-account/profile',
    '/my-account/order',
    '/cart',
    '/checkout',
    '/wishlist'
  ]
  var count = 0;
  var token, path
  //在服务端
  if (isServer) {
    let cookies = getcookiesInServer(req)
    path = req.originalUrl;
    token = cookies.token ? cookies.token : ''
  }
  //在客户端判读是否需要登陆
  if (isClient) {
    token = getcookiesInClient('token')
    path = route.path;
  }
  for (var i = 0; i < blacklist.length; i++) {
    if (blacklist[i] == path) {
      count++
    }
  }
  if (path) {
    redirectURL = '/login?ref=' + encodeURIComponent(path)
  }
  //需要进行权限判断的页面开头
  if (!token) {
    if (count > 0) {
      redirect(redirectURL)
    }
  }
}