<style scoped>


</style>
<template>
  <el-dialog title="分配权限" :visible.sync="dialogVisible" @close='cancelDialog'>
    <div>
      <p>当前用户: {{user.username}}</p>
      <p>当前权限: {{user.role_name}}</p>
    </div>
    <div>
      选择权限：
        <el-select v-model="roleName" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button type="primary" @click="confirmDialog">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogTableVisible: {
      type: Boolean,
      default() {
        return false
      }
    },
    user: {
      type: Object,
      default() {
        return {}
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: this.dialogTableVisible,
      roleName: ''
    }
  },
  methods: {
    cancelDialog() {
      this.$emit('cancelDialog')
      this.roleName = ''
    },
    confirmDialog() {
      this.$emit('confirmDialog', this.roleName)
      this.roleName = ''
    }
  },
  watch: {
    dialogTableVisible(value) {
      this.dialogVisible = value
    }
  }
}
</script>
