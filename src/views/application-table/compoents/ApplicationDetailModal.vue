<template>
  <Modal ref="applicationDetailModal" v-loading="loading" modal-id="applicationDetailModal">
    <template #header>
      <BasicModalHeader class="blue">
        {{ application.name }}
      </BasicModalHeader>
    </template>
    <BasicModalContent>
      <div class="ui container">
        <div class="ui raised segment">
          <a class="ui red ribbon label">创建者</a>
          <span>{{ application.nickname }}</span>
          <p>
            创建于{{ application.createTime }}，最近更新于{{ application.updateTime }}
          </p>
          <a class="ui blue ribbon label">说明</a>
          <p>
            {{ application.description }}
          </p>
        </div>
      </div>
      <el-tabs v-model="serveTabsValue" type="border-card">
        <el-tab-pane
          v-for="serve in serveInfo"
          :key="serve.name"
          :label="serve.name"
          :name="serve.name"
        >
          <div class="ui raised segment">
            <template v-if="isRun(serve)">
              <a class="ui green ribbon label">当前状态</a>
              <span>运行</span>
            </template>
            <template v-else>
              <a class="ui grey ribbon label">当前状态</a>
              <span>停止</span>
            </template>
            <p />
            <a class="ui teal ribbon label">端口信息</a>
            <span v-for="(port, index) in serve.portList" :key="index" class="ui label" @click="openServe(serve, port)">
              <i class="external alternate link icon" />
              {{ port }}
            </span>
            <p />
            <a class="ui orange ribbon label">创建者</a>
            <span>{{ serve.nickname }}</span>
            <p />
            <a class="ui blue ribbon label">说明</a>
            <p>
              {{ serve.description }}
            </p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </BasicModalContent>
    <template #actions>
      <CloseModalActions />
    </template>
  </Modal>
</template>

<script>
import BasicModalHeader from '@/components/Modal/header/BasicModalHeader'
import BasicModalContent from '@/components/Modal/content/BasicModalContent'
import Modal from '@/components/Modal'
import CloseModalActions from '@/components/Modal/actions/CloseModalActions'
import { getServeInfo } from '@/api/dockerserve/serveAPI'
import {
  appendNickname,
  batchAppendNickname
} from '@/utils/coreUtils'
import { showWarnToast } from '@/utils/publicUtils'

export default {
  name: 'ApplicationDetailModal',
  components: { CloseModalActions, Modal, BasicModalContent, BasicModalHeader },
  data() {
    return {
      application: {
        name: '',
        nickname: '',
        createTime: new Date(),
        updateTime: new Date(),
        description: ''
      },
      serveInfo: [],
      serveTabsValue: '',
      loading: false
    }
  },
  methods: {
    /**
     * 初始化显示内容
     * @param application 应用
     */
    async init(application) {
      this.$refs.applicationDetailModal.show()
      this.loading = true
      this.application = application
      appendNickname(this.application)
      const { success, data } = await getServeInfo(application.id)
      if (success) {
        this.serveInfo = data
        this.serveTabsValue = this.serveInfo[0].name
        await batchAppendNickname(this.serveInfo)
      }
      this.loading = false
    },
    /**
     * 判断该服务是否正在运行
     * @param serve 服务状态
     * @returns {boolean} 若在运行则返回true，否则返回false
     */
    isRun(serve) {
      return serve.state === 'running'
    },
    /**
     * 打开访问服务的新页面
     * @param serve 服务
     * @param port 端口
     */
    openServe(serve, port) {
      if (!this.isRun(serve)) {
        showWarnToast({ message: '该服务未启动，无法访问' })
        return
      }
      const serveId = serve.id
      const { href } = this.$router.resolve({
        path: `/proxy/${serveId}:${port}`
      })
      const url = href.replace('#/', '')
      window.open(url, '_blank')
    }
  }
}
</script>

<style scoped>

</style>
