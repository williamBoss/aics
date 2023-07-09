<template>
  <static-content-wrapper :field="field">
    <div>
      <pre>{{ field.options.textContent }}</pre>
    </div>
  </static-content-wrapper>
</template>

<script setup>
import { defineComponent } from 'vue'
import StaticContentWrapper from '@components/FormRender/FormWidget/StaticContentWrapper.vue'
import { commonProps } from '@components/FormRender/FormWidget/common.js'

defineComponent({
  name: 'StaticTextWidget'
})

defineProps({
  ...commonProps
})
</script>

<style scoped></style>
