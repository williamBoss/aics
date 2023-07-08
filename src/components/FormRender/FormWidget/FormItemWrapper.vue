<template>
  <el-form-item
    v-if="field.formItemFlag && field.options.hidden"
    :class="[customClass]"
    :prop="getPropName()"
    :label="label"
    :label-width="labelWidth + 'px'"
    :required="field.options.required"
    :rules="rules"
  >
    <slot></slot>
  </el-form-item>
</template>

<script setup>
import { computed, defineComponent, inject } from 'vue'
import { useCommonComputed } from '@components/FormRender/Container/Common.js'
import { commonProps } from '@components/FormRender/FormWidget/Common.js'

defineComponent({
  name: 'FormItemWrapper'
})

const props = defineProps({
  ...commonProps,
  rules: {
    type: Array,
    default: Array
  }
})
const formConfig = inject('formConfig')
const { customClass } = useCommonComputed(props)
const labelWidth = computed(() => {
  if (props.field.options.labelHidden) {
    return 0
  }
  return props.field.options.labelWidth || formConfig.value.labelWidth
})
const label = computed(() => (!props.field.options.labelHidden && props.field.options.label) || '')

const getPropName = () => {
  return props.field.options.name
}
</script>

<style scoped></style>
