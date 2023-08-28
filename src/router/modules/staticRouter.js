import { HOME_URL, LOGIN_URL } from '@/config/config'

/**
 * staticRouter(静态路由)
 */
export const staticRouter = [
  {
    path: '/',
    redirect: LOGIN_URL
  },
  {
    path: '/form',
    name: 'form',
    component: () => import('@/views/form/form.vue'),
    meta: { requiresAuth: false, title: '', icon: '', iconType: '', hidden: false }
  },
  {
    path: LOGIN_URL,
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    // 任何人都可访问的页面
    meta: { requiresAuth: false }
  },
  {
    path: '/layout',
    name: 'home',
    component: () => import('@/layout/index.vue'),
    redirect: HOME_URL,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/home/index',
        name: 'index',
        component: () => import('@/views/homePage/index.vue'),
        meta: {
          requiresAuth: true,
          title: '首页',
          icon: 'homePage',
          iconType: 'sl',
          hidden: false
        }
      },
      {
        path: '/consultation/index',
        name: 'consultationIndex',
        component: () => import('@/views/consultation/index.vue'),
        meta: {
          requiresAuth: true,
          title: '会诊管理',
          icon: 'consultation',
          iconType: 'sl',
          hidden: false
        }
      },
      {
        path: '/consultation/form',
        name: 'consultationForm',
        component: () => import('@/views/consultation/consultationForm.vue'),
        meta: {
          requiresAuth: true,
          title: '会诊管理表单',
          icon: '',
          iconType: '',
          hidden: true
        },
        props: (route) => ({ ...route.query })
      },
      {
        path: '/dataAnalysis/index',
        name: 'dataAnalysisIndex',
        component: () => import('@/views/dataAnalysis/index.vue'),
        meta: {
          requiresAuth: true,
          title: '数据分析',
          icon: 'dataAnalysis',
          iconType: 'sl',
          hidden: false
        }
      },
      {
        path: '/system/user',
        name: 'user',
        component: () => import('@/views/system/user/index.vue'),
        meta: {
          requiresAuth: true,
          title: '用户管理',
          icon: 'User',
          iconType: 'el',
          hidden: false
        }
      },
      {
        path: '/system/hospital',
        name: 'hospital',
        component: () => import('@/views/hospital/index.vue'),
        meta: {
          requiresAuth: true,
          title: '医院信息管理',
          icon: 'settings',
          iconType: 'sl',
          hidden: false
        }
      },
      {
        path: '/system/hospital/detail/:hospitalId',
        name: 'hospitalDetail',
        component: () => import('@/views/hospital/detail.vue'),
        meta: {
          requiresAuth: true,
          title: '',
          icon: '',
          iconType: '',
          hidden: true
        },
        props: (route) => ({ ...route.params })
      }
    ]
  }
]

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/components/ErrorMessage/403.vue'),
    meta: {
      title: '403页面'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/components/ErrorMessage/404.vue'),
    meta: {
      title: '404页面'
    }
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/components/ErrorMessage/500.vue'),
    meta: {
      title: '500页面'
    }
  }
]

/**
 * notFoundRouter(找不到路由)
 */
export const notFoundRouter = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  redirect: { name: '404' }
}
