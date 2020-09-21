<style scoped>


</style>
<template>
  <el-dialog title="分配权限" :visible.sync="showDialog" @close='disappearDialog'>
    <el-tree
      :data="treeNodeValue"
      show-checkbox
      node-key="id"
      :default-checked-keys="checkedId"
      :props="defaultProps" default-expand-all
      check-on-click-node ref='elTree'>
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="disappearDialog">取 消</el-button>
      <el-button type="primary" @click="confirmDialog">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default() {
        return false
      } 
    },
    treeNodeValue: {
      type: Array,
      default() {
        return []
      } 
    },
    checkedId: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      showDialog: this.dialogFormVisible
    }
  },
  methods: {
    // ------------------------------------dialog的确定和取消操作------------------------
    disappearDialog() {
      this.$emit('changeDialog')
    },
    confirmDialog() {
      const halfKey = this.$refs.elTree.getHalfCheckedKeys()
      const key = this.$refs.elTree.getCheckedKeys()
      const allKey = halfKey.concat(key)
      const keyStr = allKey.join(',')
      
      this.$emit('confirmDialog', keyStr)
    }
  },
  watch: {
    dialogFormVisible(value) {
      this.showDialog = value
    }
  }
}
</script>
