<template>
<el-container style="height: 100vh; border: 1px solid #eee">
  <el-aside width="200px" height='1px' style="background-color: rgb(238, 241, 246)">

    <el-menu unique-opened :router='true' index='1' :default-active='currentRoute'>
      <!--
          一级菜单,index里面必须为string类型,且列表点击打开时相同的index就会一起打开
          所以需要给所以的index动态绑定：，当不使用：时index值虽然可以赋值为item.id
          但之后就不会再改变了。
        -->
      <el-submenu :index="item.id+''" v-for="item in menuInfo" :key='item.id'>
        <template slot="title">
          <i class="el-icon-message"></i>
          <span>{{item.authName}}</span>
        </template>

        <!--
            二级菜单,当具有相同的index值时，只要点击其中一个就会一起亮起来
            且index绑定的必须为字符串类型
          -->
        <el-menu-item :index="'/backstage/' + itemx.path " v-for="itemx in item.children" :key="itemx.id">
          <i class="el-icon-menu"></i>
          <span>{{itemx.authName}}</span>
        </el-menu-item>

      </el-submenu>
    </el-menu>
  </el-aside>

  <el-main>
    <router-view></router-view>
  </el-main>
</el-container>
</template>

<style scoped>

</style>

<script>
export default {
  data() {
    return {
      menuInfo: []
    }
  },
  methods: {
    getMenuInfo() {
      this.$http.get('/menus').then(res => {
        this.menuInfo = res.data.data
      })
    }
  },
  created() {
    this.getMenuInfo()
  },
  computed: {
    currentRoute() {
      // 截取路由后面的地址
      return this.$route.path.substr(11)
    }
  }
};
</script>
