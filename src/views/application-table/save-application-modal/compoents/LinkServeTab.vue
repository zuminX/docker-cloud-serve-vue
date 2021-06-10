<template>
  <div class="ui container link-serve-container">
    <div class="ui blue basic button fluid" @click="addLinkServe">增加链接的外部服务</div>
    <el-tabs v-model="linkServeTabsValue" type="card" closable @tab-remove="removeLinkServe">
      <el-tab-pane
        v-for="linkTab in linkServeTabs"
        :key="linkTab.name"
        :label="linkTab.title"
        :name="linkTab.name"
      >
        <LinkServeField ref="linkServeField" :be-link-serve-id.sync="linkTab.link.beLinkServeId" />
        <LeftLabeledInputField :data.sync="linkTab.link.name" :name="getTabItemName(linkTab, 'name')" label="链接名称" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import LeftLabeledInputField from '@/components/Form/field/LeftLabeledInputField'
import LinkServeField from '@/views/application-table/save-application-modal/compoents/LinkServeField'

export default {
  name: 'LinkServeTab',
  components: { LinkServeField, LeftLabeledInputField },
  props: {
    linkServeList: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      linkServeTabsValue: '',
      linkServeTabs: [],
      tabIndex: 0
    }
  },
  watch: {
    /**
     * 监听服务链接页的改变
     * 将服务链接对象以"update"事件的形式向上抛出
     * @param newValue 新值
     */
    linkServeTabs: {
      handler: function(newValue) {
        this.$emit('update:linkServeList', newValue.map(tab => tab.link))
      },
      deep: true
    }
  },
  methods: {
    init(linkServeList) {
      this.initLinkServeTab(linkServeList)
      this.initServeImageField(linkServeList)
    },
    /**
     * 增加链接服务
     */
    addLinkServe() {
      const newTabName = ++this.tabIndex + ''
      this.linkServeTabs.push({
        title: '链接服务' + this.tabIndex,
        name: newTabName,
        link: {
          beLinkServeId: '',
          name: ''
        }
      })
      this.linkServeTabsValue = newTabName
    },
    /**
     * 移除链接服务
     * @param targetName 移除目标的名称
     */
    removeLinkServe(targetName) {
      const tabs = this.linkServeTabs
      let activeName = this.linkServeTabsValue
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
      this.linkServeTabsValue = activeName
      this.linkServeTabs = tabs.filter(tab => tab.name !== targetName)
    },
    /**
     * 获取该页指定项的名称
     * @param tab  页
     * @param name 名称
     * @return {string} 名称
     */
    getTabItemName(tab, name) {
      return tab.name + '-' + name
    },
    initLinkServeTab(linkServeList) {
      for (const link of linkServeList) {
        const newTabName = ++this.tabIndex + ''
        this.linkServeTabs.push({
          title: '链接服务' + this.tabIndex,
          name: newTabName,
          link
        })
      }
      this.linkServeTabsValue = this.linkServeTabs[0].name
    },
    initServeImageField(linkServeList) {
      // 需等待linkServeField渲染完成
      this.$nextTick(() => {
        const fieldList = this.$refs.linkServeField
        for (let i = 0; i < linkServeList.length; i++) {
          const linkServe = linkServeList[i]
          fieldList[i].init(linkServe.beLinkServeId, linkServe.beLinkServeName)
        }
      })
    }
  }
}
</script>

<style scoped>
.link-serve-container {
  max-width: 80%;
}
</style>
