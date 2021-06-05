<template>
  <LeftLabeledField label="镜像">
    <el-select
      v-model="imageId"
      filterable
      remote
      reserve-keyword
      :remote-method="searchImage"
      :image-loading="loading"
      name="imageId"
      placeholder="请输入并选择构建的镜像"
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
  data() {
    return {
      imageOptions: [],
      loading: false,
      imageId: ''
    }
  },
  watch: {
    /**
     * 监听镜像ID的改变
     * 将镜像ID以'changeImage'事件的形式向上抛出
     * @param newValue 新值
     */
    imageId(newValue) {
      console.log(newValue)
      this.$emit('change', newValue)
    }
  },
  methods: {
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
