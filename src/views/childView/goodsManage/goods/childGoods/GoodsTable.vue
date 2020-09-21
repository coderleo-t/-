<style scoped>
.el-table {
  margin-top: 40px;
}
</style>
<template>
<div>
  <el-table :data='tableData' border style="width: 100%">
    <el-table-column type='index' label="#" width="50" align='center'>
    </el-table-column>
    <el-table-column prop="goods_name" label="商品名称" align='center'>
    </el-table-column>
    <el-table-column prop="goods_price" label="商品价格(元)" width="100" align='center'>
    </el-table-column>
    <el-table-column prop="goods_weight" label="商品重量" width="100" align='center'>
    </el-table-column>
    <el-table-column v-slot='date' label="创建时间" width="100" align='center'>
      {{date.row.upd_time | formateDate}}
    </el-table-column>
    <el-table-column label="操作" width="200" align='center' v-slot='v'>
      <el-button type='warning' size='mini'>
        <i class="el-icon-edit"></i>
        编辑
      </el-button>
      <el-button type='danger' size='mini' @click="deleteGoods(v.row)">
        <i class="el-icon-delete"></i>
        删除
      </el-button>
    </el-table-column>
  </el-table>

  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableInfo.pagenum" :page-sizes="[1, 2, 5]" :page-size="tableInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
  </el-pagination>
</div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    total: {
      type: Number,
      default () {
        return 0
      }
    },
    tableInfo: {
      type: Object,
      default () {
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
      this.$emit('pagesizeChange', e)
    },
    handleCurrentChange(e) {
      this.$emit('currentPageChange', e)
    },
    deleteGoods(row) {
      this.$emit('deleteGoods', row)
    }
  }
}
</script>
