import Vue from 'vue'
import { Button,Form,FormItem,Input,Message } from 'element-ui'
import axios from "axios";

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
//全局挂在
Vue.prototype.$message = Message;
