<template>
  <div
    class="field-wrapper"
    :class="[customClass]"
  >
    <div
      v-if="!field.options.hidden"
      class="static-content-item"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from 'vue'
import { commonProps, useCommonComputed } from '@components/FormRender/FormWidget/common.js'

defineComponent({
  name: 'StaticContentWrapper'
})

const props = defineProps({
  ...commonProps
})

const { customClass } = useCommonComputed(props)
</script>

<style scoped></style>
