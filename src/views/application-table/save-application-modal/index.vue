<template>
  <Modal ref="saveApplicationModal" modal-id="saveApplicationModal" form-id="saveApplicationForm">
    <template #header>
      <BasicModalHeader class="blue">
        保存应用
      </BasicModalHeader>
    </template>
    <BasicModalContent>
      <Form ref="saveApplicationForm" form-id="saveApplicationForm" :validate-rule="validateRule()">
        <LeftLabeledInputField :data.sync="form.name" name="name" label="名称" />
        <LeftLabeledInputField :data.sync="form.description" name="description" label="描述" />
        <BasicField>
          <div class="ui toggle checkbox m-padded-tb tip-popup">
            <input id="shareApplication" v-model="form.share" data-content="是否共享此应用" type="checkbox">
            <label for="shareApplication">是否共享</label>
          </div>
        </BasicField>
        <div class="ui green basic button fluid" @click="addServe">增加服务</div>
        <el-tabs v-model="serveTabsValue" type="card" closable @tab-remove="removeServe">
          <el-tab-pane
            v-for="tab in serveTabs"
            :key="tab.name"
            :label="tab.title"
            :name="tab.name"
          >
            <LeftLabeledInputField :data.sync="tab.serve.name" :name="getTabItemName(tab, 'name')" label="名称" />
            <LeftLabeledInputField :data.sync="tab.serve.description" name="description" label="描述" />
            <LeftLabeledInputField
              :data.sync="tab.serve.linkName"
              name="linkName"
              label="链接名"
              placeholder="当前应用的其他服务链接该服务的名称（若为空则不链接）"
            />
            <BasicField>
              <div class="ui toggle checkbox m-padded-tb tip-popup">
                <input v-model="tab.serve.share" data-content="是否共享此服务" type="checkbox">
                <label>是否共享</label>
              </div>
            </BasicField>
            <ServeImageField ref="serveImageField" :image-id.sync="tab.serve.imageId" />
            <ServePortField :port-list.sync="tab.serve.portList" />
            <LinkServeTab ref="serveLinkTab" :link-serve-list.sync="tab.serve.linkServeList" />
          </el-tab-pane>
        </el-tabs>
      </Form>
    </BasicModalContent>
    <template #actions>
      <OkOrCancelModalActions v-loading="loading" @clickCheck="save" />
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'
import BasicModalHeader from '@/components/Modal/header/BasicModalHeader'
import OkOrCancelModalActions from '@/components/Modal/actions/OkOrCancelModalActions'
import BasicModalContent from '@/components/Modal/content/BasicModalContent'
import Form from '@/components/Form'
import { FormValidation } from '@/model/FormValidation'
import LeftLabeledInputField from '@/components/Form/field/LeftLabeledInputField'
import BasicField from '@/components/Form/field/BasicField'
import {
  selectiveAssign,
  showSuccessToast,
  showWarnToast
} from '@/utils/publicUtils'
import {
  saveApplication,
  detailApplication
} from '@/api/dockerserve/applicationAPI'
import LinkServeTab from '@/views/application-table/save-application-modal/compoents/LinkServeTab'
import ServePortField from '@/views/application-table/save-application-modal/compoents/ServePortField'
import { loadingRequest } from '@/api'
import ServeImageField from '@/views/application-table/save-application-modal/compoents/ServeImageField'

export default {
  name: 'SaveApplicationModal',
  components: {
    ServeImageField,
    ServePortField,
    LinkServeTab,
    BasicField,
    LeftLabeledInputField,
    Form,
    BasicModalContent,
    OkOrCancelModalActions,
    BasicModalHeader,
    Modal
  },
  data() {
    return {
      form: this.getDefaultForm(),
      serveTabsValue: '',
      serveTabs: [],
      tabIndex: 0,
      loading: false
    }
  },
  methods: {
    /**
     * 初始化显示内容
     * @param application 应用
     */
    async init(application) {
      this.initData()
      if (application) {
        const { success, data } = await detailApplication(application.id)
        if (success) {
          selectiveAssign(data, this.form)
          this.form.id = data.id
          this.initServe(data.serveList)
        }
      } else {
        this.addServe()
      }
      this.$refs.saveApplicationModal.show()
    },
    /**
     * 保存应用
     */
    async save() {
      if (this.serveTabs.length === 0) {
        showWarnToast({
          message: '应用至少需要一个服务'
        })
        return
      }
      if (this.$refs.saveApplicationForm.validaForm()) {
        this.form.serveList = this.serveTabs.map(tab => tab.serve)
        const { success } = await loadingRequest(saveApplication(this.form), this)
        if (success) {
          showSuccessToast({
            message: '保存应用成功'
          })
          this.initData()
          this.$emit('success')
        }
      }
    },
    /**
     * 设置用户表单验证规则
     * @return 验证规则
     */
    validateRule() {
      return {
        name: FormValidation.nameStringRule({ fieldName: '名称', minLength: 4, maxLength: 16 }),
        share: FormValidation.notEmptyRule('是否共享'),
        description: FormValidation.maxLengthRule('描述', 256),
        linkName: FormValidation.maxLengthRule('链接名', 16)
      }
    },
    /**
     * 获取默认的表单对象
     * @return 表单对象
     */
    getDefaultForm() {
      return {
        name: '',
        description: '',
        share: false,
        serveList: []
      }
    },
    /**
     * 初始化数据
     */
    initData() {
      this.form = this.getDefaultForm()
      this.serveTabsValue = ''
      this.serveTabs = []
      this.tabIndex = 0
      this.loading = false
    },
    /**
     * 增加服务
     */
    addServe() {
      const newTabName = ++this.tabIndex + ''
      this.serveTabs.push({
        title: '服务' + this.tabIndex,
        name: newTabName,
        serve: {
          imageId: '',
          name: '',
          description: '',
          linkName: '',
          share: false,
          portList: [],
          linkServeList: []
        }
      })
      this.serveTabsValue = newTabName
    },
    /**
     * 删除服务
     * @param targetName 删除目标的名称
     */
    removeServe(targetName) {
      const tabs = this.serveTabs
      let activeName = this.serveTabsValue
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
      this.serveTabsValue = activeName
      this.serveTabs = tabs.filter(tab => tab.name !== targetName)
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
    initServe(serveList) {
      this.initServeTab(serveList)
      this.initServeImageField(serveList)
      this.initServeLinkTab(serveList)
    },
    initServeTab(serveList) {
      for (const serve of serveList) {
        const newTabName = ++this.tabIndex + ''
        this.serveTabs.push({
          title: '服务' + this.tabIndex,
          name: newTabName,
          serve
        })
      }
      this.serveTabsValue = this.serveTabs[0].name
    },
    initServeImageField(serveList) {
      // 需等待serveImageField渲染完成
      this.$nextTick(() => {
        const fieldList = this.$refs.serveImageField
        for (let i = 0; i < serveList.length; i++) {
          const serve = serveList[i]
          fieldList[i].init(serve.imageId, serve.imageName)
        }
      })
    },
    initServeLinkTab(serveList) {
      // 需等待serveLinkTab渲染完成
      this.$nextTick(() => {
        const tabList = this.$refs.serveLinkTab
        for (let i = 0; i < serveList.length; i++) {
          const serve = serveList[i]
          if (serve.linkServeList.length > 0) {
            tabList[i].init(serve.linkServeList)
          }
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
