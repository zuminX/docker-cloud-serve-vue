<template>
  <div>
    <div class="m-padded-t m-padded-lr-large">
      <div class="ui grid">
        <div class="four wide column">
          <div class="ui action input">
            <input v-model="searchName" type="text" placeholder="输入应用的名称">
            <button class="ui button" @click="refreshTable">搜索</button>
          </div>
        </div>
        <div class="center aligned eight wide column">
          <el-radio v-model="showShare" :label="true" border>显示共享的应用</el-radio>
          <el-radio v-model="showShare" :label="false" border>显示自己的应用</el-radio>
        </div>
        <div class="four wide column">
          <button class="ui blue right floated button" @click="saveApplication()">新建应用</button>
        </div>
      </div>
    </div>
    <div v-loading="loading">
      <table class="ui striped table">
        <thead>
          <tr class="center aligned">
            <th>名称</th>
            <th>描述</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-for="(application,index) in applicationList" :key="index">
          <tr class="center aligned">
            <td>{{ application.name }}</td>
            <td>{{ limitLength(application.description, 15) }}</td>
            <td>{{ application.updateTime }}</td>
            <td>
              <button class="ui olive basic button" @click="showApplicationDetail(application)">
                详情
              </button>
              <template v-if="!showShare">
                <button v-loading="operationLoading[index]" class="ui green basic button" @click="startApplication(index)">
                  启动
                </button>
                <button v-loading="operationLoading[index]" class="ui red basic button" @click="stopApplication(index)">
                  停止
                </button>
                <button class="ui violet basic button" @click="saveApplication(application)">
                  修改
                </button>
              </template>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th class="center aligned" colspan="4">
              <PaginationMenu :page-information="pageInformation" @currentChange="updateCurrentPageData" />
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
    <ApplicationDetailModal ref="applicationDetailModal" />
    <SaveApplicationModal ref="saveApplicationModal" @success="refreshTable" />
  </div>
</template>

<script>
import PaginationMenu from '@/components/PaginationMenu'
import { getDefaultPageInformation } from '@/components/PaginationMenu/PaginationMenu'
import { showModal } from '@/components/Modal/Modal'
import {
  limitLength
} from '@/utils/publicUtils'
import ApplicationDetailModal from '@/views/application-table/compoents/ApplicationDetailModal'
import SaveApplicationModal from '@/views/application-table/save-application-modal'
import {
  searchCurrentUserApplication,
  searchShareApplication,
  startApplication,
  stopApplication
} from '@/api/dockerserve/applicationAPI'
import {
  loadingRequest,
  messageRequest
} from '@/api'

export default {
  name: 'ApplicationTable',
  components: { SaveApplicationModal, ApplicationDetailModal, PaginationMenu },
  data() {
    return {
      pageInformation: getDefaultPageInformation(),
      applicationList: [],
      operationLoading: [],
      loading: false,
      searchName: '',
      showShare: true
    }
  },
  watch: {
    showShare() {
      this.updateCurrentPageData()
    }
  },
  mounted() {
    this.refreshTable()
  },
  methods: {
    showModal,
    limitLength,
    /**
     * 更新当前分页数据
     * @param page 当前页
     * @param pageSize 每页大小
     * @returns {Promise<void>}
     */
    async updateCurrentPageData(page = 1, pageSize = 5) {
      const search = this.showShare ? searchShareApplication : searchCurrentUserApplication
      const { success, data } = await loadingRequest(search(this.searchName, page, pageSize), this)
      if (success) {
        this.pageInformation = data.pageInformation
        this.applicationList = data.list
        this.operationLoading = Array(data.list.length).fill(false)
      }
    },
    /**
     * 刷新表格数据
     */
    refreshTable() {
      this.updateCurrentPageData(this.pageInformation.currentPage, this.pageInformation.pageSize)
    },
    /**
     * 打开保存应用的弹出层
     */
    saveApplication(application = null) {
      this.$refs.saveApplicationModal.init(application)
    },
    /**
     * 显示应用详情
     * @param application 应用
     */
    showApplicationDetail(application) {
      this.$refs.applicationDetailModal.init(application)
    },
    /**
     * 启动应用
     * @param index 操作元素的下标
     */
    startApplication(index) {
      const { id } = this.applicationList[index]
      messageRequest(loadingRequest(startApplication(id), this.operationLoading, index), '启动应用成功')
    },
    /**
     * 停止应用
     * @param index 操作元素的下标
     */
    stopApplication(index) {
      const { id } = this.applicationList[index]
      messageRequest(loadingRequest(stopApplication(id), this.operationLoading, index), '停止应用成功')
    }
  }
}
</script>

<style scoped>

</style>
