import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
import './plugins/element.js'
import preventClick from './utils/controlClickState'
import '@/permission'

import '@/icons'
import '../semantic/dist/semantic.css'
import '../semantic/dist/semantic.js'
import '@/assets/styles/index.scss'
import {
  isDev,
  isMock
} from '@/utils/coreUtils'

Vue.config.productionTip = false
Vue.use(preventClick)

if (isMock() && isDev()) {
  require('../mock')
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
