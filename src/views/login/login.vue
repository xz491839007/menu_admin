<template>
  <div class="login_page">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <span class="title">后台管理系统</span>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
          <el-form-item prop="username">
            <span class="fa-tips"><i class="fa fa-user"></i></span>
            <el-input class="area" type="text" placeholder="用户名" v-model="loginForm.username" ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <span class="fa-tips"><i class="fa fa-lock"></i></span>
            <el-input class="area" type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
          </el-form-item>
          <div class="tiparea">
            <p class="wxtip">温馨提示：</p>
            <p class="tip">未登录过的新用户，自动注册</p>
            <p class="tip">注册过的用户可凭账号密码登录</p>
          </div>
        </el-form>

      </section>
    </transition>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
import {loginAction, IpAction} from '@/api/login'
import * as mUtils from '../../utils/mUtils'
// const axios = require('axios')

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      showLogin: false,
      ip: ''
    }
  },
  mounted () {
    // 更像是viewLoad后的一次数据访问初始化
    this.showLogin = true
    this.getip() // 在页面初始化时，就去获取公网ip
  },
  computed: {
    ...mapState(['adminInfo']),
    ...mapGetters(['menuitems', 'isLoadRoutes'])
  },
  methods: {
    ...mapActions(['addMenu', 'loadRoutes', 'getAdmin']),
    // 保存用户信息到缓存
    saveUserInfo (nickName) {
      const userinfo = {
        username: this.loginForm.username,
        nickname: nickName
      }
      mUtils.setStore('userinfo', userinfo)
    },
    // 模拟动态生成菜单并定位到index,主要用在权限上面
    generateMenuPushIndex () {
      const menuData = [
        {
          path: '/index',
          name: '数据管理',
          component: 'index',
          icon: 'fa-server',
          noDropdown: true,
          children: [
            {path: '/index', name: '首页', component: 'index'}
          ]
        },
        {
          path: '/userList',
          name: '用户管理',
          component: 'userList',
          icon: 'fa-user',
          noDropdown: true,
          children: [
            {path: '/userList', name: '用户列表', component: 'userList'}
          ]
        },
        {path: '/shopList',
          name: '商户管理',
          component: 'shopList',
          icon: 'fa-envelope',
          noDropdown: true,
          children: [
            {path: '/shopList', name: '商户列表', component: 'shopList'}
          ]
        }
        // {path: '/infoList',
        //   name: '信息列表',
        //   component: 'infoList',
        //   icon: 'fa-envelope',
        //   noDropdown: true,
        //   children: [
        //     {path: '/infoList', name: '信息列表', component: 'infoList'}
        //   ]
        // },
        // {path: '/infoManage',
        //   name: '信息管理',
        //   component: 'content',
        //   icon: 'fa-asterisk',
        //   children: [
        //     {path: '/infoShow', name: '个人信息', component: 'infoShow'},
        //     {path: '/infoModify', name: '修改信息', component: 'infoModify'}
        //   ]
        // },
        // {path: '/fundManage',
        //   name: '资金管理',
        //   component: 'content',
        //   icon: 'fa-money',
        //   children: [
        //     {path: '/fundList', name: '资金流水', component: 'fundList'},
        //     {path: '/payList', name: '支付单据', component: 'payList'}
        //   ]
        // },
        // {path: '/touziManage',
        //   name: '投资管理',
        //   component: 'content',
        //   icon: 'fa-inbox',
        //   children: [
        //     {path: '/chinaTouziList', name: '省份投资', component: 'chinaTouziList'},
        //     {path: '/chinaTabsList', name: '区域投资', component: 'chinaTabsList'}
        //   ]
        // },
        // {path: '/fundArticle',
        //   name: '金融文章',
        //   component: 'content',
        //   icon: 'fa-file-text-o',
        //   children: [
        //     {path: '/createFundArticle', name: '发布文章', component: 'createFundArticle'},
        //     {path: '/modifyFundArticle', name: '编辑文章', component: 'modifyFundArticle'},
        //     {path: '/showFundArticle', name: '查看文章', component: 'showFundArticle'}
        //   ]
        // },
        // {path: '/fundData',
        //   name: '资金数据',
        //   component: 'content',
        //   icon: 'fa-bar-chart-o',
        //   children: [
        //     {path: '/fundPosition', name: '投资分布', component: 'fundPosition'},
        //     {path: '/typePosition', name: '项目分布', component: 'typePosition'},
        //     {path: '/incomePayPosition', name: '收支统计', component: 'incomePayPosition'}
        //   ]
        // }
      ]
      mUtils.setStore('menuData', menuData) // 将菜单放入缓存。
      this.addMenu(menuData) // 生成菜单,将菜单放入store 。
      console.log(!this.isLoadRoutes)
      if (!this.isLoadRoutes) { // 首次进来为false,改变其状态为true
        const routes = mUtils.generateRoutesFromMenu(menuData) // 根据菜单生成的路由信息,需要将数据库返回的对象key值转成小写
        console.log(routes)
        const asyncRouterMap = [
          {
            path: '/404',
            name: '404',
            hidden: true,
            component: require('../404.vue').default
          },
          {
            path: '/index',
            name: '',
            hidden: true,
            component: require('../../layout/home').default,
            redirect: '/index',
            children: routes
          }
        ]
        console.log(asyncRouterMap)
        this.$router.addRoutes(asyncRouterMap)
        this.loadRoutes() // true,第二次进来不用再去加载路由
      }
      this.$router.push('/index')
    },
    submitForm (formName) {
      loginAction(this.loginForm.username, this.loginForm.password, this.ip).then((response) => {
        let adminInfo = response.data
        if (adminInfo.status === 1) {
          // 同步数据
          this.$store.dispatch('getAdmin', adminInfo)
          this.$router.push({name: '首页', path: '/', params: {id: this.adminInfo.adminInfo.id}})
          // 存入缓存，用于显示用户名
          this.saveUserInfo(this.adminInfo.adminInfo.name)
          this.generateMenuPushIndex() // 模拟动态生成菜单并定位到index
          // 用于模拟动态生成菜单并定位到index
          this.$store.dispatch('initLeftMenu') // 并设置成左边菜单始终展开状态
        } else {
          alert(adminInfo.message)
        }
      })
    },
    getip () {
      IpAction().then((response, error) => {
        let datas = response.data
        this.ip = datas.origin
        if (error) {
          console.log(error)
        }
      })
    }
  },
  watch: {
    adminInfo: function (newValue) {
      console.log('数据发生变化')
      if (newValue.id) {
        // this.$message({
        //   type: 'success',
        //   message: '检测到您之前登录过，将自动登录'
        // })
        // this.$router.push('index')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .login_page{
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(../../assets/img/bg9.jpg) no-repeat center center;
    background-size: 100% 100%;
  }
  .loginForm{
    background-color: #fff;
    padding:20px;
    border-radius:3px;
    box-shadow: 5px 5px 10px #01144c;
    .fa-tips{
      position: absolute;
      top: 0px;
      left: 10px;
      z-index: 20;
      color:#FF7C1A;
      font-size: 18px;
    }

  }
  .manage_tip{
    margin-bottom:20px;
    .title{
      font-family: cursive;
      font-weight: bold;
      font-size: 26px;
      color:#fff;
    }
    .logo{
      width:60px;
      height:60px;
    }
  }
  .form_contianer{
    width:370px;
    height:210px;
    position: absolute;
    top: 20%;
    left: 34%;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    .submit_btn{
      width: 100%;
      font-size: 16px;
      letter-spacing:20px;
    }
  }
  .tiparea{
    text-align:left;
    font-size: 12px;
    color: #4cbb15;
    .tip{
      margin-left: 54px;
    }
  }

  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
  .loginForm{
    .el-button--primary{
      background-color:#FF7C1A;
      border:1px solid #FF7C1A;
    }
  }
</style>
