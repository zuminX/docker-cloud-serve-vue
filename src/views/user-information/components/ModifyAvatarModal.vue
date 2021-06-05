<template>
  <Modal modal-id="modifyAvatarModal">
    <template v-slot:header>
      <BasicModalHeader>修改头像</BasicModalHeader>
    </template>
    <div class="app-container">

      <div class="ui stackable two column grid">
        <div class="column" style="height: 350px">
          <VueCropper
            ref="cropper"
            :auto-crop="options.autoCrop"
            :auto-crop-height="options.autoCropHeight"
            :auto-crop-width="options.autoCropWidth"
            :fixed-box="options.fixedBox"
            :img="options.img"
            :info="true"
            @realTime="realTime"
          />
        </div>
        <div class="column">
          <div class="avatar-upload-preview">
            <img :src="previews.url" :style="previews.img">
          </div>
        </div>
      </div>
      <div class="ui grid container">
        <div class="four wide column">
          <el-upload :before-upload="beforeUpload" :http-request="requestUpload" :show-file-list="false" action="#">
            <div class="ui icon button blue">
              <i class="cloud upload alternate icon" />
              选择
            </div>
          </el-upload>
        </div>
        <div class="four wide column">
          <div class="ui icon buttons">
            <button class="ui icon button" @click="changeScale(1)">
              <i class="plus icon" />
            </button>
            <button class="ui icon button" @click="changeScale(-1)">
              <i class="minus icon" />
            </button>
            <button class="ui icon button" @click="rotateLeft">
              <i class="undo icon" />
            </button>
            <button class="ui icon button" @click="rotateRight">
              <i class="redo icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <template v-slot:actions>
      <OkOrCancelModalActions @clickCheck="uploadImg" />
    </template>
  </Modal>
</template>

<script>
import store from '@/store'
import Modal from '@/components/Modal'
import { VueCropper } from 'vue-cropper'
import BasicModalHeader from '@/components/Modal/header/BasicModalHeader'
import OkOrCancelModalActions from '@/components/Modal/actions/OkOrCancelModalActions'
import {
  showErrorToast,
  showSuccessToast
} from '@/utils/publicUtils'
import axios from 'axios'
import { getUploadAvatarPolicy } from '@/api/ums/profileAPI'

export default {
  name: 'ModifyAvatarModal',
  components: { OkOrCancelModalActions, BasicModalHeader, Modal, VueCropper },
  data() {
    return {
      options: {
        img: store.getters.avatar, // 裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fileName: ''
      },
      previews: {}
    }
  },
  methods: {
    /**
     * 上传图片
     */
    async uploadImg() {
      const _this = this
      this.$refs.cropper.getCropBlob(async function(avatar) {
        const { success, data } = await getUploadAvatarPolicy()
        if (!success) {
          return
        }
        const name = `${Date.now()}_${_this.options.fileName}`
        const result = await axios({
          method: 'post',
          url: data.host,
          data: _this.buildFormData(data, avatar, name)
        })
        if (result.success) {
          showSuccessToast({
            message: '头像修改成功'
          })
          store.commit('SET_AVATAR', data.host + '/' + data.dir + name)
        }
      })
    },
    /**
     * 构建上传表单数据
     * @param policy 上传凭证
     * @param  file 文件
     * @param name 文件名
     */
    buildFormData(policy, file, name) {
      const formData = new FormData()
      formData.append('OSSAccessKeyId', policy.accessKeyId)
      formData.append('policy', policy.policy)
      formData.append('signature', policy.signature)
      formData.append('callback', policy.callback)
      formData.append('key', policy.dir + name)
      formData.append('file', file)
      return formData
    },
    /**
     * 实时预览
     * @param data 数据
     */
    realTime(data) {
      this.previews = data
    },
    /**
     * 向左旋转
     */
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    /**
     * 向右旋转
     */
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    /**
     * 图片缩放
     * @param num 缩放尺度
     */
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    /**
     * 覆盖默认的上传行为
     */
    requestUpload() {
    },
    /**
     * 上传预处理
     * @param file 上传的文件
     */
    beforeUpload(file) {
      if (file.type.indexOf('image/') === -1) {
        showErrorToast({
          message: '文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件'
        })
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.options.img = reader.result
      }
      this.options.fileName = file.name
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}
</style>
