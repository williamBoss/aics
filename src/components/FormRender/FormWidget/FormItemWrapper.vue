<template>
  <el-form-item
    v-if="field.formItemFlag && !field.options.hidden"
    :class="[customClass]"
    :prop="getPropName()"
    :label-width="labelWidth + 'px'"
    :required="field.options.required"
    :rules="rules"
  >
    <template #label>
      <div :style="[labelStyle]">
        {{ label }}
        <el-tooltip
          v-if="field.options.labelTooltip"
          placement="right"
          effect="dark"
        >
          <template #content>
            <div v-html="field.options.tooltipContent"></div>
          </template>
          <el-icon>
            <question-filled />
          </el-icon>
        </el-tooltip>
      </div>
    </template>
    <slot></slot>
  </el-form-item>
</template>

<script setup>
import { computed, defineComponent } from 'vue'
import { commonProps, useCommonComputed } from '@components/FormRender/FormWidget/common.js'
import { QuestionFilled } from '@element-plus/icons-vue'

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
const { customClass, formConfig } = useCommonComputed(props)
const labelWidth = computed(() =>
  props.field.options.labelHidden ? 0 : props.field.options.labelWidth || formConfig.labelWidth || 0
)
const label = computed(() => props.field.options.label || '')
const labelStyle = computed(() =>
  props.field.options.labelHidden && props.field.options.label !== '' ? 'visibility:hidden;' : ''
)

const getPropName = () => {
  return props.field.options.name
}
</script>

<style scoped></style>
