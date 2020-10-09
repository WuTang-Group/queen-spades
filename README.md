# Queen Spades

Queen spades商城 app端

## Project description

项目使用 nuxt + vue + vuex 搭建, SSR 渲染方式

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Directory Structure

```
├─api               `接口调用封装`
│  ├─cart           `购物车`
│  ├─category       `页脚`
│  ├─contact        `联系我们`
│  ├─order          `订单`
│  ├─payment        `支付`
│  └─wish           `愿望清单`
│
├─components        `公共组件`
│  ├─Header         `页头`
│  ├─Footer         `页脚`
│  └─Logo           `Logo组件`
│
├─filter            `全局过滤器`
├─layouts           `布局模板`
├─middleware        `路由中间件`
├─pages             `页面模板，文件名与访问的 url 一一对应`
├─plugins           `插件配置代码逻辑`
│
├─static            `静态文件`
│  ├─css
│  ├─font
│  ├─image
│  ├─js
│  ├─picture
│  └─services
│
├─store              `状态管理`
│  └─index           `全局的store`
│
└─util               `工具封装`
   │─index           `全局的store`
   └─util            `全局的store`
```
