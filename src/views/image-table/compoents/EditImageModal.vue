<template>
  <Modal modal-id="editImageModal" form-id="editImageForm">
    <template #header>
      <BasicModalHeader class="blue">
        修改镜像信息
      </BasicModalHeader>
    </template>
    <BasicModalContent>
      <Form ref="editImageForm" form-id="editImageForm" :validate-rule="validateRule()" :success-callback="save">
        <LeftLabeledInputField :data.sync="form.name" name="name" label="名称" />
        <LeftLabeledInputField :data.sync="form.version" name="version" label="版本" />
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
import { editImage } from '@/api/dockerserve/imageAPI'
import { showModal } from '@/components/Modal/Modal'

export default {
  name: 'EditImageModal',
  components: {
    Form,
    OkOrCancelModalActions,
    BasicField,
    LeftLabeledInputField,
    BasicModalContent,
    BasicModalHeader,
    Modal
  },
  props: {
    image: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: this.getDefaultForm()
    }
  },
  methods: {
    init(image) {
      selectiveAssign(image, this.form)
      showModal('editImageModal')
    },
    /**
     * 保存修改结果
     */
    async save() {
      const { success } = await editImage(this.form)
      if (success) {
        showSuccessToast({
          message: '修改镜像成功'
        })
        this.$emit('saveSuccess')
      }
    },
    /**
     * 获取默认的表单对象
     */
    getDefaultForm() {
      return {
        id: null,
        name: '',
        version: '',
        description: '',
        share: false
      }
    },
    /**
     * 设置镜像表单验证规则
     */
    validateRule() {
      return {
        name: FormValidation.nameStringRule({ fieldName: '名称', minLength: 4, maxLength: 16 }),
        version: FormValidation.imageVersionRules,
        share: FormValidation.notEmptyRule('是否共享'),
        description: FormValidation.maxLengthRule('描述', 256)
      }
    }
  }
}
</script>

<style scoped>

</style>
