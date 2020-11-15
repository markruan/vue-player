import Vue from 'vue'
import Router from 'vue-router'
import Mv from "../pages/Mv"
import HelloWorld from '../components/HelloWorld.vue'
import GeDanList from '../pages/GeDanList.vue'
 
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


const router= new Router({


  routes: [
    {
      path: '/mv/:id',
      name: 'mv',
      component: Mv,
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/',
      name: 'index',
      component: HelloWorld,
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/list/:id',
      name: 'list',
      component: GeDanList,
      meta:{
        keepAlive:false
      }
    },
     {
      path: '/moregedan',
      name: 'moregedan',
      component: () => import('../pages/MoreGeDan'),
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/ranks',
      name: 'rank',
      component: () => import('../pages/Rank'),
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login')
    },
    {
      path:'/dayplay',
      name:'dayplay',
      component: () => import('../pages/DayPlay'),
      meta:{
        keepAlive:false,
		requireAuth:true  // 需要登录才能进入的页面可以增加一个meta属性
      }

    }

  ]
})
 
//一般来说只需改这个条件，和下面的跳转路径即可
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if (localStorage.getItem('userinfo')) {// 判断条件，是否登录
      next()  //条件匹配进行下一步路由
    } else {// 条件不匹配则跳转到登录界面或指定页面
      next({
        path: '/login', 
		 
      })
    }
  } else {
    next()
  }
})

export default router  //抛出路由