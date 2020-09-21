<style scoped>
  .el-table {
    margin-top: 80px;
  }
  .row-span {
    display: flex;
    border-bottom: 3px solid lightgray;
  }
  .el-col {
    padding-bottom: 10px;
    align-self: center;
  }
  .el-row{
    margin: 20px;
  }
  
  .col-three {
    display: flex;
    flex-wrap: wrap;
  }

</style>
<template>
  <div>
    <el-table
      :data='tableData'
      style="width: 100%" border >

      <!--表格展开项-->
      <el-table-column type="expand">
        <template v-slot="props">
          <el-row v-for='(item) of props.row.children' :key='item.id' class="row-span">
            <el-col :span='5'>
              <el-tag closable @close='tagClose(props.row, item.id)'>{{item.authName}}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <el-col :span='8'>
              <el-row  v-for='(iten) of item.children' :key='iten.id'>
                <el-tag type='warning' closable @close='tagClose(props.row, iten.id)'>{{iten.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-row>
            </el-col>
            <el-col :span='11' >
              <div v-for='(iteb) of item.children' :key='iteb.id' class="col-three">
                <el-row v-for='(itev) of iteb.children' :key='itev.id' >
                  <el-tag type='danger' closable @close='tagClose(props.row, itev.id)'>{{itev.authName}}</el-tag>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <pre>{{props.row.children.length === 0?isNullDes:''}}</pre>
        </template>
      </el-table-column>


      <el-table-column
        type="index"
        align='center'>
      </el-table-column>
      <el-table-column
        prop='roleName'
        label="角色名字"
        align='center'>
      </el-table-column>
      <el-table-column
        prop='roleDesc'
        label="角色描述"
        align='center'>
      </el-table-column>
      <el-table-column
        label="操作"
        align='center'>
        <template v-slot='opration'>
          <el-button type="primary" @click="editor(opration.row)">
            <i class="el-icon-edit">
            </i>
            编辑
          </el-button>
          <el-button type="danger">
            <i class="el-icon-delete">
            </i>
            删除
          </el-button>
          <el-button type="warning" @click="assignRight(opration.row)">
            <i class="el-icon-setting">
            </i>
            分配权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <assign-right-dialog :dialogFormVisible='showAssingRight' 
    :treeNodeValue='treeNode' @changeDialog='toggleDialog'
    :checkedId='checkTreeId' @confirmDialog='confirmDialog'/>
  </div>
</template>
<script>
import AssignRightDialog from './AssignRightDialog'
export default {
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isNullDes: '暂无数据',
      showAssingRight: false,
      treeNode: [],
      checkTreeId: [],
      currentRolesId: 0
    }
  },
  methods: {
    // --------------------------------------网络请求的操作--------------------------------------
    getTreeData() {
      return this.$http.get('rights/tree')
    },
    getTreeSelected(keyStr) {
      return this.$http.post(`roles/${this.currentRolesId}/rights`, {rids: keyStr})
    },

    // --------------------------------------权限的操作--------------------------------------
    editor(id) {
      console.log('触发了编辑操作'+ id)
    },
    assignRight(data) {
      this.currentRolesId = data.id
      this.getTreeData().then(res => {
        if(res.data.meta.status === 200) {
          this.treeNode = res.data.data
          this.getCheckTreeId(data)
          this.showAssingRight = true
        } else {
          this.$message.error('获取分配权限失败')
        }
      })
      
    },
    toggleDialog() {
      this.showAssingRight = false
      this.checkTreeId = []
    },
    confirmDialog(keyStr) {
      this.getTreeSelected(keyStr).then(res => {
        if(res.data.meta.status === 200) {
          this.$emit('updataRoles')
          this.$message.success('分配权限成功')
        } else {
          this.$message.error('分配权限失败')
        }
        this.showAssingRight = false
        this.checkTreeId = []
      })
    },
    getCheckTreeId(data) {
      while(!data.children) {
        this.checkTreeId.push(data.id)
        return
      }
      data.children.forEach(value => {
        this.getCheckTreeId(value)
      })

    },

    // --------------------------------------扩展标签的操作--------------------------------------
    tagClose(roles, rightsId) {
      this.$confirm('是否删除此标签?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('tagClose', roles, rightsId)
        }).catch(() => {
          this.$message.info('已取消删除')         
        });
    }
  },
  components: {
    AssignRightDialog
  }
}
</script>
