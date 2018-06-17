import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'
// import Index from '@/views/index/index'
// import Home from '@/views/index/home'
import Login from '@/views/login/login'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: '登录',
    hidden: true,
    component: Login
  }]

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
})
