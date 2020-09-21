<style scoped>
.el-table {
  margin-top: 30px;
}
</style>
<template>
<div>
  <el-table :data='tableData' border style="width: 100%">
    <el-table-column type='index' label="#" width="50" align='center'>
    </el-table-column>
    <el-table-column prop="order_number" label="订单编号" align='center'>
    </el-table-column>
    <el-table-column prop="order_price" label="订单价格" width="100" align='center'>
    </el-table-column>
    <el-table-column v-slot='isPay' label="是否付款" width="100" align='center'>
      <el-tag type='success' v-if="isPay.row.pay_status === 0">是</el-tag>
      <el-tag type='danger' v-else>否</el-tag>
    </el-table-column>
    <el-table-column prop="is_send" label="是否发货" width="100" align='center'>
    </el-table-column>
    <el-table-column v-slot='v' label="下单时间" width="100" align='center'>
      {{v.row.create_time | formateDate}}
    </el-table-column>
    <el-table-column label="操作" width="200" align='center'>
      <el-button type='warning' size='mini' @click="showPD">
        <i class="el-icon-edit"></i>
        物流
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
    handleCurrentChange(p) {
      this.$emit('changeCurrentPage', p)
    },
    handleSizeChange(p) {
      this.$emit('changePageSize', p)
    },
    showPD() {
      this.$emit('showDialogPD')
    }
  }
}
</script>
