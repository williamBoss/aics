<template>
  <div class="not-container">
    <img
      src="@/assets/images/404.png"
      class="not-img"
      alt="404"
    />
    <div class="not-detail">
      <h2>404</h2>
      <h4>抱歉，您访问的页面不存在~🤷‍♂️🤷‍♀️</h4>
      <el-button
        type="primary"
        @click="router.push(HOME_URL)"
        >返回首页
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { HOME_URL } from '@/config/config'
import { defineComponent } from 'vue'

defineComponent({
  name: '404Page'
})

const router = useRouter()
</script>

<style scoped>
@import 'index.css';
</style>
