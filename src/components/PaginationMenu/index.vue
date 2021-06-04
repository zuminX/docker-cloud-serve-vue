<template>
  <div class="ui pagination menu">
    <el-pagination
      :current-page.sync="currentPage"
      :page-count="totalPage"
      :page-size="pageSize"
      :page-sizes="[1, 5, 10, 20]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="$emit('currentChange', currentPage, pageSize)"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import { getDefaultPageInformation } from '@/components/PaginationMenu/PaginationMenu'

export default {
  name: 'PaginationMenu',
  props: {
    pageInformation: {
      type: Object,
      required: true
    }
  },
  data() {
    return getDefaultPageInformation()
  },
  watch: {
    /**
     * 监听分页信息对象的改变，并同步更改到该组件的数据中
     */
    pageInformation() {
      const information = this.pageInformation
      if (information) {
        this.currentPage = information.currentPage
        this.pageSize = information.pageSize
        this.totalPage = information.totalPage
      }
    }
  },
  methods: {
    /**
     * 处理每页条数的改变
     * @param pageSize 每页条数
     */
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.$emit('currentChange', this.currentPage, this.pageSize)
    }
  }
}
</script>
