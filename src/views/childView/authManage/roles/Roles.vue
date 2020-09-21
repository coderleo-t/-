<style scoped>

</style>

<template>
  <div>
    <breadcrumb :breadFont="['权限管理', '角色列表']"/>
    <el-card>
      <div class="text item">
        <roles-dialog-el/>
      </div>
      <roles-table :tableData='rolesTableData' @tagClose='closeTag' @updataRoles='updataRolesTableData'/>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from 'components/common/Breadcrumb.vue'
import RolesDialogEl from './childRoles/RolesDialogEl'
import RolesTable from './childRoles/RolesTable'

export default {
  data() {
    return {
      rolesTableData: []
    }
  },
  components: {
    Breadcrumb,
    RolesDialogEl,
    RolesTable
  },
  methods: {
  // ------------------------------------网络请求------------------------------
    getRoelsData() {
      this.$http.get('roles').then(res => {
        this.rolesTableData = res.data.data
      })
    },
    deleteTag(roles, rightsId) {
      this.$http.delete(`roles/${roles.id}/rights/${rightsId}`).then(res => {
        if(res.data.meta.status === 200) {
          this.$message.success('删除成功')
      
          // 将修改过后那一行的最新数据返回并赋给原来那一行的数据，只会发生异步刷新
          roles.children = res.data.data
        } else {
          this.$message.error('删除失败')
        }
      })
    },

    // -----------------------------------其他操作---------------------------------
    closeTag(roles, rightsId) {
      this.deleteTag(roles, rightsId)
    },
    updataRolesTableData() {
      this.getRoelsData()
    }
  },
  created() {
    this.getRoelsData()
  }
  
}
</script>
