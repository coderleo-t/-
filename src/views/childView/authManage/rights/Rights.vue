<style scoped>


</style>
<template>
  <div>
    <breadcrumb :breadFont="['权限名称', '权限等级']"/>
    <rights-table :rightsInfo='rolesList'/>
  </div>
</template>
<script>
import Breadcrumb from 'components/common/Breadcrumb'
import RightsTable from './rightsChild/RightsTable'
export default {
  data() {
    return {
      rolesList: []
    }
  },
  components: {
    Breadcrumb,
    RightsTable
  },
  created() {
    this.$http.get('rights/list').then(res => {
      if(res.status === 200) this.rolesList = res.data.data
    })
  }
}
</script>
