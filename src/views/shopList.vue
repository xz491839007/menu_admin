<template>
  <div class="fillcontain">
    <div class="shop_table_container">
      <div class="search-form">
        <el-form :inline="true"
                 :model='search_data'
                 ref="search_data"
                 class="demo-form-inline search-form">
          <el-form-item label="创建时间选择：">
            <el-date-picker v-model="search_data.startTime"
                            type="datetime"
                            placeholder="选择开始时间">
            </el-date-picker>
            <el-date-picker v-model="search_data.endTime"
                            type="datetime"
                            placeholder="选择结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       size="small"
                       icon="search"
                       @click='onSearchData("search_data")'>
              筛选
            </el-button>
          </el-form-item>
          <el-form-item class="btnRight">
            <el-button type="primary" size="small" icon="view" @click="onInitUserData()">
              添加
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table_container">
        <el-table
          :data="tableData"
          border
          highlight-current-row
          style="width:100%"
          row-key="id">
          <el-table-column
            prop="id"
            label="序号"
            width="80"
            align='center'>
          </el-table-column>
          <el-table-column
            prop="shopName"
            label="店铺名称"
            width="110"
            align='center'>
          </el-table-column>
          <el-table-column
            property="shopAddress"
            label="店铺地址"
            width="120"
            align='center'>
          </el-table-column>
          <el-table-column
            property="shopLab"
            label="店铺标签"
            width="140"
            align='center'>
          </el-table-column>
          <el-table-column
            property="shopType"
            label="店铺类型"
            width="140"
            align='center'>
          </el-table-column>
          <el-table-column
            property="creatingTime"
            label="创建时间"
            width="220"
            align='center'>
          </el-table-column>
          <el-table-column
            property="updateTime"
            label="最后登录时间"
            width="250"
            align='center'>
          </el-table-column>
          <el-table-column
            property="shopTel"
            label="联系电话"
            width="180"
            align='center'>
          </el-table-column>
          <el-table-column
            property="dealTime"
            label="截止日期"
            width="100"
            align='center'>
          </el-table-column>
          <el-table-column
            property="del_type"
            label="是否删除"
            width="70"
            align='center'>
          </el-table-column>
          <el-table-column
            prop="operation"
            align='center'
            label="操作"
            fixed="right"
            width="180"
          >
            <template slot-scope='scope'>
              <el-button
                type="warning"
                icon='edit'
                size="small"
                @click='onEditAdmin(scope.row)'
              >编辑</el-button>
              <el-button
                type="danger"
                icon='delete'
                size="small"
                @click='onDelAdmin(scope.row,scope.$index)'
                v-if="scope.row.del_type === '正常'"
              >删除</el-button>
              <!-- 这里是一个日志点！ -->
              <el-button
                type="success"
                icon='delete'
                size="small"
                @click='onRecoveAdmin(scope.row,scope.$index)'
                v-if="scope.row.del_type === '已删除'"
              >恢复</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="24">
            <div class="pagination">
              <el-pagination
                v-if='paginations.total > 0'
                :page-sizes="paginations.pageSizes"
                :page-size="paginations.pageSize"
                :layout="paginations.layout"
                :total="paginations.total"
                :current-page='paginations.page_index'
                @current-change='handleCurrentChange'
                @size-change='handleSizeChange'>
              </el-pagination>
            </div>
          </el-col>
        </el-row>

      </div>
      <!--弹出框-->
      <el-dialog :title="dialog.title"
                 :visible.sync="dialog.show"
                 :close-on-click-modal='false'
                 :close-on-press-escape='false'
                 :modal-append-to-body="false">
        <div class="form">
          <el-form ref="form"
                   :model="form"
                   :rules="form_rules"
                   :label-width="dialog.formLabelWidth">
            <el-form-item label="店铺名称：" :label-width="dialog.formLabelWidth">
              <el-input v-model="form.shopName" auto-complete="off" placeholder="请填写当前店铺名称" class="lang_width"></el-input>
            </el-form-item>
            <el-form-item label="店铺电话：" :label-width="dialog.formLabelWidth">
              <el-input v-model="form.shopTel" placeholder="请填写店铺的联系方式"></el-input>
            </el-form-item>
            <el-form-item label="密码：" :label-width="dialog.formLabelWidth">
              <el-input v-model="form.password" placeholder="请填写登录密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" :label-width="dialog.formLabelWidth">
              <el-input v-model="form.sure_password" placeholder="请再次填写登录密码"></el-input>
            </el-form-item>
            <el-form-item label="邮件地址：" :label-width="dialog.formLabelWidth">
              <el-input v-model="form.email" placeholder="请填写邮件地址">
                <template slot="append">.com</template>
              </el-input>
            </el-form-item>
            <el-form-item label="真实姓名：" :label-width="dialog.formLabelWidth">
              <el-input v-model="form.name" placeholder="请填写真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="dialog.formLabelWidth">
              <el-radio-group v-model="form.gender">
                <el-radio label=1>男性</el-radio>
                <el-radio label=2>女性</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="卡号或微信号：" :label-width="dialog.formLabelWidth">
              <el-input v-model="form.card_no" placeholder="请填写银行卡号或微信号" @blur="blurInputCard()"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="dialog.formLabelWidth">
              <el-autocomplete
                class="inline-input"
                v-model="form.card_type"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog.show = false">取 消</el-button>
          <el-button type="primary" @click= 'onInitSubmitUser(form)'>确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import mutils from '@/utils/mUtils'
