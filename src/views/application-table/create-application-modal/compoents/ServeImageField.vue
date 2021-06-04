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
    imageId(newValue) {
      this.$emit('changeImage', newValue)
    }
  },
  methods: {
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
