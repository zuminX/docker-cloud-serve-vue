<template>
  <div :id="modalId" class="ui modal">
    <slot name="header" />
    <slot />
    <slot name="actions" />
  </div>
</template>

<script>
import { FormValidation } from '@/model/FormValidation'
import { showModal } from '@/components/Modal/Modal'

export default {
  name: 'Modal',
  props: {
    modalId: {
      type: String,
      required: true
    },
    formId: {
      type: String,
      default: ''
    }
  },
  mounted() {
    // 若传入formId，则使用表单校验的功能
    if (this.formId !== '') {
      $(`#${this.modalId}`).modal({
        closable: false,
        onApprove: () => {
          return FormValidation.validateForm(this.formId)
        }
      })
    }
  },
  methods: {
    show() {
      showModal(this.modalId)
    }
  }
}
</script>

