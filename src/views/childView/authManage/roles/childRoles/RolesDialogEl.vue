<style scoped>
 .append {
   float: left;
 }
</style>
<template>
  <div>
    <el-button class="append" type="primary" @click="dialogTableVisible = true">添加角色</el-button>
    <!--:visible.sync后面为自定义绑定的真或者假-->
    <el-dialog :visible.sync="dialogTableVisible">
      <el-form  :model="addRoles" >
        <el-form-item label="用户名">
          <el-input v-model="addRoles.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
      addRoles: {
        name: ''
      }
    }
  }
}
</script>
