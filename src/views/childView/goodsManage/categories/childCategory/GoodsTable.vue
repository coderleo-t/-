<style scoped>
.shop-table {
  margin-top: 30px;
}
</style>
<template>
<div class="shop-table">
  <sv-table :data="tableInfo" :columns='columns' show-index index-text='#' :selection-type='false' :expand-type='false' empty-text=''>
    <template slot='myValid' slot-scope='scope'>
      <i style="color: lightgreen" v-if="scope.row.cat_deleted === false" class="el-icon-circle-check"></i>
      <i style="color: red" v-else class="el-icon-circle-close"></i>
    </template>
    <template slot='myLevel' slot-scope='scope'>
      <el-tag v-if="scope.row._level === 1">{{scope.row._level}}</el-tag>
      <el-tag v-else-if="scope.row._level === 2" type='warning'>{{scope.row._level}}</el-tag>
      <el-tag v-else type='danger'>{{scope.row._level}}</el-tag>
      <div></div>
    </template>
    <template slot='operation' slot-scope='scope'>
      <el-button type='warning' size='mini' @click="shopsEdit(scope.row)">
        <i class="el-icon-edit"></i>
        编辑
      </el-button>
      <el-button type='danger' size='mini' @click="shopsDelete(scope.row)">
        <i class="el-icon-delete"></i>
        删除
      </el-button>
    </template>
  </sv-table>

  <el-dialog :visible.sync="dialogUpdateVisible" title="修改名称">
    <el-form :model="ruleEditForm" ref="cateEditForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品名称" props="cat_name">
        <el-input v-model="ruleEditForm.cat_name" />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogUpdateVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmUpdate">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  props: {
    tableInfo: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      columns: [{
          label: '商品分类',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'myValid'
        },
        {
          label: '分类级数',
          type: 'template',
          template: 'myLevel'
        },
        {
          label: '操作',
          type: 'template',
          template: 'operation'
        }
      ],
      dialogUpdateVisible: false,
      ruleEditForm: {
        cat_id: undefined,
        cat_name: ''
      }
    }
  },
  methods: {
    shopsEdit(value) {
      this.dialogUpdateVisible = true
      this.ruleEditForm.cat_name = value.cat_name
      this.ruleEditForm.cat_id = value.cat_id
      this.ruleEditForm.cat_level = value.cat_level
      console.log('执行了编辑操作')
    },
    shopsDelete(value) {
      this.$confirm('是否删除此标签?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteCategory(value.cat_id).then(() => {
          this.$emit('refreshTable')
          this.$message.success('删除成功！')
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      });
    },
    confirmUpdate() {
      if (this.ruleEditForm.cat_name.trim() !== '') {
        this.updateCate(this.ruleEditForm).then(() => {
          this.$emit('refreshTable')
          this.dialogUpdateVisible = false
          this.$message.success('更新数据成功')
        })
      } else {
        this.$message.error('修改的名称不能为空！')
      }
    },

    // ---------------------网络请求-------------------
    async updateCate(data) {
      console.log(data)
      const {
        data: res
      } = await this.$http.put(`categories/${data.cat_id}`, {
        cat_name: data.cat_name
      })
      if (res.meta.status !== 200) {
        return this.$message.error('更新数据失败！' + res.meta.msg)
      } else {
        return res
      }
    },
    async deleteCategory(id) {
      const {
        data: res
      } = await this.$http.delete(`categories/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败！')
      } else {
        return res
      }
    }
  }
}
</script>
