import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:false` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/register', component: () => import('@/views/register/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: '/home',
  //   name: 'home',
  //   meta: {title: '游戏管理', icon: 'home'},
  //   children: [
  //     {
  //       path: 'home',
  //       name: 'home',
  //       component: () => import('@/views/home/index'),
  //       meta: {title: '游戏管理', icon: 'home'}
  //     },
  //     {
  //       path: 'home/addGameList',
  //       name: 'addGameList',
  //       component: () => import('@/views/home/add.vue'),
  //       meta: {title: '添加商品', icon: 'product-add'}
  //     }
  //   ]
  // },
  {
    path: '',
    component: Layout,
    redirect: '/game',
    name: 'game',
    meta: {title: '游戏管理', icon: 'product'},
    children: [
      {
        path: 'game',
        name: 'gameList',
        component: () => import('@/views/game/index'),
        meta: {title: '游戏列表', icon: 'product-list'},
      },
      {
        path: 'addgame',
        name: 'addGame',
        component: () => import('@/views/game/add.vue'),
        meta: {title: '添加游戏', icon: 'product-add'},
        hidden: true
      },
      {
        path: 'editgame',
        name: 'editGame',
        component: () => import('@/views/game/edit.vue'),
        meta: {title: '编辑游戏', icon: 'product-comment'},
        hidden: true
      },
      {
        path: 'detailgame',
        name: 'detailGame',
        component: () => import('@/views/game/detail.vue'),
        meta: {title: '游戏详情', icon: 'product-cate'},
        hidden: true
      },
      {
        path: 'goodslist',
        name: 'goodsList',
        component: () => import('@/views/goods/index'),
        meta: {title: '商品管理', icon: 'product-list'},
        hidden: false
      },
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/goodsList',
    name: 'goods',
    meta: {title: '商品管理', icon: 'product'},
    hidden: true,
    children: [
      {
        path: 'goodslist',
        name: 'goodsList',
        component: () => import('@/views/goods/index'),
        meta: {title: '商品列表', icon: 'product-list'},
        hidden: true
      },
      {
        path: 'addgoods',
        name: 'addGoods',
        component: () => import('@/views/goods/add.vue'),
        meta: {title: '添加商品', icon: 'product-add'},
        hidden: true
      },
      {
        path: 'editgoods',
        name: 'editGoods',
        component: () => import('@/views/goods/edit.vue'),
        meta: {title: '编辑商品', icon: 'product-comment'},
        hidden: true
      },
      {
        path: 'detailgoods',
        name: 'detailGoods',
        component: () => import('@/views/goods/detail.vue'),
        meta: {title: '商品详情', icon: 'product-cate'},
        hidden: true
      }
    ]
  },
  {
    path: '/detail',
    component: Layout,
    name: 'detail',
    meta: {title: '查看明细', icon: 'order'},
    children: [
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/detail/index.vue'),
        meta: {title: '查看明细', icon: 'order'}
      },
    ]
  },
  
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

