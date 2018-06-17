# menu_admin
menu的后台管理系统，使用vue


### nginx 的正则匹配
~      波浪线表示执行一个正则匹配，区分大小写
~*    表示执行一个正则匹配，不区分大小写
^~    ^~表示普通字符匹配，如果该选项匹配，只匹配该选项，不匹配别的选项，一般用来匹配目录
=      进行普通字符精确匹配
@    #"@" 定义一个命名的 location，使用在内部定向时，例如 error_page, try_files
location 匹配优先级

= 精确匹配会第一个被处理。如果发现精确匹配，nginx停止搜索其他匹配。
普通字符匹配，正则表达式规则和长的块规则将被优先和查询匹配，也就是说如果该项匹配还需去看有没有正则表达式匹配和更长的匹配。
^~ 则只匹配该规则，nginx停止搜索其他匹配，否则nginx会继续处理其他location指令。
最后匹配理带有"~"和"~*"的指令，如果找到相应的匹配，则nginx停止搜索其他匹配；当没有正则表达式或者没有正则表达式被匹配的情况下，那么匹配程度最高的逐字匹配指令会被使用。

### 1.vue部署到nginx服务器 网络请求跨域
### 2.vue 填坑系列总结——scoped
https://segmentfault.com/a/1190000010971143
### 3.vue +scss 
### 4.vue cli+axios踩坑记录+拦截器使用，代理跨域proxy（更新）
https://blog.csdn.net/u012369271/article/details/72848102
### 5.nginx 反向代理解决跨域问题
https://blog.csdn.net/qq_34629352/article/details/53571744
### 6.nginx 详细配置
https://www.cnblogs.com/knowledgesea/p/5175711.html
http://www.cnblogs.com/zhouxinfei/p/7862315.html
### 7.关于Vue实例的生命周期created和mounted的区别
https://segmentfault.com/a/1190000008570622
### 8.vue 页面跳转
https://www.cnblogs.com/eva3288/p/8204713.html
### 9.Vue.js——60分钟快速入门
