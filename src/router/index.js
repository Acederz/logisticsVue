import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import Loginpage from '@/views/Login'
const index = () => import('@/views/index')
const T_WL_ITEMSIZE = () => import('@/views/T_WL_ITEMSIZE')
const T_MANUAL_EST_EC = () => import('@/views/T_MANUAL_EST_EC')
const T_MANUAL_NEWS_EC_LIST_STATE = () => import('@/views/T_MANUAL_NEWS_EC_LIST_STATE')
const T_VIETNAM_POA_FILE = () => import('@/views/T_VIETNAM_POA_FILE')
const T_LAZADA_COST = () => import('@/views/T_LAZADA_COST')
const T_TIKI_PRODUCT = () => import('@/views/T_TIKI_PRODUCT')
const T_NEW_RETAIL_DYGMV = () => import('@/views/T_NEW_RETAIL_DYGMV')
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
          path: '/T_WL_ITEMSIZE',
          name: '打的',
          component: T_WL_ITEMSIZE
        },
        {
          path: '/T_MANUAL_EST_EC',
          name: 'T_MANUAL_EST_EC',
          component: T_MANUAL_EST_EC
        },
        {
          path: '/T_MANUAL_NEWS_EC_LIST_STATE',
          name: 'T_MANUAL_NEWS_EC_LIST_STATE',
          component: T_MANUAL_NEWS_EC_LIST_STATE
        },
        {
          path: '/T_VIETNAM_POA_FILE',
          name: 'T_VIETNAM_POA_FILE',
          component: T_VIETNAM_POA_FILE
        },
        {
          path: '/T_LAZADA_COST',
          name: 'T_LAZADA_COST',
          component: T_LAZADA_COST
        },
        {
          path: '/T_TIKI_PRODUCT',
          name: 'T_TIKI_PRODUCT',
          component: T_TIKI_PRODUCT
        },
        {
          path: '/T_NEW_RETAIL_DYGMV',
          name: 'T_NEW_RETAIL_DYGMV',
          component: T_NEW_RETAIL_DYGMV
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