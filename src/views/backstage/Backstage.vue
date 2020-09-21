<style scoped>
  .frame {
    overflow: hidden;
    height: 100vh;
  }
</style>
<template>
  <div class="frame">
    <nav-bar>
      <template v-slot:center>
        <div>我的管理页面</div>
      </template>
    </nav-bar>
    <container-el/>
  </div>
</template>
<script>
import ContainerEl from './bsChild/ContainerEl'
import  NavBar from 'components/common/NavBar'

export default {
  data() {
    return {

    }
  },
  components: {
    ContainerEl,
    NavBar
  },
  methods: {
    existToken() {
      return window.sessionStorage
    }
  },
  created() {
    // this.$http.get('').then(res => {

    // })
  }
}
</script>
