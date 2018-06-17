// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 保证了html的自适应
import 'lib-flexible/flexible.js'
// vuex的引用
import store from './stores'
import * as mUtils from './utils/mUtils'

Vue.use(ElementUI)
Vue.config.productionTip = false

/**
 * 如果用户刷新页面,导致存入vuex中的菜单数据清空,需要从缓存获取;
 */
const menuData = JSON.parse(localStorage.getItem('menuData'))
if (menuData) {
  store.commit('ADD_MENU', menuData) // ?? commit or dispatch ,将缓存数据注入到store中
  const routes = mUtils.generateRoutesFromMenu(menuData) // 根据菜单生成的路由信息
  const asyncRouterMap = [
    {
      path: '/index',
      name: '',
      hidden: true,
      /// 浪费了一下午时间，最后使用这种runtime+compiler 方案进行编译的时候建议使用标准引用方式。
      component: require('./layout/home.vue').default,
      redirect: '/index',
      children: routes
    }
  ]
  router.addRoutes(asyncRouterMap)
}
router.beforeEach((route, redirect, next) => {
  // 定位到首页时，清空缓存数据;
  if (route.path === '/') {
    localStorage.removeItem('userinfo')
    localStorage.removeItem('menuData')
    store.commit('ADD_MENU', [])
  }
  // 判断是否有用户登录的记录
  let userinfo = JSON.parse(localStorage.getItem('userinfo'))
  if (!userinfo && route.path !== '/') { // 没有用户信息，route.path不是定位到登录页面的,直接跳登录页面。
    next({ path: '/' })
  } else {
    if (route.name) { // 有用户信息和路由名称的，直接跳要路由的页面。
      next()
    } else { // 有用户信息，没有路由名称的，直接跳404页面。
      next({ path: '/404' })
    }
  }
})

// 修改架构进行修改，第一批增加
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
