<style scoped>

</style>
<template>
<div>
  <breadcrumb :breadFont="['商品名称', '商品管理']" />
  <el-card>
    <append-goods-dialog @refreshTable='refreshTable' />
    <goods-table :tableInfo='goodsInfo' @refreshTable='refreshTable' />
    <goods-pagination :pageInfo='goodsPageInfo' @pageChange='updataCurrentPage' />
  </el-card>

</div>
</template>

<script>
import Breadcrumb from 'components/common/Breadcrumb'
import AppendGoodsDialog from './childCategory/AppendGoodsDialog'
import GoodsTable from './childCategory/GoodsTable'
import GoodsPagination from './childCategory/GoodsPagination'

export default {
  data() {
    return {
      requestInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      goodsInfo: [],
      goodsPageInfo: {
        pagenum: 1,
        pagesize: 5,
        total: 30
      }
    }
  },
  components: {
    Breadcrumb,
    AppendGoodsDialog,
    GoodsTable,
    GoodsPagination
  },
  methods: {
    // -----------------------------------------网络请求--------------------------------------
    getTableInfo() {
      this.$http.get('categories', {
        params: this.requestInfo
      }).then(res => {
        if (res.data.meta.status === 200) {
          this.goodsInfo = res.data.data.result
          this.goodsPageInfo.pagenum = res.data.data.pagenum + 1
          // this.goodsPageInfo.pagesize = res.data.data.pagesize
          this.goodsPageInfo.total = res.data.data.total
        } else {
          this.$message.error('请求数据失败')
        }
      })
    },

    // -----------------------------------------其它操作--------------------------------------
    updataCurrentPage(currentPage) {
      this.requestInfo.pagenum = currentPage
      this.getTableInfo()
    },
    refreshTable() {
      this.getTableInfo()
    }
  },
  created() {
    this.getTableInfo()
  }

}
</script>
