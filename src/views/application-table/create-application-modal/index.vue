<template>
  <Modal modal-id="createApplicationModal" form-id="createApplicationForm">
    <template #header>
      <BasicModalHeader class="blue">
        新建应用
      </BasicModalHeader>
    </template>
    <BasicModalContent>
      <Form ref="createApplicationForm" form-id="createApplicationForm" :validate-rule="validateRule()">
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
            <BasicField>
              <div class="ui toggle checkbox m-padded-tb tip-popup">
                <input v-model="tab.serve.share" data-content="是否共享此服务" type="checkbox">
                <label>是否共享</label>
              </div>
            </BasicField>
            <ServeImageField @change="updateImage($event, tab.serve)" />
            <ServePortField @change="updatePort($event, tab.serve)" />
            <LinkServeTab @change="updateServeLink($event, tab.serve)" />
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
  showSuccessToast,
  showWarnToast
} from '@/utils/publicUtils'
import { createApplication } from '@/api/dockerserve/applicationAPI'
import LinkServeTab from '@/views/application-table/create-application-modal/compoents/LinkServeTab'
import ServePortField from '@/views/application-table/create-application-modal/compoents/ServePortField'
import { loadingRequest } from '@/api'
import ServeImageField from '@/views/application-table/create-application-modal/compoents/ServeImageField'

export default {
  name: 'CreateApplicationModal',
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
    return this.initData()
  },
  mounted() {
    this.addServe()
  },
  methods: {
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
      if (this.$refs.createApplicationForm.validaForm()) {
        this.form.serveList = this.serveTabs.map(tab => tab.serve)
        const { success } = await loadingRequest(createApplication(this.form), this)
        if (success) {
          showSuccessToast({
            message: '创建应用成功'
          })
          this.initData()
          this.$emit('createSuccess')
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
        description: FormValidation.maxLengthRule('描述', 256)
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
     * @return 数据
     */
    initData() {
      return {
        form: this.getDefaultForm(),
        serveTabsValue: '',
        serveTabs: [],
        tabIndex: 0,
        loading: false
      }
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
    /**
     * 更新服务链接
     * @param serveLinkList 服务链接列表
     * @param serve 服务
     */
    updateServeLink(serveLinkList, serve) {
      serve.linkServeList = serveLinkList
    },
    /**
     * 更新端口
     * @param portList 端口列表
     * @param serve 服务
     */
    updatePort(portList, serve) {
      serve.portList = portList
    },
    /**
     * 更新镜像
     * @param imageId 镜像ID
     * @param serve 服务
     */
    updateImage(imageId, serve) {
      serve.imageId = imageId
    }
  }
}
</script>

<style scoped>
</style>
