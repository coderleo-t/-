<style scoped>
  .login {
    background-color: lightsalmon;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    
  }
  .checkout {
    height: 50%;
    width: 50%;
    margin-left: 50%;
    margin-top: 50vh;
    transform: translate(-50%, -50%);
    border: 1px solid white;
    border-radius: 19px;
    box-shadow: 10px 10px 2px white;
  }

</style>
<template>
  <div class="login">
    <div class='checkout'>
      <Formel/>
    </div>
  </div>
</template>
<script>
import Formel from './childLogin/Formel.vue'
export default {
  name: 'login',
  data() {
    return {

    }
  },
  components: {
    Formel
  }
}
</script>
