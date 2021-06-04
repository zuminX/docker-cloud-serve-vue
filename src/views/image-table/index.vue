<template>
  <div>
    <div class="m-padded-t m-padded-lr-large">
      <div class="ui grid">
        <div class="four wide column">
          <div class="ui action input">
            <input v-model="searchName" type="text" placeholder="输入镜像的名称">
            <button class="ui button" @click="refreshTable">搜索</button>
          </div>
        </div>
        <div class="center aligned eight wide column">
          <el-radio v-model="showShare" :label="true" border>显示共享的镜像</el-radio>
          <el-radio v-model="showShare" :label="false" border>显示自己的镜像</el-radio>
        </div>
        <div class="four wide column">
          <button class="ui blue right floated button" @click="showModal('buildImageModal')">构建镜像</button>
        </div>
      </div>
    </div>
    <div v-loading="loading">
      <table class="ui striped table">
        <thead>
          <tr class="center aligned">
            <th>名称</th>
            <th>版本</th>
            <th>描述</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-for="(image,i) in imageList" :key="i">
          <tr class="center aligned">
            <td>{{ image.name }}</td>
            <td>{{ image.version }}</td>
            <td>{{ limitLength(image.description, 15) }}</td>
            <td>{{ image.createTime }}</td>
            <td>
              <button class="ui green basic button" @click="showImageDetail(image)">
                详情
              </button>
              <button v-if="!showShare" class="ui blue basic button" @click="editImage(image)">
                修改
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th class="center aligned" colspan="8">
              <PaginationMenu :page-information="pageInformation" @currentChange="updateCurrentPageData" />
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
    <EditImageModal ref="editImageModal" @saveSuccess="refreshTable" />
    <ImageDetailModal ref="imageDetailModal" />
    <BuildImageModal @buildSuccess="refreshTable" />
  </div>
</template>

<script>
import PaginationMenu from '@/components/PaginationMenu'
import { getDefaultPageInformation } from '@/components/PaginationMenu/PaginationMenu'
import { showModal } from '@/components/Modal/Modal'
import { limitLength } from '@/utils/publicUtils'
import {
  searchCurrentUserImageForPage,
  searchShareImageForPage
} from '@/api/dockerserve/imageAPI'
import EditImageModal from '@/views/image-table/compoents/EditImageModal'
import ImageDetailModal from '@/views/image-table/compoents/ImageDetailModal'
import BuildImageModal from '@/views/image-table/compoents/BuildImageModal'
import { loadingRequest } from '@/api'

export default {
  name: 'ImageTable',
  components: { ImageDetailModal, BuildImageModal, EditImageModal, PaginationMenu },
  data() {
    return {
      pageInformation: getDefaultPageInformation(),
      imageList: [],
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
      const search = this.showShare ? searchShareImageForPage : searchCurrentUserImageForPage
      const { success, data } = await loadingRequest(search(this.searchName, page, pageSize), this)
      if (success) {
        this.pageInformation = data.pageInformation
        this.imageList = data.list
      }
    },
    /**
     * 刷新表格数据
     */
    refreshTable() {
      this.updateCurrentPageData(this.pageInformation.currentPage, this.pageInformation.pageSize)
    },
    /**
     * 打开修改镜像的弹出层
     */
    editImage(image) {
      this.$refs.editImageModal.init(image)
    },
    /**
     * 显示镜像详情
     * @param image 镜像
     */
    showImageDetail(image) {
      this.$refs.imageDetailModal.init(image)
    }
  }
}
</script>

<style scoped>

</style>
