import Vue from 'vue'
import Vuex from 'vuex'
import adminInfo from './modules/adminInfo'
// 菜单情况
import menu from './modules/menu'
// 界面尺寸
import page from './modules/page'
// import address from './modules/address'
// import restaurant from './modules/restaurant'

Vue.use(Vuex)
// vue的引用
export default new Vuex.Store({
  modules: {
    adminInfo,
    menu,
    page
  }
})
