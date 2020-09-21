<template>
  <el-card>
   <dialog-el/>
    <div slot="header" class="clearfix">
      <span>用户管理</span>
    </div>

    <el-input placeholder="请输入内容"  @input='inputChange' v-model="queryArguments.query" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="getUser"></el-button>
    </el-input>
    
    <card-table :userInfo='userDetail' @updataUserInfo='updateUserDetail'/>
    <pagination :pageInfo='reqPageInfo' @perPage='changePagesize' @pagenum='changePagenum'/>
    
  </el-card>
</template>

<style scoped>
  .clearfix {
    text-align: center;
  }
  .input-with-select {
    width: 50%;
  }
 
</style>

<script>
import CardTable from './CardTable'
import Pagination from './Pagination'
import DialogEl from './DialogEl'
// import debounce from 'common/debounce.js'
export default {
  data() {
    return {
      queryArguments: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      reqPageInfo: {
        pagenum: 0,
        total: 0
      },
      userDetail: [],
      timer: null
    }
  },
  components: {
    CardTable,
    Pagination,
    DialogEl
  },
  methods: {
    getUser() {
      this.$http.get('/users',{params: this.queryArguments}).then(res => {
        if(!res.data.meta.status === 200) return this.$message.error('获取用户数据出错！')
        this.reqPageInfo.pagenum = res.data.data.pagenum
        this.reqPageInfo.total = res.data.data.total
        this.userDetail = res.data.data.users
      })
    },
    changePagesize(e) {
      this.queryArguments.pagesize = e
      this.getUser()
    },
    changePagenum(e) {
      this.queryArguments.pagenum = e
      this.getUser()
    },
    inputChange() {
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$http.get('/users',{params: this.queryArguments}).then(res => {
          if(!res.data.meta.status === 200) return this.$message.error('获取用户数据出错！')
          this.reqPageInfo.pagenum = res.data.data.pagenum
          this.reqPageInfo.total = res.data.data.total
          this.userDetail = res.data.data.users
        })
      }, 800)
    },
    updateUserDetail() {
      this.getUser()
    }
  },
  created() {
    this.getUser()
  }
}
</script>