<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<!--scoped 关键字是为了维护css的独立性，无法作用于整个作用域-->
<style lang="less">
  /*@import "./style/common.scss";*/
  /*@import "./style/mixin.scss";*/
  /*#app{*/
    /*height: 100%;*/
    /*width: 100%;*/
  /*}*/
  @import './style/font-awesome.min.css';
  @import './style/common';
</style>
