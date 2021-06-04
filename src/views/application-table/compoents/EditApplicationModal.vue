<template>
  <Modal ref="editApplicationModal" modal-id="editApplicationModal" form-id="editApplicationForm">
    <template #header>
      <BasicModalHeader class="blue">
        修改应用信息
      </BasicModalHeader>
    </template>
    <BasicModalContent>
      <Form ref="editApplicationForm" form-id="editApplicationForm" :validate-rule="validateRule()" :success-callback="save">
        <LeftLabeledInputField :data.sync="form.name" name="name" label="名称" />
        <LeftLabeledInputField :data.sync="form.description" name="description" label="描述" />
        <BasicField>
          <div class="ui toggle checkbox m-padded-tb tip-popup">
            <input id="share" v-model="form.share" data-content="是否共享此应用" type="checkbox" name="share">
            <label for="share">是否共享</label>
          </div>
        </BasicField>
        <input id="id" type="hidden">
      </Form>
    </BasicModalContent>
    <template #actions>
      <OkOrCancelModalActions />
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'
import BasicModalHeader from '@/components/Modal/header/BasicModalHeader'
import BasicModalContent from '@/components/Modal/content/BasicModalContent'
import LeftLabeledInputField from '@/components/Form/field/LeftLabeledInputField'
import BasicField from '@/components/Form/field/BasicField'
import OkOrCancelModalActions from '@/components/Modal/actions/OkOrCancelModalActions'
import { FormValidation } from '@/model/FormValidation'
import {
  selectiveAssign,
  showSuccessToast
} from '@/utils/publicUtils'
import Form from '@/components/Form'
import { editApplication } from '@/api/dockerserve/applicationAPI'

export default {
  name: 'EditApplicationModal',
  components: {
    Form,
    OkOrCancelModalActions,
    BasicField,
    LeftLabeledInputField,
    BasicModalContent,
    BasicModalHeader,
    Modal
  },
  data() {
    return {
      form: this.getDefaultForm()
    }
  },
  methods: {
    /**
     * 初始化显示内容
     * @param application 应用
     */
    init(application) {
      selectiveAssign(application, this.form)
      this.$refs.editApplicationModal.show()
    },
    /**
     * 保存应用
     */
    async save() {
      const { success } = await editApplication(this.form)
      if (success) {
        showSuccessToast({
          message: '修改应用成功'
        })
        this.$emit('editSuccess')
      }
    },
    /**
     * 获取默认的表单对象
     * @return 表单对象
     */
    getDefaultForm() {
      return {
        id: null,
        name: '',
        description: '',
        share: false
      }
    },
    /**
     * 设置用户表单验证规则
     * @return 校验规则
     */
    validateRule() {
      return {
        name: FormValidation.nameStringRule({ fieldName: '名称', minLength: 4, maxLength: 16 }),
        share: FormValidation.notEmptyRule('是否共享'),
        description: FormValidation.maxLengthRule('描述', 256)
      }
    }
  }
}
</script>

<style scoped>

</style>
