<template>
  <div class="dashboard-editor-container">
    <PanelGroup />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <ServeChart />
    </el-row>
  </div>
</template>

<script>

import PanelGroup from '@/views/home/compoents/PanelGroup'
import ServeChart from '@/views/home/compoents/ServeChart'

export default {
  name: 'Home',
  components: { ServeChart, PanelGroup },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .dashboard-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
