<template>
  <div class="sidebar">
    <el-scrollbar>
      <div class="logo">
        <img
          src="@/assets/images/logo/logo-header.png"
          alt=""
        />
      </div>
      <el-menu
        :default-active="'specialisedClinic'"
        class="menu"
        background-color="#3156A3"
        text-color="#fff"
        :collapse="sidebarCollapse"
        :collapse-transition="false"
      >
        <SubMenu :menuList="menu.children" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { defineComponent, inject, ref } from 'vue'
import SubMenu from '@/layout/sidebar/subMenu/index.vue'
import { staticRouter } from '@/router/modules/staticRouter'

defineComponent({
  name: 'SidebarMenu'
})

// ↓注入父组件值
const sidebarCollapse = ref(inject('sidebarCollapse'))

// todo 暂时使用静态路由生成菜单 后面需要调整为接口获取
// const menu = AuthStore()
const menu = staticRouter.find((e) => e.name === 'home')
</script>

<style scoped>
.sidebar {
  height: 100vh;
  background: #3156a3;
}

.sidebar .menu {
  border-right: unset;
}

.sidebar .menu :deep(.el-menu-item) {
  margin-left: 10px;
}

.sidebar .menu :deep(.el-menu-item.is-active) {
  width: 100%;
  height: 80px;
  background: url('@/assets/images/menu-active.svg') no-repeat;
  font-size: 14px;
  font-weight: 500;
  color: #486da3;
}

.sidebar .logo {
  height: 70px;
  line-height: 50px;
  padding: 0 10px;
  margin-top: 2px;
  overflow: hidden;
  text-align: center;
}

.sidebar .logo img {
  width: 150px;
  text-align: center;
  vertical-align: middle;
}

.sidebar .logo span {
  width: 96px;
  height: 22px;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  line-height: 22px;
  vertical-align: middle;
}

.sidebar .menu:not(.el-menu--collapse) {
  width: 170px;
}
</style>
