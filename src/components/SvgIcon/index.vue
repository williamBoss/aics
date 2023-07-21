<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :width="props.size"
    :height="props.size"
  >
    <use
      :href="symbolId"
      :fill="props.color"
    />
  </svg>
</template>

<script setup>
import { computed, defineComponent } from 'vue'

defineComponent({
  name: 'SvgIcon'
})

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: '1em'
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
