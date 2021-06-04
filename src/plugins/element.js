import Vue from 'vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  DatePicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Menu,
  MenuItem,
  Pagination,
  Scrollbar,
  Submenu,
  Upload,
  Loading,
  Radio,
  Steps,
  Step,
  Select,
  Option,
  Tabs,
  TabPane,
  Button,
  Input,
  Tag,
  Row,
  Col
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Scrollbar)
Vue.use(DatePicker)
Vue.use(Upload)
Vue.use(Radio)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Button)
Vue.use(Input)
Vue.use(Tag)
Vue.use(Row)
Vue.use(Col)

Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
