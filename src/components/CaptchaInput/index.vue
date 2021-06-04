<template>
  <div class="ui left icon input">
    <i class="shield alternate icon" />
    <input
      ref="captchaInput"
      v-model="input"
      name="code"
      placeholder="验证码"
      type="text"
      @input="$emit('input', $event.target.value)"
    >
    <span v-loading="loading">
      <img :src="captchaBaseUrl" class="m-margin-l captcha" @click="getCaptchaImage">
    </span>
  </div>
</template>

<script>

import { captchaImage } from '@/api/auth/captchaAPI'
import { loadingRequest } from '@/api'

export default {
  name: 'CaptchaInput',
  props: {
    uuid: {
      type: String,
      required: true
    },
    name: {
      default: 'code',
      type: String
    }
  },
  data() {
    return {
      captchaBaseUrl: '',
      input: '',
      loading: false
    }
  },
  mounted() {
    this.getCaptchaImage()
  },
  methods: {
    /**
     * 获取验证码图片
     */
    async getCaptchaImage() {
      this.focusIfRefreshOldCaptcha()
      this.clearInput()

      const { success, data } = await loadingRequest(captchaImage(), this)
      if (success) {
        this.captchaBaseUrl = `data:image/gif;base64,${data.captchaBase64}`
        this.$emit('update:uuid', data.uuid)
      }
    },
    /**
     * 若刷新了旧的验证码，则将焦点设置到验证码的输入框中
     */
    focusIfRefreshOldCaptcha() {
      if (this.uuid !== '') {
        this.$refs.captchaInput.focus()
      }
    },
    /**
     * 清理输入
     */
    clearInput() {
      this.$emit('update:uuid', '')
      this.input = ''
    }
  }
}
</script>

<style scoped>
.captcha {
  width: 111px;
  height: 36px;
  cursor: pointer;
}
</style>
