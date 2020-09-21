<template>
<div>
  <el-table :data="userInfo" border style="width: 100%">
    <el-table-column type='index' width="180" align='center'>
    </el-table-column>
    <el-table-column label="创建日期" width="180" align='center'>
      <template v-slot='m'>
        {{m.row.create_time | formateDate}}
      </template>
    </el-table-column>
    <el-table-column prop="username" label="用户名" width="180" align='center'>
    </el-table-column>
    <el-table-column prop="role_name" label="职位" align='center'>
    </el-table-column>
    <el-table-column prop="mobile" label="电话" align='center'>
    </el-table-column>
    <el-table-column prop="email" label="邮箱" align='center'>
    </el-table-column>
    <el-table-column label="权限" align='center'>

      <!--要是对自定义的内容不满意可以用插槽-->
      <template v-slot='k'>
        <el-switch v-model="k.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="changeSwitch(k.row)">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column label="修改" align='center' width='180px'>
      <template v-slot='update'>
        <el-tooltip class="item" effect="dark" content="删除" placement="top">
          <el-popconfirm title="您确定要删除该用户吗？" icon="el-icon-info" iconColor="red" @onConfirm="remove(update.row.id)">
            <i class="el-icon-delete-solid" slot="reference"></i>
          </el-popconfirm>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="修改" placement="top">
          <i class="el-icon-edit" @click="edit(update.row.id)"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="分配" placement="top">
          <i class="el-icon-edit-outline" @click="assignRoels(update.row)"></i>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
  <assign-roles-dialog :dialogTableVisible='showDialog' @cancelDialog='hiddenDialog' @confirmDialog='dialogConfirm' :user='userList' :options='allRights' />
</div>
</template>

<script>
import AssignRolesDialog from './AssignRolesDialog'
export default {
  name: 'cardtable',
  props: {
    userInfo: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      showDialog: false,
      userList: {},
      allRights: [],
      currentUserId: 0
    }
  },
  methods: {
    // -------------------------------------------网络请求---------------------------------
    getAllRights() {
      return this.$http.get('roles')
    },
    updataRight(rightId) {
      return this.$http.put(`users/${this.currentUserId}/role`, {
        rid: rightId
      })
    },

    // -------------------------------------------其它操作---------------------------------
    remove(id) {
      this.$http.delete('users/' + id).then(res => {
        if (res.status === 200) {
          location.reload()
          this.$message.success('删除成功')
        }

      })
    },
    edit(id) {
      this.$bus.$emit('kkk', id)
    },

    // 只要开关发生状态改变就从数据库修改数据
    changeSwitch(e) {
      this.$bus.$emit('updateState', e)
    },
    assignRoels(value) {
      this.currentUserId = value.id
      this.showDialog = true
      this.userList = value
      this.getAllRights().then(res => {
        if (res.data.meta.status === 200) {
          this.allRights = res.data.data
        } else {
          this.$message.error('分配权限失败')
        }
      })
    },
    hiddenDialog() {
      this.allRights = []
      this.showDialog = false

    },
    dialogConfirm(rightId) {
      this.updataRight(rightId).then(res => {
        if (res.data.meta.status === 200) {
          this.$emit('updataUserInfo')
          this.$message.success('设置权限成功')
        } else {
          this.$message.error('设置权限失败')
        }
      })
      this.showDialog = false
    }

  },
  components: {
    AssignRolesDialog
  }

}
</script>

<style scoped>
.el-table {
  margin-top: 40px;
  text-align: center;
}

i {
  position: relative;
  right: 15px;
  margin-left: 30px;
  transform: scale(1.5);
  cursor: pointer;
}
</style>
