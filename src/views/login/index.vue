<template>
  <div class="ui middle aligned center aligned grid fullHeight">
    <div class="column">
      <h2 class="ui teal header">
        登录你的账户
      </h2>

      <Form ref="loginForm" form-id="loginForm" class="large" :validate-rule="validateRule()" :success-callback="submitLogin">
        <LeftIconInputField icon="user" :data.sync="loginForm.username" placeholder="用户名" name="username" />
        <LeftIconInputField icon="lock" :data.sync="loginForm.password" placeholder="密码" name="password" type="password" />
        <BasicField>
          <CaptchaInput ref="loginCaptcha" v-model="loginForm.code" :uuid.sync="loginForm.uuid" />
        </BasicField>
        <div v-loading="loading" class="ui fluid large teal button" @click="validaLoginForm">登录</div>
      </Form>

      <div class="ui message">
        还没有账户? <a href="javascript:void(0)" @click="jumpToRegister">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { FormValidation } from '@/model/FormValidation'
import CaptchaInput from '@/components/CaptchaInput/index'
import Form from '@/components/Form/index'
import LeftIconInputField from '@/components/Form/field/LeftIconInputField'
import BasicField from '@/components/Form/field/BasicField'
import { getBasicInfo } from '@/api/ums/infoAPI'
import { setData } from '@/utils/sessionStorageUtils'
import { login } from '@/api/ums/securityAPI'
import { loadingRequest } from '@/api'

export default {
  name: 'Login',
  components: { BasicField, LeftIconInputField, Form, CaptchaInput },
  data() {
    return {
      // 登陆表单
      loginForm: {
        username: '',
        password: '',
        code: '',
        uuid: ''
      },
      captchaBaseUrl: '',
      loading: false
    }
  },
  mounted() {
    this.setUsername()
  },
  methods: {
    /**
     * 跳转到注册页面
     */
    jumpToRegister() {
      this.$router.replace('/register')
    },
    /**
     * 提交表单，进行登录
     */
    async submitLogin() {
      let result = await loadingRequest(login(this.loginForm), this)
      if (!result.success) {
        this.refreshCaptcha()
        return
      }
      this.loading = false
      this.$store.commit('SET_TOKEN', result.data.token)
      setData('refresh_token', result.data.refreshToken)
      result = await getBasicInfo()
      if (result.success) {
        this.$store.commit('SET_USER', result.data)
        await this.$router.replace('/home')
      }
    },
    /**
     * 从路由中获取用户名，并设置到表单中
     */
    setUsername() {
      const username = this.$router.currentRoute.query.username
      if (username) {
        this.loginForm.username = username
      }
    },
    /**
     * 刷新验证码
     */
    refreshCaptcha() {
      this.$refs.loginCaptcha.getCaptchaImage()
    },
    /**
     * 设置登录表单验证规则
     */
    validateRule() {
      return {
        username: FormValidation.usernameRules,
        password: FormValidation.passwordRules,
        code: FormValidation.captchaRules
      }
    },
    /**
     * 校验登录表单
     */
    validaLoginForm() {
      this.$refs.loginForm.validaForm()
    }
  }
}
</script>

<style scoped>
.column {
  max-width: 450px !important;
}
</style>
