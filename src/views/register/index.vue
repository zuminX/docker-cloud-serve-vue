<template>
  <div class="ui middle aligned center aligned grid fullHeight">
    <div class="column">
      <h2 class="ui teal header">
        注册你的账户
      </h2>

      <Form ref="registerForm" form-id="registerForm" :validate-rule="validateRule()" class="large" :success-callback="submitRegister">
        <LeftIconInputField icon="user" :data.sync="registerForm.username" placeholder="用户名" name="username" />
        <LeftIconInputField icon="lock" :data.sync="registerForm.password" placeholder="密码" name="password" type="password" />
        <LeftIconInputField icon="blue lock" :data.sync="registerForm.repeatPassword" placeholder="重复输入密码" name="repeatPassword" type="password" />
        <LeftIconInputField icon="green user" :data.sync="registerForm.nickname" placeholder="昵称" name="nickname" />
        <BasicField>
          <CaptchaInput ref="registerCaptcha" v-model="registerForm.code" :uuid.sync="registerForm.uuid" />
        </BasicField>
        <div class="ui fluid large teal button" @click="validaRegisterForm">注册</div>
      </Form>

      <div class="ui message">
        已有账户? <a href="javascript:void(0)" @click="jumpToLogin">登录</a>
      </div>
    </div>
  </div>
</template>

<script>
import { showSuccessToast } from '@/utils/publicUtils'
import { FormValidation } from '@/model/FormValidation'
import CaptchaInput from '@/components/CaptchaInput/index'
import Form from '@/components/Form/index'
import LeftIconInputField from '@/components/Form/field/LeftIconInputField'
import BasicField from '@/components/Form/field/BasicField'
import { register } from '@/api/ums/securityAPI'

export default {
  name: 'Register',
  components: { BasicField, LeftIconInputField, Form, CaptchaInput },
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        repeatPassword: '',
        nickname: '',
        code: '',
        uuid: ''
      }
    }
  },
  methods: {
    /**
     * 跳转到登陆页面
     */
    jumpToLogin() {
      this.$router.replace('/login')
    },
    /**
     * 提交表单，进行注册
     */
    async submitRegister() {
      const { success, data } = await register(this.registerForm)
      if (!success) {
        this.refreshCaptcha()
        return
      }
      showSuccessToast({
        message: `${data.nickname}，恭喜你注册成功，现在正在跳转到登陆页面`
      })
      // 跳转到登陆页面，并携带用户名
      await this.$router.replace(`/login?username=${data.username}`)
    },
    /**
     * 刷新验证码
     */
    refreshCaptcha() {
      this.$refs.registerCaptcha.getCaptchaImage()
    },
    /**
     * 设置注册表单验证规则
     */
    validateRule() {
      return {
        username: FormValidation.usernameRules,
        password: FormValidation.passwordRules,
        repeatPassword: FormValidation.repeatPasswordRules,
        nickname: FormValidation.nicknameRules,
        code: FormValidation.captchaRules
      }
    },
    /**
     * 校验注册表单
     */
    validaRegisterForm() {
      this.$refs.registerForm.validaForm()
    }
  }
}
</script>

<style scoped>
.column {
  max-width: 450px !important;
}
</style>
