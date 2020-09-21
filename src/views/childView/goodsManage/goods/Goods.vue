<style scoped>

</style>
<template>
<div>
  <breadcrumb :breadFont='["商品管理","商品列表"]' />
  <el-card>
    <el-row :gutter='100'>
      <el-col :span='12'>
        <el-input placeholder="请输入内容" v-model="queryInfo.query">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-button type='primary' @click="jumpRouter">添加参数</el-button>
    </el-row>

    <goods-table :tableData='goodsData' :total='total' :tableInfo='queryInfo' @pagesizeChange='pagesizeChange' @currentPageChange='currentPageChange' @deleteGoods='deleteGoods' />
  </el-card>

</div>
</template>

<script>
import Breadcrumb from '@/components/common/Breadcrumb'
import GoodsTable from './childGoods/GoodsTable'

export default {
  data() {
    return {
      queryInfo: {
        // 查询参数
        query: '',
        // 当前页码数
        pagenum: 1,
        // 每页显示条数
        pagesize: 5
      },
      total: 0,
      goodsData: []
    }
  },
  components: {
    Breadcrumb,
    GoodsTable,
  },
  methods: {
    pagesizeChange(p) {
      this.queryInfo.pagesize = p
      this.getTableData()
    },
    currentPageChange(p) {
      this.queryInfo.pagenum = p
      this.getTableData()
    },
    search() {
      this.getTableData()
    },
    deleteGoods(row) {
      this.deleteGoodsDate(row).then(() => {
        this.getTableData()
      })
    },
    jumpRouter() {
      this.$router.push('/backstage/goods/appendGoods')
    },

    // ----------------------------网络请求----------------------
    async getTableData() {
      const {
        data: res
      } = await this.$http.get('goods', {
        params: this.queryInfo
      })

      if (res.meta.status !== 200) {
        return this.$message.error('获取列表数据失败！' + res.meta.msg)
      } else {
        this.goodsData = res.data.goods
        this.total = res.data.total
      }
    },
    async deleteGoodsDate(row) {
      const {
        data: res
      } = await this.$http.delete(`goods/${row.goods_id}`)

      if (res.meta.status !== 200) {
        return this.$message.error('删除失败!' + res.meta.msg)
      } else {
        return this.$message.success('删除成功！')
      }
    }
  },
  created() {
    this.getTableData()
  }
}
</script>
