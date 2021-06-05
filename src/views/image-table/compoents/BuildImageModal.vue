<template>
  <Modal modal-id="buildImageModal">
    <template #header>
      <BasicModalHeader class="blue">
        构建镜像
      </BasicModalHeader>
    </template>
    <div class="m-padded-t m-padded-lr-large">
      <el-steps :active="active" finish-status="success" simple>
        <el-step title="上传文件" icon="el-icon-upload" />
        <el-step title="填写信息" icon="el-icon-edit" />
      </el-steps>
    </div>
    <div v-if="active === 0" class="ui center aligned container m-padded-tb-big">
      <el-upload
        ref="upload"
        :before-upload="beforeUpload"
        :http-request="requestUpload"
        :show-file-list="false"
        :multiple="false"
        drag
        action="#"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传{{ allowType.join('/') }}文件，且不超过{{ maxSize }}MB</div>
      </el-upload>
    </div>
    <div v-else>
      <Form ref="imageBuildForm" form-id="imageBuildForm" :validate-rule="validateRule()" :success-callback="submit">
        <LeftLabeledInputField :data.sync="form.name" name="name" label="名称" />
        <LeftLabeledInputField :data.sync="form.version" name="version" label="版本" />
        <LeftLabeledInputField :data.sync="form.description" name="description" label="描述" />
        <BasicField>
          <div class="ui toggle checkbox m-padded-tb tip-popup">
            <input id="share" v-model="form.share" data-content="是否共享此应用" type="checkbox">
            <label for="share">是否共享</label>
          </div>
        </BasicField>
        <LeftLabeledField v-if="fileType === 'jar'" label="Java版本">
          <el-select v-model="javaVersion" placeholder="请选择Java版本">
            <el-option
              v-for="version in javaVersionOptions"
              :key="version"
              :label="version"
              :value="version"
            />
          </el-select>
        </LeftLabeledField>
      </Form>
    </div>
    <div class="ui two buttons">
      <div class="ui button" :class="{'disabled': active===0}" @click="move(-1)">上一步</div>
      <div class="ui button" :class="{'disabled': active===1}" @click="move(1)">下一步</div>
    </div>
    <template #actions>
      <div class="actions">
        <div class="ui grey cancel button">取消</div>
        <div class="ui green ok button" :class="{'disabled': active !== 1}" @click="validateForm">提交</div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'
import BasicModalHeader from '@/components/Modal/header/BasicModalHeader'
import {
  getFileName,
  getFileType,
  showErrorToast,
  showSuccessToast
} from '@/utils/publicUtils'
import { Loading } from 'element-ui'
import LeftLabeledInputField from '@/components/Form/field/LeftLabeledInputField'
import BasicField from '@/components/Form/field/BasicField'
import Form from '@/components/Form'
import { FormValidation } from '@/model/FormValidation'
import { buildImage } from '@/api/dockerserve/imageAPI'
import LeftLabeledField from '@/components/Form/field/LeftLabeledField'

export default {
  name: 'BuildImageModal',
  components: { LeftLabeledField, Form, BasicField, LeftLabeledInputField, BasicModalHeader, Modal },
  data() {
    return {
      active: 0,
      canSubmit: false,
      maxSize: 100,
      allowType: ['jar'],
      form: this.getDefaultForm(),
      fileType: '',
      javaVersionOptions: ['自动', '6', '7', '8', '9', '10', '11'],
      javaVersion: '自动'
    }
  },
  methods: {
    /**
     * 提交构建数据
     */
    async submit() {
      const loadingInstance = Loading.service({ fullscreen: true, text: '上传中，请稍等...' })
      const { success } = await buildImage(this.buildFormData())
      if (success) {
        showSuccessToast({
          message: '构建镜像成功'
        })
        this.$emit('buildSuccess')
      }
      loadingInstance.close()
    },
    /**
     * 移动激活页
     * @param step 移动步长
     */
    move(step) {
      this.active += step
    },
    /**
     * 保存上传文件信息至表单对象中
     * @param file 上传的文件
     */
    requestUpload({ file }) {
      this.form = this.getDefaultForm(file)
    },
    /**
     * 上传预处理
     * @param file 上传的文件
     */
    beforeUpload(file) {
      this.fileType = getFileType(file.name)
      if (!this.allowType.includes(this.fileType)) {
        showErrorToast({
          message: '不支持该文件类型'
        })
        return false
      }
      if (file.size > this.maxSize * 1048576) {
        showErrorToast({
          message: '该文件的大小超过限制'
        })
        return false
      }
      this.move(1)
      return true
    },
    /**
     * 构建上传表单数据
     */
    buildFormData() {
      const formData = new FormData()
      for (const key of Object.keys(this.form)) {
        formData.append(key, this.form[key])
      }
      if (this.fileType === 'jar') {
        formData.append('javaVersion', this.javaVersion === '自动' ? null : this.javaVersion)
      }
      return formData
    },
    /**
     * 设置镜像表单验证规则
     * @return 验证规则
     */
    validateRule() {
      return {
        name: FormValidation.nameStringRule({ fieldName: '名称', minLength: 4, maxLength: 16 }),
        version: FormValidation.imageVersionRules,
        description: FormValidation.maxLengthRule('描述', 256)
      }
    },
    /**
     * 获取默认的表单对象
     * @return 表单对象
     */
    getDefaultForm(file = null) {
      return {
        name: file !== null ? getFileName(file.name) : '',
        type: file !== null ? getFileType(file.name) : '',
        version: 'latest',
        description: '',
        share: false,
        file
      }
    },
    /**
     * 验证表单
     */
    validateForm() {
      this.$refs.imageBuildForm.validaForm()
    }
  }
}
</script>

<style scoped>

</style>
