<template>
  <div :id="loaderId">
    <div class="ui inverted dimmer">
      <div class="ui text loader">加载中</div>
    </div>
    <slot />
  </div>
</template>

<script>
import { createUniqueString } from '@/utils/tool'

export default {
  name: 'Loader',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loaderId: this.createUniqueString()
    }
  },
  watch: {
    /**
     * 监听show属性，若其发生变化则改变调光器的显示状态
     */
    show() {
      this.changeItemListDimmer()
    }
  },
  methods: {
    createUniqueString,
    /**
     * 改变调光器的显示状态
     */
    changeItemListDimmer() {
      $(`#${this.loaderId}`).dimmer(this.show ? 'show' : 'hide')
    }
  }
}
</script>
