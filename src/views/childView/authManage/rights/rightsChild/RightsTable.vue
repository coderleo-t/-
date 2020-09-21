<template>
  <el-table
    :data="rightsInfo"
    border
    style="width: 100%">
    <el-table-column
      type='index'
      width="180" align='center'>
    </el-table-column>
    <el-table-column
      prop='authName'
      label="权限名称"
      width="180" align='center'>
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="180" align='center'>
    </el-table-column>
    <el-table-column
      
      label="权限等级" align='center'>
      <template v-slot='myLevel'>
        <el-tag v-show="myLevel.row.level == 0">{{myLevel.row.level}}</el-tag>
        <el-tag type="success" v-show="myLevel.row.level == 1">{{myLevel.row.level}}</el-tag>
        <el-tag type="danger" v-show="myLevel.row.level == 2">{{myLevel.row.level}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'rightstable',
    props: {
      rightsInfo: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .el-table {
    margin-top: 40px;
  }

</style>