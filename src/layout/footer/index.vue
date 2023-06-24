<template>
  <div class="footer flx-center">
    <a
      href=""
      target="_blank"
    >
      Copyright © 2018-2021
    </a>
  </div>
</template>

<script setup>
import { defineComponent } from 'vue'

defineComponent({
  name: 'PageFooter'
})
</script>

<style scoped>
.footer {
  height: 30px;
  background: #ffffff;
}

.footer a {
  font-size: 14px;
  color: #858585;
  text-decoration: none;
  letter-spacing: 1px;
}
</style>
