<template>
  <div class="ui container link-serve-container">
    <div class="ui blue basic button fluid" @click="addLinkServe">增加链接的服务</div>
    <el-tabs v-model="serveLinkTabsValue" type="card" closable @tab-remove="removeLinkServe">
      <el-tab-pane
        v-for="linkTab in serveLinkTabs"
        :key="linkTab.name"
        :label="linkTab.title"
        :name="linkTab.name"
      >
        <LeftLabeledField label="服务">
          <el-select
            v-model="linkTab.link.beLinkServeId"
            filterable
            remote
            reserve-keyword
            :remote-method="searchServe"
            :loading="loading"
            :name="getTabItemName(linkTab, 'beLinkServeId')"
            placeholder="请输入并选择链接的服务"
          >
            <el-option
              v-for="serve in serveOptions"
              :key="serve.id"
              :label="serve.name"
              :value="serve.id"
            />
          </el-select>
        </LeftLabeledField>
        <LeftLabeledInputField :data.sync="linkTab.link.alias" :name="getTabItemName(linkTab, 'alias')" label="别名" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import LeftLabeledField from '@/components/Form/field/LeftLabeledField'
import LeftLabeledInputField from '@/components/Form/field/LeftLabeledInputField'
import { searchServe } from '@/api/dockerserve/serveAPI'
import { loadingRequest } from '@/api'

export default {
  name: 'LinkServeTab',
  components: { LeftLabeledInputField, LeftLabeledField },
  data() {
    return {
      serveLinkTabsValue: '',
      serveLinkTabs: [],
      tabIndex: 0,
      serveOptions: [],
      loading: false
    }
  },
  watch: {
    /**
     * 监听服务链接页的改变
     * 将服务链接对象以'changeServeLink'事件的形式向上抛出
     * @param newValue 新值
     */
    serveLinkTabs: {
      handler: function(newValue) {
        this.$emit('change', newValue.map(tab => tab.link))
      },
      deep: true
    }
  },
  methods: {
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
    },
    /**
     * 增加链接服务
     */
    addLinkServe() {
      const newTabName = ++this.tabIndex + ''
      this.serveLinkTabs.push({
        title: '链接服务' + this.tabIndex,
        name: newTabName,
        link: {
          beLinkServeId: '',
          alias: ''
        }
      })
      this.serveLinkTabsValue = newTabName
    },
    /**
     * 移除链接服务
     * @param targetName 移除目标的名称
     */
    removeLinkServe(targetName) {
      const tabs = this.serveLinkTabs
      let activeName = this.serveLinkTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.serveLinkTabsValue = activeName
      this.serveLinkTabs = tabs.filter(tab => tab.name !== targetName)
    },
    /**
     * 获取该页指定项的名称
     * @param tab  页
     * @param name 名称
     * @return {string} 名称
     */
    getTabItemName(tab, name) {
      return tab.name + '-' + name
    }
  }
}
</script>

<style scoped>
.link-serve-container {
  max-width: 80%;
}
</style>
