<style scoped>

</style>
<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/backstage/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item, index) of breadFont" :key="index">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</div>
</template>

<script>
export default {
  props: {
    breadFont: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {

    }
  }
}
</script>
