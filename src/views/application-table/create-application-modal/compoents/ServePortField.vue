<template>
  <LeftLabeledField label="开放端口">
    <el-tag
      v-for="port in portList"
      :key="port"
      closable
      :disable-transitions="false"
      class="m-margin-l"
      @close="removePort(port)"
    >
      {{ port }}
    </el-tag>
    <el-input
      v-if="inputPortVisible"
      ref="savePortInput"
      v-model="inputPortValue"
      class="input-new-tag"
      size="small"
      @keyup.enter.native="addPort"
      @blur="addPort"
    />
    <el-button v-else class="button-new-tag" size="small" @click="showPortInput">
      新增端口
    </el-button>
  </LeftLabeledField>
</template>

<script>
import LeftLabeledField from '@/components/Form/field/LeftLabeledField'
import { showWarnToast } from '@/utils/publicUtils'

export default {
  name: 'ServePortField',
  components: { LeftLabeledField },
  data() {
    return {
      portList: [],
      inputPortVisible: false,
      inputPortValue: ''
    }
  },
  watch: {
    /**
     * 监听端口列表的改变
     * 将端口列表以'changePort'事件的形式向上抛出
     * @param newValue 新值
     */
    portList: {
      handler: function(newValue) {
        this.$emit('changePort', newValue)
      },
      deep: true
    }
  },
  methods: {
    /**
     * 移除端口
     * @param port 端口
     */
    removePort(port) {
      this.portList.splice(this.portList.indexOf(port), 1)
    },
    /**
     * 增加端口
     */
    addPort() {
      const value = this.inputPortValue
      if (value) {
        const port = Number(value)
        if (Number.isInteger(port) && port > 0 && port < 60999) {
          if (!this.portList.includes(port)) {
            this.portList.push(port)
          }
        } else {
          showWarnToast({
            message: '端口号不合法'
          })
        }
      }
      this.inputPortValue = ''
      this.inputPortVisible = false
    },
    /**
     * 显示端口输入框
     */
    showPortInput() {
      this.inputPortVisible = true
      this.$nextTick(_ => {
        this.$refs.savePortInput.$refs.input.focus()
      })
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
