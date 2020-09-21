<style scoped>


  .formCheck {
    width: 30vw;
    height: 10vh;
    margin-left: 50%;
    padding-top: 20%;
    transform: translate(-50%, -50%);
  }

</style>
<template>
  <div class="formCheck">
    <el-form ref='formel' :model="inputText" :rules='loginRules' status-icon   label-width="60px">

      <el-form-item prop='account' label="账号" >
        <el-input  v-model="inputText.account" prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>

      <el-form-item prop='password' label="密码" >
        <el-input  v-model="inputText.password" type='password' prefix-icon="el-icon-lock"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('formel')">提交</el-button>
        <el-button @click="resetForm('formel')">重置</el-button>
      </el-form-item>
      
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'formel',
  data() {
    return {
      inputText: {
        'account': 'admin',
        'password': '123456'
      },

      //在form表单里面
      loginRules: {
        account: [
          {required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if(!valid) return
        this.$http.post('/login',{
          username: this.inputText['account'],
          password: this.inputText['password']
          }).then((res) => {
          if(!res.data.data) {
            this.$message({
              showClose: true,
              message: '请仔细核对您的账号密码',
              type: 'error'
            })
            return
          }
          window.sessionStorage.setItem('token', res.data.data.token)
          this.$router.replace('/backstage')
        })
        
      })
    }
  }
}
</script>
