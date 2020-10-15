import Vue from 'vue'
import Router from 'vue-router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引用组件
import Index from '@/components/Index'
Vue.use(ElementUi)
Vue.use(Router)

export default new Router({
  /*  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Registered',
      name: 'Registered',
      component: Registered
    },
    {
      path: '/Test',
      component: Test
    }
  ]
  */
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
