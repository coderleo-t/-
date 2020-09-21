<style scoped>
 .append {
    float: right;
  }

</style>
<template>
  <div>
    <el-button class="append" type="primary" @click="dialogTableVisible = true">添加用户</el-button>
    <!--:visible.sync后面为自定义绑定的真或者假-->
    <el-dialog :title="titles" :visible.sync="dialogTableVisible"  @close='clearDia'>
      <el-form :rules='addCheck' :model="addUser" ref='dialog'>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop='username'>
          <el-input v-model="addUser.username" autocomplete="off" :disabled='isDisable'></el-input>
        </el-form-item>
        <el-form-item label="密码" v-if='showPassword' :label-width="formLabelWidth" prop='password'>
          <el-input v-model="addUser.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop='email'>
          <el-input v-model="addUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop='mobile'>
          <el-input v-model="addUser.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {

    // 编写表单的验证表达式
    const checkEmail = (rule, value, callback) => {
      if(!value) return callback(new Error('邮箱不能为空'))
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if(reg.test(value)) return callback()
      else {
        callback(new Error('请填写正确的邮箱'))
      }
    }
    const checkPhone = (rule, value, callback) => {
      if(!value) return callback(new Error('电话不能为空'))
      const reg = /^1[3456789]\d{9}$/
      if(reg.test(value)) return callback()
      else {
        callback(new Error('请填写正确的电话'))
      }
    }
    return {
      formLabelWidth: '120px',
      dialogTableVisible: false,
      addUser: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 是否禁用修改用户名
      isDisable: false,
      // 是否显示对密码的修改
      showPassword: true,
      titles: '添加用户',
      updateId: 0,
      addCheck: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 4, max: 18, message: '密码必须介于4到18位', trigger: 'blur'}
        ],
        email: [ 
          {validator: checkEmail, trigger: 'blur'}
        ],
        mobile: [
          {validator: checkPhone, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    clearDia() {
      setTimeout(() => {
        this.titles = '添加用户'
        this.$refs.dialog.resetFields()
        this.isDisable = false
        this.showPassword = true
      }, 300)
    },
    confirmAdd() {
      // 如果是创建用户则发起创建用户请求
      if(!this.isDisable) {
        this.$refs.dialog.validate(res => {
          if(!res) return this.$message.error('请仔细核对您注册的内容是否符合要求')
          this.$http.post('/users', this.addUser).then(() => {
            this.$message.success('创建成功')
          })
          this.dialogTableVisible = false
        })
      }
      else {
      // 如果是修改用户则发起修改用户请求
        this.$refs.dialog.validate(res => {
          if(!res) return this.$message.error('请仔细核对您修改的内容是否符合要求')
          this.$http.put('users/' + this.updateId, {
            email: this.addUser.email,
            mobile: this.addUser.mobile
          })
          location.reload()
          this.$message.success('修改数据成功')
          this.dialogTableVisible = false
        })
      }
    }
  },
  mounted() {
    // 监听用户数据的修改
    this.$bus.$on('kkk', (value) => {
      this.updateId = value
      this.dialogTableVisible = true
      this.isDisable = true
      this.showPassword = false
      this.titles = '修改用户'
      this.$http.get(`users/${value}`).then(res => {
        this.addUser.username = res.data.data.username
        this.addUser.email = res.data.data.email
        this.addUser.mobile = res.data.data.mobile
      })
    })
  }
}
</script>
