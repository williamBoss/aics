<template>
  <static-content-wrapper :field="field">
    <el-divider
      ref="fieldEditor"
      direction="horizontal"
      :content-position="field.options.contentPosition"
    >
      {{ field.options.label }}
    </el-divider>
  </static-content-wrapper>
</template>

<script setup>
import { commonProps } from '@components/FormRender/FormWidget/common.js'
import { defineComponent } from 'vue'
import StaticContentWrapper from '@components/FormRender/FormWidget/StaticContentWrapper.vue'

defineComponent({
  name: 'DividerWidget'
})

defineProps({
  ...commonProps
})
</script>

<style scoped></style>
