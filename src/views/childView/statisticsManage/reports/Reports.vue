<style scoped>

</style>
<template>
<div>
  <breadcrumb :breadFont="['数据统计', '数据报表']" />
  <el-card>
    <div id="main" style="width: 800px;height:400px;"></div>
  </el-card>
</div>
</template>

<script>
import Breadcrumb from '@/components/common/Breadcrumb'
import echarts from 'echarts'
import _ from 'lodash'

export default {
  data() {
    return {
      echartsOptions: {},
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          boundaryGap: false
        }],
        yAxis: [{
          type: 'value'
        }]
      }
    }
  },
  components: {
    Breadcrumb
  },
  mounted() {
    const myChart = echarts.init(document.getElementById('main'));

    this.getEchartsData().then(() => {
      const data = _.merge(this.echartsOptions, this.options)
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(data);
    })

  },
  methods: {
    async getEchartsData() {
      const {
        data: res
      } = await this.$http.get('reports/type/1')
      if (res.meta.status !== 200) {
        return this.$message.error('获取数据失败！' + res.meta.msg)
      }
      this.echartsOptions = res.data
    }
  }
}
</script>
