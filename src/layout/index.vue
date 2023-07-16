<template>
  <el-container>
    <el-aside :width="sidebarCollapse ? '65px' : '210px'">
      <Sidebar />
    </el-aside>
    <el-container>
      <el-header>
        <Header v-model:sidebar-collapse="sidebarCollapse" />
      </el-header>
      <el-scrollbar>
        <el-main>
          <!-- ↓layout路由视图 -->
          <router-view />
        </el-main>
      </el-scrollbar>
      <el-footer height="auto">
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import { defineComponent, provide, ref } from 'vue'
import Sidebar from '@/layout/sidebar/index.vue'
import Header from '@/layout/header/index.vue'
import Footer from '@/layout/footer/index.vue'

defineComponent({
  name: 'PageLayout'
})

// ↓侧边栏折叠
const sidebarCollapse = ref(false)
// ↓提供给sidebar注入
provide('sidebarCollapse', sidebarCollapse)
</script>

<style scoped>
.el-header {
  padding: 0;
  height: 48px;
}

.el-main {
  height: calc(100vh - 78px);
  box-sizing: border-box;
  padding: 24px 75px;
  overflow-x: hidden;
  background: #f4f6fb;
}

.el-aside {
  width: auto;
  background-color: #ffffff;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.1);
  transition: width 0.25s;
  -webkit-transition: width 0.25s;
  -moz-transition: width 0.25s;
  -o-transition: width 0.25s;
}

.el-footer {
  padding: 0;
}
</style>
