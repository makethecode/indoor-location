import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'beacon-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/home',
    component: Layout,
    redirect: '/home/dashboard',
    name: 'dashboard',
    meta: { title: '实时监控', icon: 'home' },
    children: [{
      path: 'dashboard',
      name: 'ashboard',
      component: () => import('@/views/reTrack/index'),
      meta: { title: '实时监控', icon: 'eye-open' }
    }]
  },
  {
    path: '/register',
    component: () => import('@/views/register/register'),
    hidden: true
  },
  {
    path: '/traceReplay',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'traceReplay',
        component: () => import('@/views/traceReplay/index'),
        meta: { title: '轨迹回放', icon: 'eye-open' }
      }
    ]
  },
  {
    path: '/alarmRecord',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'alarmRecord',
        component: () => import('@/views/alarmRecord/index'),
        meta: { title: '报警记录', icon: 'alarm2' }
      }
    ]
  },
  {
    path: '/dStates',
    component: Layout,
    redirect: '/dStates/',
    name: 'dStates',
    meta: {
      title: '设备状态',
      icon: 'dStates'
    },
    children: [
      {
        path: 'router',
        component: () => import('@/views/dStates/router/index'),
        name: 'router',
        meta: {
          title: '路由',
          icon: 'router'
        }
      },
      {
        path: 'card',
        component: () => import('@/views/dStates/card/index'),
        name: 'card',
        meta: {
          title: '标签',
          icon: 'tag'
        }
      },
      {
        path: 'beacon',
        component: () => import('@/views/dStates/beacon/index'),
        name: 'beacon',
        meta: {
          title: '信标',
          icon: 'dstate'
        }
      }
    ]
  },
  {
    path: '/electricFence',
    component: Layout,
    redirect: '/electricFence/',
    name: 'analyseStat',
    meta: {
      title: '电子围栏',
      icon: 'tree'
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/electricFence/index'),
        meta: { title: '新增电子围栏', icon: 'password' }
      },
      {
        path: 'Show',
        name: 'Show',
        component: () => import('@/views/electricFence/Show'),
        meta: { title: '电子围栏展示', icon: 'show1' }
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/electricFence/list'),
        meta: { title: '管理电子围栏', icon: 'list1' }
      }
    ]
  },
  {
    path: '/analyseStat',
    component: Layout,
    redirect: '/analyseStat/',
    name: 'analyseStat',
    meta: {
      title: '分析统计',
      icon: 'tree'
    },
    children: [
      {
        path: 'onlineStat',
        component: () => import('@/views/analyseStat/onlineStat/index'),
        name: 'OnlineStat',
        meta: {
          title: '在线统计',
          icon: 'onlineStat'
        },
        children: [
          {
            path: 'table',
            component: () => import('@/views/analyseStat/onlineStat/table/index'),
            name: '表格',
            meta: {
              title: '表格',
              icon: 'table'
            }
          },
          {
            path: 'chart',
            component: () => import('@/views/analyseStat/onlineStat/chart/index'),
            name: '图表',
            meta: {
              title: '图表',
              icon: 'chart'
            }
          }
        ]
      },
      {
        path: 'areaAnalyse',
        component: () => import('@/views/analyseStat/areaAnalyse/index'),
        meta: {
          title: '区域分析',
          icon: 'areaAnalyse'
        }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent beacon-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset beacon
}

export default router
