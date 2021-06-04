<template>
  <div class="app-container">
    <div class="ui grid">
      <div class="six wide column">
        <h3 class="ui top attached header center aligned">
          个人信息
        </h3>
        <div class="ui attached segment center aligned">
          <div class="user-info-head" @click="showModal('modifyAvatarModal')">
            <img
              :src="avatar"
              class="img-circle img-lg"
              title="点击上传头像"
            ></div>
        </div>
        <div class="ui bottom attached segment">
          <div class="ui large middle aligned divided list">
            <div class="item">
              <div class="right floated content">
                {{ user.username }}
              </div>
              <div class="content">
                <i class="ui icon user" />
                用户名
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ten wide column">
        <p>昵称：{{ user.nickname }}</p>
      </div>
    </div>
    <ModifyAvatarModal />
  </div>
</template>

<script>
import store from '@/store'
import {
  mapGetters
} from 'vuex'
import ModifyAvatarModal from '@/views/user-information/components/ModifyAvatarModal'
import { showModal } from '@/components/Modal/Modal'

export default {
  name: 'UserInformationModal',
  components: { ModifyAvatarModal },
  data() {
    return {
      avatar: store.getters.avatar
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    showModal
  }
}
</script>

<style lang="scss" scoped>
.user-info-head {
  position: relative;
  display: inline-block;
  height: 120px;
}

.user-info-head:hover:after {
  content: '+';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #eee;
  background: rgba(0, 0, 0, 0.5);
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  line-height: 110px;
  border-radius: 50%;
}

.img-circle {
  border-radius: 50%;
}

.img-lg {
  width: 120px;
  height: 120px;
}
</style>

