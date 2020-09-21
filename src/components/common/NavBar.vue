<style scoped>
  .nav {
    display: flex;
    position: sticky;
    height: 61px;
    background-color: rgb(79, 118, 150);
    text-align: center;
    color: white;
    line-height: 55px;
    top: 0px;
    z-index: 1;  
  }
  .center {
    flex: 1;
  }

</style>
<template>
  <div class="nav">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center" ></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>
