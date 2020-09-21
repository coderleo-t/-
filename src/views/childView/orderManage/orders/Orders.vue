<style scoped>

</style>
<template>
<div>
  <breadcrumb :breadFont="['订单管理', '订单列表']" />
  <el-card>
    <el-input placeholder="请输入内容" v-model="queryInfo.query" style="width: 50%">
      <el-button slot="append" icon="el-icon-search" @click="searchOrders"></el-button>
    </el-input>

    <order-table @showDialogPD='showDialogPD' :tableData='goodsInfo' :total='total' :tableInfo='queryInfo' @changeCurrentPage='changeCurrentPage' @changePageSize='changePageSize' />
  </el-card>

  <el-dialog title='物流信息' :visible.sync="dialogPDVisible">
    <el-timeline>
      <el-timeline-item v-for="(activity, index) in PDInfo" :key="index" :timestamp="activity.ftime">
        {{activity.context}}
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
</div>
</template>

<script>
import Breadcrumb from '@/components/common/Breadcrumb'
import OrderTable from './childOrderManage/OrderTable'

export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      goodsInfo: [],
      total: 0,
      dialogPDVisible: false,
      PDInfo: []
    }
  },
  components: {
    Breadcrumb,
    OrderTable
  },
  created() {
    this.getOrderTableData()
  },
  methods: {
    searchOrders() {
      this.getOrderTableData()
    },
    changePageSize(p) {
      this.queryInfo.pagesize = p
      this.getOrderTableData()
    },
    changeCurrentPage(p) {
      this.queryInfo.pagenum = p
      this.getOrderTableData()
    },
    showDialogPD() {
      this.getPDData().then(() => {
        this.dialogPDVisible = true
      })
    },

    // -------------------网络请求--------------------------------
    async getOrderTableData() {
      const {
        data: res
      } = await this.$http.get('orders', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取订单数据失败！' + res.meta.msg)
      }
      this.goodsInfo = res.data.goods
      this.total = res.data.total
    },
    async getPDData() {
      const {
        data: res
      } = await this.$http.get('/kuaidi/1106975712662')

      if (res.meta.status !== 200) {
        return this.$message.error('获取物流信息失败！' + res.meta.msg)
      }
      this.PDInfo = res.data
    }
  }
}
</script>
