<template>
  <el-row :gutter="40" class="panel-group">
    <el-col
      v-for="(cardData, key) in cardDataList"
      :key="key"
      :lg="6"
      :sm="12"
      :xs="12"
      class="card-panel-col"
    >
      <div class="card-panel">
        <div :class="'icon-'+cardData.dataName" class="card-panel-icon-wrapper">
          <svg-icon :icon-class="cardData.iconClass" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ cardData.description }}
          </div>
          <count-to
            :duration="2600"
            :end-val="totals[cardData.dataName]"
            :start-val="0"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getStatistics } from '@/api/dockerserve/dashboardAPI'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      cardDataList: [{
        dataName: 'applicationTotal',
        iconClass: 'component',
        description: '应用总数'
      }, {
        dataName: 'imageTotal',
        iconClass: 'table',
        description: '镜像总数'
      }, {
        dataName: 'serveTotal',
        iconClass: 'serve',
        description: '服务总数'
      }],
      selectDataName: 'applicationTotal',
      totals: {
        applicationTotal: 0,
        imageTotal: 0,
        serveTotal: 0
      }
    }
  },
  async mounted() {
    const { success, data } = await getStatistics()
    if (success) {
      this.totals = data
    }
  }
}
</script>

<style lang="scss" scoped>
.select-border-color {
  border-color: #62c1fc !important;
}

.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border: 1px solid rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-applicationTotal {
        background: #40c9c6;
      }

      .icon-imageTotal {
        background: #36a3f7;
      }

      .icon-serveTotal {
        background: #f4516c;
      }
    }

    .icon-applicationTotal {
      color: #40c9c6;
    }

    .icon-imageTotal {
      color: #36a3f7;
    }

    .icon-serveTotal {
      color: #f4516c;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px 26px 26px 0;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
