<template>
  <form :id="formId" class="ui form">
    <div class="ui stacked segment">
      <slot />
    </div>
    <div class="ui error message" />
  </form>
</template>

<script>
import { FormValidation } from '@/model/FormValidation'

export default {
  name: 'Form',
  props: {
    formId: {
      type: String,
      default: ''
    },
    validateRule: {
      type: Object,
      default: null
    },
    successCallback: {
      type: Function,
      default: null
    }
  },
  mounted() {
    // 加载注册表单验证规则
    if (this.validateRule) {
      this.$nextTick(() => {
        FormValidation.init(this.formId, this.validateRule, this.successCallback)
      })
    }
  },
  methods: {
    /**
     * 校验表单
     */
    validaForm() {
      return FormValidation.validateForm(this.formId)
    }
  }
}
</script>
