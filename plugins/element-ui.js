import Vue from 'vue'
import Element from 'element-ui'
//Vue.use(Element)
import {
  Carousel,
  CarouselItem,
  Message,
  Loading,
  Pagination,
  Form,
  FormItem,
  Input,
  Col,
  RadioGroup,
  RadioButton,
  Upload,
  Cascader,
  Radio,
  Dialog
} from "element-ui" //引入Carousel

Message.install = function (Vue, options) {
  Vue.prototype.$message = Message
  Vue.prototype.$loading = Loading
}
export default () => {
  Vue.use(Carousel);
  Vue.use(CarouselItem);
  Vue.use(Message);
  Vue.use(Loading);
  Vue.use(Pagination);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Input);
  Vue.use(Col);
  Vue.use(RadioGroup);
  Vue.use(RadioButton);
  Vue.use(Upload);
  Vue.use(Cascader);
  Vue.use(Radio);
  Vue.use(Dialog);
}