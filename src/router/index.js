import Vue from 'vue'
import Router from 'vue-router'
import TextObj from '@/view/textObj'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Router)
Vue.use(ElementUI)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'TextObj',
      component: TextObj,
      redirect:'main/index', // 重定向
      children: [
        {
          path: 'index',
          // name:'Main',
          component: () => import('@/view/main')
        }
      ]
    },
    {
      path: '/main',
      name: 'TextObj',
      component: TextObj,
      children: [
        {
          path: 'index',
          name:'Main',
          component: () => import('@/view/main')
        }
      ]
    }
  ]
})
