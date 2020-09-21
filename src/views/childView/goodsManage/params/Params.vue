<style scoped>

</style>
<template>
<div>
  <breadcrumb :breadFont="['商品管理', '参数列表']" />
  <el-card>
    <el-alert title="注意: 只允许为第三级分类设置相关参数" type="warning" show-icon :closable='false' />
    <params-all />

  </el-card>
</div>
</template>

<script>
import Breadcrumb from '@/components/common/Breadcrumb'
import ParamsAll from './childParams/ParamsAll'
export default {
  data() {
    return {

    }
  },
  components: {
    Breadcrumb,
    ParamsAll
  }
}
</script>
