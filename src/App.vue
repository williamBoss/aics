<template>
  <el-config-provider :locale="i18nLocale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { computed } from 'vue'
import { GlobalStore } from '@/store'

const globalStore = GlobalStore()

// element 语言配置
const i18nLocale = computed(() => {
  if (globalStore.language && globalStore.language === 'zh') return zhCn
  if (globalStore.language === 'en') return en
  return zhCn
})
</script>
