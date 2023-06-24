import { defineStore } from 'pinia'
import { getKeepAliveRouterName, getShowMenuList, getAllBreadcrumbList } from '@/utils/util.js'
import { LoginService } from '@api/sys-api.js'
import { reactive, toRefs } from 'vue'
import piniaPersistConfig from '@/config/persist.js'

// AuthStore
export const authStore = defineStore(
  'AuthState',
  () => {
    const state = () =>
      reactive({
        // menuList 作为动态路由，不会做持久化存储
        authMenuList: []
      })
    // 后端返回的菜单列表
    const authMenuListGet = (state) => state.authMenuList
    // 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
    const showMenuListGet = (state) => getShowMenuList(state.authMenuList)
    // 面包屑导航列表
    const breadcrumbListGet = (state) => getAllBreadcrumbList(state.authMenuList)
    // 需要缓存的菜单 name，用作页面 keepAlive
    const keepAliveRouterGet = (state) => getKeepAliveRouterName(state.authMenuList)
    // getAuthMenuList
    const getAuthMenuList = async () => {
      const { data } = await LoginService.getRouters()
      state.authMenuList = data
    }
    return {
      ...toRefs(state),
      authMenuListGet,
      showMenuListGet,
      breadcrumbListGet,
      keepAliveRouterGet,
      getAuthMenuList
    }
  },
  {
    persist: piniaPersistConfig('AuthState', ['authMenuList'])
  }
)
