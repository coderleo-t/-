<style>
.el-cascader-menu {
  height: 300px;
}

.paramsCascader {
  margin-top: 30px;
  margin-left: 30px;
}

.el-tabs {
  margin-top: 30px;
}

.paramsTable {
  margin-top: 20px;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.expandTag {
  margin: 0 10px;
}
</style>
<template>
<div>
  <span>选择商品分类</span>
  <el-cascader class="paramsCascader" v-model="selectKeys" :options="shopOptions" :props="{ value: 'cat_id',
        label: 'cat_name',children: 'children',expandTrigger: 'hover' }" @change="handleChange" clearable></el-cascader>

  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="动态参数" name="many">
      <el-button type='primary' :disabled='isDisabel' @click="paramsDialogVisible=true,label='动态参数',isEdit=false">添加动态参数</el-button>

      <el-table class="paramsTable" border v-show="!isDisabel" :data="manyDatas" style="width: 100%">
        <el-table-column type="expand" v-slot='expandData'>
          <el-tag class="expandTag" closable v-show="expandData.row.attr_vals" v-for="(k, index) in expandData.row.attr_vals" @close="handleClose(index,expandData.row)" :key='index'>{{k}}</el-tag>
          <el-input class="input-new-tag" v-if="expandData.row.inputVisible" v-model="expandData.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="$event.target.blur" @blur="handleInputConfirm(expandData.row)">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput(expandData.row)">+ New Tag</el-button>
        </el-table-column>
        <el-table-column type="index" label='#'>
        </el-table-column>
        <el-table-column prop="attr_name" label="参数名称">
        </el-table-column>
        <el-table-column label="操作" align='center' v-slot='manyOperation'>
          <el-button type='primary' @click="manyEdit(manyOperation.row)">编辑</el-button>
          <el-button type='danger' @click="manyDelete(manyOperation.row)">删除</el-button>
        </el-table-column>
      </el-table>

    </el-tab-pane>

    <el-tab-pane label="静态参数" name="only">
      <el-button type='primary' :disabled='isDisabel' @click="paramsDialogVisible=true,label='静态参数',isEdit=false">添加静态参数</el-button>

      <el-table class="paramsTable" border v-show="!isDisabel" :data="onlyDatas" style="width: 100%">
        <el-table-column type='expand' v-slot='expandData'>
          <el-tag class="expandTag" closable v-show="expandData.row.attr_vals" v-for="(k, index) in expandData.row.attr_vals" @close="handleClose(index,expandData.row)" :key='index'>{{k}}</el-tag>
          <el-input class="input-new-tag" v-if="expandData.row.inputVisible" v-model="expandData.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="$event.target.blur" @blur="handleInputConfirm(expandData.row)">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput(expandData.row)">+ New Tag</el-button>
        </el-table-column>
        <el-table-column type="index" label='#'>
        </el-table-column>
        <el-table-column prop="attr_name" label="属性名称">
        </el-table-column>
        <el-table-column label="操作" align='center' v-slot='onlyOperation'>
          <el-button type='primary' @click="onlyEdit(onlyOperation.row)">编辑</el-button>
          <el-button type='danger' @click="onlyDelete(onlyOperation.row)">删除</el-button>
        </el-table-column>
      </el-table>

    </el-tab-pane>
  </el-tabs>

  <el-dialog :visible.sync="paramsDialogVisible" @close='appendClose'>
    <el-form :model="appendForm" class="demo-ruleForm">
      <el-form-item :label='label' prop='params' label-width="100px">
        <el-input v-model="appendForm.params" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="paramsDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addOrEditParams">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      selectKeys: [],
      shopOptions: [],
      activeName: 'many',
      manyDatas: null,
      onlyDatas: null,
      paramsDialogVisible: false,
      appendForm: {
        params: ''
      },
      label: '动态参数',
      isEdit: false,
      updateData: {
        id: 0,
        attr_id: 0,
        attr_name: ''
      }
    }
  },
  methods: {
    handleChange() {
      if (this.selectKeys.length !== 3) {
        this.selectKeys = []
        return
      }
      this.getParams(this.selectKeys[this.selectKeys.length - 1])
    },
    addOrEditParams() {
      if (this.isEdit) {
        if (this.updateData.attr_name === this.appendForm.params) {
          this.paramsDialogVisible = false
        } else {
          // 发送修改的网络请求
          this.updateParams().then(() => {
            this.getParams(this.selectKeys[this.selectKeys.length - 1])
            this.paramsDialogVisible = false
          })
        }

      } else {
        if (this.appendForm.params.trim() === '') {
          return this.$message.error('请输入内容！')
        }
        // 发送添加数据的请求
        this.appendParams(this.selectKeys[this.selectKeys.length - 1]).then(() => {
          // 重新请求数据异步刷新页面
          this.getParams(this.selectKeys[this.selectKeys.length - 1])
          this.paramsDialogVisible = false
        })
      }

    },
    appendClose() {
      this.appendForm.params = ''
    },
    onlyEdit(data) {
      this.label = '修改后的名称'
      this.paramsDialogVisible = true
      this.appendForm.params = data.attr_name
      this.isEdit = true
      this.updateData.id = data.cat_id
      this.updateData.attr_id = data.attr_id
      this.updateData.attr_name = this.appendForm.params
    },
    onlyDelete(data) {
      this.deleteParams(data.cat_id, data.attr_id).then(() => {
        this.getParams(this.selectKeys[this.selectKeys.length - 1])
      })
    },
    manyEdit(data) {
      this.label = '修改后的名称'
      this.paramsDialogVisible = true
      this.appendForm.params = data.attr_name
      this.isEdit = true
      this.updateData.id = data.cat_id
      this.updateData.attr_id = data.attr_id
      this.updateData.attr_name = this.appendForm.params
    },
    manyDelete(data) {
      this.deleteParams(data.cat_id, data.attr_id).then(() => {
        this.getParams(this.selectKeys[this.selectKeys.length - 1])
      })
    },
    showInput(row) {
      row.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus()
      })
    },
    handleInputConfirm(row) {
      row.inputVisible = false
      if (row.inputValue.trim().length !== 0) {
        if (row.attr_vals) {
          row.attr_vals.push(row.inputValue)
        } else {
          row.attr_vals = [row.inputValue]
        }
        this.updateAttr_vals(row).then(() => {
          row.inputValue = ''
        })
      } else {
        return
      }
    },
    handleClose(index, row) {
      row.attr_vals.splice(index, 1)
      this.updateAttr_vals(row)
    },

    // --------------------------网络请求------------------------
    async getAllShop() {
      const {
        data: res
      } = await this.$http.get('categories')

      if (res.meta.status !== 200) {
        return this.$message.error('获取数据失败！')
      } else {
        return res
      }
    },
    handleClick() {
      if (this.selectKeys.length === 3) {
        this.getParams(this.selectKeys[this.selectKeys.length - 1])
      }
    },

    async getParams(id) {
      const {
        data: res
      } = await this.$http.get(`categories/${id}/attributes`, {
        params: {
          sel: this.activeName
        }
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取数据失败！' + res.meta.msg)
      } else {
        res.data.forEach((item) => {
          item.inputVisible = false
          item.inputValue = ''
          if (item.attr_vals) {
            item.attr_vals = item.attr_vals.split(' ')
          }
        })
        if (this.activeName === 'many') {
          this.manyDatas = res.data
        } else {
          this.onlyDatas = res.data
        }
      }
    },
    async appendParams(id) {
      const {
        data: res
      } = await this.$http.post(`categories/${id}/attributes`, {
        attr_name: this.appendForm.params,
        attr_sel: this.activeName
      })

      if (res.meta.status !== 201) {
        return this.$message.error('添加失败！' + res.meta.msg)
      } else {
        return this.$message.success('添加成功！')
      }
    },
    async deleteParams(id, attrId) {
      const {
        data: res
      } = await this.$http.delete(`categories/${id}/attributes/${attrId}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败！' + res.meta.msg)
      } else {
        return this.$message.success('删除成功！')
      }
    },
    async updateParams() {
      const {
        data: res
      } = await this.$http.put(`categories/${this.updateData.id}/attributes/${this.updateData.attr_id}`, {
        attr_name: this.appendForm.params,
        attr_sel: this.activeName
      })

      if (res.meta.status !== 200) {
        return this.$message.error('更新失败！' + res.meta.msg)
      } else {
        return this.$message.success('更新成功！')
      }
    },
    async updateAttr_vals(row) {
      const {
        data: res
      } = await this.$http.put(`categories/${row.cat_id}/attributes/${row.attr_id}`, {
        attr_name: row.attr_name,
        attr_sel: this.activeName,
        attr_vals: row.attr_vals.join(' ')
      })

      if (res.meta.status !== 200) {
        return this.$message.error('添加失败!' + res.meta.msg)
      }
    }
  },
  created() {
    this.getAllShop().then(res => {
      this.shopOptions = res.data
    })
  },
  computed: {
    isDisabel() {
      if (this.selectKeys.length === 3) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
