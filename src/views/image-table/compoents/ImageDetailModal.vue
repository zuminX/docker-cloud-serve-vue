<template>
  <Modal v-loading="loading" modal-id="imageDetailModal">
    <template #header>
      <BasicModalHeader class="blue">
        {{ image.name }}
      </BasicModalHeader>
    </template>
    <BasicModalContent>
      <div class="ui container">
        <div class="ui raised segment">
          <a class="ui red ribbon label">创建者</a>
          <span>{{ image.nickname }}</span>
          <p>
            创建于{{ image.createTime }}
          </p>
          <a class="ui blue ribbon label">说明</a>
          <p>
            {{ image.description }}
          </p>
          <a class="ui green ribbon label">版本号</a>
          <span>{{ image.version }}</span>
        </div>
      </div>
    </BasicModalContent>
    <template #actions>
      <CloseModalActions />
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'
import BasicModalHeader from '@/components/Modal/header/BasicModalHeader'
import BasicModalContent from '@/components/Modal/content/BasicModalContent'
import CloseModalActions from '@/components/Modal/actions/CloseModalActions'
import { showModal } from '@/components/Modal/Modal'
import { appendNickname } from '@/utils/coreUtils'

export default {
  name: 'ImageDetailModal',
  components: { CloseModalActions, BasicModalContent, BasicModalHeader, Modal },
  data() {
    return {
      loading: false,
      image: {
        name: '',
        version: '',
        nickname: '',
        createTime: new Date(),
        description: ''
      }
    }
  },
  methods: {
    /**
     * 初始化显示内容
     * @param image 镜像
     */
    async init(image) {
      showModal('imageDetailModal')
      this.loading = true
      this.image = image
      await appendNickname(this.image)
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
