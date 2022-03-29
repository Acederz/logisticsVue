import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import Loginpage from '@/views/Login'
import A from '@/views/A'
const index = () => import('@/views/index')
const T_WL_ITEMSIZE = () => import('@/views/T_WL_ITEMSIZE')
const B = () => import('@/views/B')
Vue.use(Router)

let router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Loginpage
    },
    {
      path: '/login',
      name: 'login',
      component: Loginpage
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children:[
        {
          path: '/a',
          name: 'A',
          component: A
        },
        {
          path: '/b',
          name: 'B',
          component: B
        },
        {
          path: '/T_WL_ITEMSIZE',
          name: 'T_WL_ITEMSIZE',
          component: T_WL_ITEMSIZE
        }
      ]
    }
  ]
})

//对每次访问之前都要先看是否已经登录
router.beforeEach((to,from,next)=>{
  if(to.path.startsWith('/login')){
      window.sessionStorage.removeItem('access-token');
      next();
  }else{
      let token = window.sessionStorage.getItem('access-token');
      if(!token){
          //未登录  跳回主页面
          next({path:'/login'});
      }else{
          next();
      }
  }

});

export default router