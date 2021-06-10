<template>
  <LeftLabeledField label="镜像">
    <el-select
      :value="imageId"
      filterable
      remote
      reserve-keyword
      :remote-method="searchImage"
      :loading="loading"
      name="imageId"
      placeholder="请输入并选择构建的镜像"
      @change="updateImageId"
    >
      <el-option
        v-for="image in imageOptions"
        :key="image.id"
        :label="image.name"
        :value="image.id"
      />
    </el-select>
  </LeftLabeledField>
</template>

<script>
import LeftLabeledField from '@/components/Form/field/LeftLabeledField'
import { loadingRequest } from '@/api'
import { searchImage } from '@/api/dockerserve/imageAPI'

export default {
  name: 'ServeImageField',
  components: { LeftLabeledField },
  props: {
    imageId: {
      default: ''
    }
  },
  data() {
    return {
      imageOptions: [],
      loading: false
    }
  },
  methods: {
    init(id, name) {
      this.imageOptions.push({ id, name })
    },
    updateImageId(id) {
      this.$emit('update:imageId', id)
    },
    /**
     * 搜索镜像
     * @param query 镜像名称
     */
    async searchImage(query) {
      if (query === '') {
        return
      }
      const { success, data } = await loadingRequest(searchImage(query), this)
      if (success) {
        this.imageOptions = data
      }
    }
  }
}
</script>

<style scoped>

</style>
