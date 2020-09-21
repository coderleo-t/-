<style scoped>
  .block {
    text-align: center;
    margin-top: 30px;
    padding-bottom: 80px;
  }

</style>
<template>
 <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pagenum"
      :page-sizes="[1, 3, 5]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    pageInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleSizeChange(e) {
      this.$emit('perPage', e)
    },
    handleCurrentChange(e) {
      this.$emit('pagenum', e)
    }
  }
}
</script>
