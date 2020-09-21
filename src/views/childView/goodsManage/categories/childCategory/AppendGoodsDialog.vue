<style>
/*cascader选择框如果太长则需要加入这一行设置高度才行，且不能加scoped*/
.el-cascader-menu {
  height: 300px;
}

.goodsCascader {
  width: 100%;
}
</style>
<template>
<div>
  <el-button class="append" type="primary" @click="showDialog()">添加分类</el-button>

  <!--:visible.sync后面为自定义绑定的真或者假-->
  <el-dialog :visible.sync="dialogTableVisible" @close='dialogClose'>
    <el-form :model="ruleForm" :rules="rules" ref="cateForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="分类名称" prop="cat_name">
        <el-input v-model="ruleForm.cat_name"></el-input>
      </el-form-item>
      <el-form-item label="父级分类">

        <!--options用来指定数据源，props用来指定配置对象,v-model用来保存选中的数据实现双向数据绑定-->
        <el-cascader class="goodsCascader" v-model="categoryKeys" :options="categoryOptions" :props="{value: 'cat_id',
        label: 'cat_name',children: 'children', checkStrictly: true, expandTrigger: 'hover'}" @change="handleChange" clearable />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button type="primary" @click="cateCommit">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
      ruleForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      rules: {
        cat_name: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        }]
      },
      categoryKeys: [],
      categoryOptions: []
    }
  },
  methods: {
    showDialog() {
      this.getCategoryGoods().then(data => {
        this.categoryOptions = data
      })

      this.dialogTableVisible = true
    },
    dialogClose() {
      this.$refs.cateForm.resetFields()
      this.categoryKeys = []
      this.ruleForm.cat_name = ''
      this.ruleForm.cat_pid = 0
      this.ruleForm.cat_level = 0
    },
    handleChange() {
      this.ruleForm.cat_pid = this.categoryKeys[this.categoryKeys.length - 1]
      this.ruleForm.cat_level = this.categoryKeys.length
    },
    cateCommit() {
      this.$refs.cateForm.validate((bool) => {
        if (bool) {
          // 发送请求
          this.addCategory().then(() => {
            this.$emit('refreshTable')

            // 将对话框隐藏
            this.$message.success('添加分类成功！')
            this.dialogTableVisible = false
          })
        } else {
          this.$message.error('分类名称必须填写')
        }
      })
    },

    // ---------------网络请求--------------
    async getCategoryGoods() {
      const {
        data: res
      } = await this.$http.get('categories', {
        params: {
          type: 2
        }
      })
      if (res.meta.status !== 200) {
        return this.$message({
          type: 'error',
          message: '请求失败'
        })
      }
      return res.data
    },
    async addCategory() {
      console.log(this.ruleForm)
      const {
        data: res
      } = await this.$http.post('categories', this.ruleForm)

      if (res.meta.status !== 201) {
        return this.$message.error('创建失败！' + res.meta.msg)
      } else {
        return res
      }
    }
  }
}
</script>
