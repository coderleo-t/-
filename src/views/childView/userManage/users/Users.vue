<style scoped>


</style>
<template>
  <div>
    <breadcrumb :breadFont="['活动管理', '活动列表', '活动详情']"/>
    <card/>
  </div>
</template>
<script>
import Breadcrumb from 'components/common/Breadcrumb'
import Card from './userChild/Card'
import {debounce} from 'common/debounce.js'
export default {
  data() {
    return {
      timer: null
    }
  },
  components: {
    Breadcrumb,
    Card
  },
  mounted() {
    const bar = debounce(500)
    // 发起修改权限开关的请求
    this.$bus.$on('updateState', (e, time=100) =>{
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        bar(this.$http.put(`users/${e.id}/state/${e.mg_state}`))
      }, time)
    })
  }
}
</script>
