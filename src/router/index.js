import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: "/", redirect:"/login" },//重定向
  { path: "/login", component: Login },
  { path: "/home", component: Home }
]

const router = new VueRouter({
  routes
})
//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to将要访问的路径
  //from从那个路径跳转而来
  //next是一个函数，表示放行  第一种用法next()  第二种next('/login')
  if (to.path == '/login') {
    return next();
  }
  //获取token
  const tokenStr = window.sessionStorage.getItem("token");
  if(!tokenStr)
  {
    return next('/login');
  }
  next();
})
export default router