import {queryshop, addshop} from '@/api/shop'

export default {
  name: 'shopList',
  data () {
    return {
      // 查询数目
      sortnum: 0,
      // 列表数据
      tableData: [],
      tableHeight: '',
      idFlag: false,
      editid: '',
      // 需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        pageSize: 20, // 1页显示多少条
        pageSizes: [5, 10, 15, 20], // 每页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      },
      search_data: {
        startTime: '',
        endTime: ''
      },
      // form参数
      form: {
        shopAccount: '',
        shopName: '',
        shopAddress: '',
        leg: '',
        lng: '',
        zone_code: '',
        shopLab: '',
        shopType: '',
        shopTel: '',
        shopSouce: '',
        shopImg: '',
        shopRemark: '',
        cardImg: '',
        userId: '',
        dealTime: '',
        del_type: ''
      },
      dialog: {
        width: '400px',
        show: false,
        title: '添加管理员用户',
        formLabelWidth: '120px'
      },
      form_rules: {
        // incomePayDes   : [
        //   {required: true, message : '收支描述不能为空！',trigger : 'blur'}
        // ],
        // income   : [
        //   { required: true, validator:validateData,trigger: 'blur'},
        // ],
        // pay   : [
        //   { required: true, validator:validateData,trigger: 'blur'},
        // ],
        // accoutCash   : [
        //   { required: true, validator:validateData,trigger: 'blur'},
        // ],
      },
      shopType: ['中餐', '快餐', '西餐', '宴会', '咖啡', '自助', '风味', '日料', '韩料', '泰料']
    }
  },
  components: {

  },
  created () {

  },
  mounted () {
    // 加载数据之前，先加载theme颜色
    this.getList()
    this.bankList = ['工商银行', '农业银行', '中国银行', '建设银行', '招商银行',
      '邮储银行', '交通银行', '浦发银行', '民生银行', '兴业银行', '平安银行',
      '中信银行', '华夏银行', '广发银行', '光大银行', '北京银行', '宁波银行']
  },
  methods: {
    getList ({
      page,
      pageSize,
      where
    } = {}) {
      var query = this.$route.query
      this.paginations.page_index = page || parseInt(query.page) || 1
      this.paginations.pageize = pageSize || parseInt(query.pageSize) || this.paginations.pageSize
      var data = {
        pageIndex: this.paginations.page_index,
        pageSize: this.paginations.pageSize
      }
      if (where) {
        data = Object.assign(data, where || {})
      }
      queryshop(data).then((response, error) => {
        if (response.data.status === 1) {
          let data = response.data
          let pages = data.page
          this.paginations.total = pages.total
          this.tableData = []
          data.data.forEach((item, index) => {
            // 是否删除（1.正常2.删除3.过期）
            let delType
            if (item.del_type === 1) {
              delType = '正常'
            } else if (item.del_type === 2) {
              delType = '已删除'
            } else {
              delType = '已过期'
            }
            const tableItem = {
              id: item.id,
              shopAccount: item.shopAccount,
              shopName: item.shopName,
              shopAddress: item.shopAddress,
              leg: item.leg,
              lng: item.lng,
              zone_code: item.zone_code,
              shopLab: item.shopLab,
              shopType: item.shopType,
              shopTel: item.shopTel,
              shopSouce: item.shopSouce,
              shopImg: item.shopImg,
              shopRemark: item.shopRemark,
              cardImg: item.cardImg,
              creatTime: item.creatTime,
              updateTime: item.updateTime,
              userId: item.userId,
              del_type: delType
            }
            this.tableData.push(tableItem)
          })
        } else {
          if (error) {
            alert('网络异常，请稍后再试！')
          } else {

          }
        }
      })
    },
    // 每页多少条切换
    handleSizeChange (pageSize) {
      this.getList({
        pageSize
      })
    },
    // 上下分页
    handleCurrentChange (page) {
      // 真正执行的方法
      this.sortnum = this.paginations.pageSize * (page - 1)
      this.getList({page})
    },
    // 筛选方法
    onSearchData (searchData) {
      console.log(searchData)
    },
    // 新增方法
    onInitUserData () {
      // 新增方法
      this.dialog.show = true
    },
    querySearch (queryString, cb) {
      let bankList = this.bankList
      let results = queryString ? bankList.filter() : bankList
      // var restaurants = this.restaurants;
      // var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // // 调用 callback 返回建议列表的数据
      cb(results)
    },
    handleSelect (item) {
      // console.log(item)
    },
    onInitSubmitUser (form) {
      // 新添加
      addshop().then((response, error) => {
        console.log('成功')
        if (response.data.status === 1) {

        } else {

        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .shop_table_container{
    /*background-color: red;*/
  }
  .search-form{
    width:100%;
    min-width:750px;
    .el-form-item{
      margin-bottom: 10px !important;
      .el-date-editor{
        width:200px;
        .el-input__inner{
          height:36px !important;
        }
      }
    }
  }
  .btu_div{
    background-color: red;
  }
  .btnRight{
    float: right;
    margin-right: 0px !important;
  }
  .form{
    display: flex;
  }
  .lang_width{
    width: 300px;
  }
</style>
