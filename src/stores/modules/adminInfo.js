/* Vuex 使用单一状态树——是的，用一个对象就包含了全部的应用层级状态。
至此它便作为一个“唯一数据源 (SSOT)”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。
*/
import * as types from '../mutation-types'

const state = {
  adminInfo: {
    id: '',
    phone: '',
    account: '',
    email: '',
    creating_date: '',
    update_date: '',
    role: '',
    image: '',
    gender: '',
    name: ''
  }

}
/*
  getters 的方法就是为了方便多个组件共同使用的的一个简单的方案，
* */
const getters = {
  adminInfo: state => state.adminInfo
}

const actions = {
  // action提交的是mutation，而不是直接变更状态
  getAdmin ({commit}, adminInfo) {
    commit('GETADMIN_INFO', adminInfo.data)
  }
}

const mutations = {
  // 你不能直接调用一个mutation函数，这个应该更像是一个事件注册，当触发一个commit的方法的时候才
  // 能调用这个方法
  [types.LOGIN_ADMIN] (state, adminInfo) {
    state.adminInfo = {
      phone: adminInfo.phone,
      id: adminInfo.id,
      account: adminInfo.account,
      email: adminInfo.email,
      creating_date: adminInfo.creating_date,
      update_date: adminInfo.update_date,
      role: adminInfo.role,
      image: adminInfo.image,
      gender: adminInfo.gender,
      name: adminInfo.name
    }
  }
}

// moudel应该算是一个模块
export default {
  state,
  getters,
  actions,
  mutations
}
