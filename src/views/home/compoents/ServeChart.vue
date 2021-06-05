<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { getServeBasicInfo } from '@/api/dockerserve/serveAPI'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    }
  },
  data() {
    return {
      chart: null,
      serveState: [{
        value: '',
        name: '创建中'
      }, {
        value: '',
        name: '重启中'
      }, {
        value: '',
        name: '运行中'
      }, {
        value: '',
        name: '暂停中'
      }, {
        value: '',
        name: '停止'
      }]
    }
  },
  async mounted() {
    await this.initServeState()
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    /**
     * 初始化图表
     */
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.serveState.map(state => state.name)
        },
        series: [
          {
            name: '服务状态',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: this.serveState,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    },
    /**
     * 初始化服务状态数据
     */
    async initServeState() {
      const { success, data } = await getServeBasicInfo()
      if (success) {
        this.serveState[0].value = data.filter(serve => serve.state === 'created').length
        this.serveState[1].value = data.filter(serve => serve.state === 'restarting').length
        this.serveState[2].value = data.filter(serve => serve.state === 'running').length
        this.serveState[3].value = data.filter(serve => serve.state === 'paused').length
        this.serveState[4].value = data.filter(serve => serve.state === 'exited').length
      }
    }
  }
}
</script>
