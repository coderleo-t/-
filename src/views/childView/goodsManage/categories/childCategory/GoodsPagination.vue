<style scoped>
  .el-pagination {
    padding: 50px 0;
    text-align: center;
  }

</style>
<template>
  <el-pagination
    @current-change="handlePageChange"
    :current-page="pageInfo.pagenum"
    :page-size="5"
    layout="total, prev, pager, next, jumper"
    :total="pageInfo.total">
  </el-pagination>
</template>
<script>
export default {
  props: {
    pageInfo: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
      pagesizes: 5
    }
  },
  methods: {
    handlePageChange(currentPage) {
      this.$emit('pageChange', currentPage)
    }
  }
}
</script>
