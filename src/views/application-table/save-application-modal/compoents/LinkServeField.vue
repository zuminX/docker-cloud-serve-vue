<template>
  <LeftLabeledField label="服务">
    <el-select
      :value="beLinkServeId"
      filterable
      remote
      reserve-keyword
      :remote-method="searchServe"
      :loading="loading"
      name="beLinkServeId"
      placeholder="请输入并选择链接的服务"
      @change="updateBeLinkServeId"
    >
      <el-option
        v-for="serve in serveOptions"
        :key="serve.id"
        :label="serve.name"
        :value="serve.id"
      />
    </el-select>
  </LeftLabeledField>
</template>

<script>
import LeftLabeledField from '@/components/Form/field/LeftLabeledField'
import { loadingRequest } from '@/api'
import { searchServe } from '@/api/dockerserve/serveAPI'

export default {
  name: 'LinkServeField',
  components: { LeftLabeledField },
  props: {
    beLinkServeId: {
      default: ''
    }
  },
  data() {
    return {
      serveOptions: [],
      loading: false
    }
  },
  methods: {
    init(id, name) {
      this.serveOptions.push({ id, name })
    },
    updateBeLinkServeId(id) {
      this.$emit('update:beLinkServeId', id)
    },
    /**
     * 搜索服务
     * @param query 服务名称
     */
    async searchServe(query) {
      if (query === '') {
        return
      }
      const { success, data } = await loadingRequest(searchServe(query), this)
      if (success) {
        this.serveOptions = data
      }
    }
  }
}
</script>

<style scoped>

</style>
