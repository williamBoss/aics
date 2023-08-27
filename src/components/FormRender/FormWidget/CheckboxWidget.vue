<template>
  <form-item-wrapper
    :field="field"
    :rules="rules"
  >
    <el-checkbox-group
      ref="fieldEditor"
      v-model="fieldModel"
      :disabled="field.options.disabled"
      :size="widgetSize"
      @change="handleChangeEvent"
    >
      <div class="checkbox-container">
        <el-checkbox
          v-for="(item, index) in field.options.optionItems"
          :key="index"
          :class="{
            'el-checkbox': true,
            'row-checkbox-option': field.options.isRowCheckOption
          }"
          :label="item.value"
          :disabled="item.disabled"
        >
          {{ item.label }}
        </el-checkbox>
      </div>
    </el-checkbox-group>
  </form-item-wrapper>
</template>

<script setup>
import FormItemWrapper from '@components/FormRender/FormWidget/FormItemWrapper.vue'
import {
  commonProps,
  useCommonComputed,
  useEventFunction,
  useInitField
} from '@components/FormRender/FormWidget/common.js'
import { getCurrentInstance, ref } from 'vue'

const props = defineProps({
  ...commonProps
})
const fieldEditor = ref()
const oldFieldValue = ref(null)
const fieldModel = ref([])
const rules = ref([])

const { widgetSize } = useCommonComputed(props)
const { handleChangeEvent } = useEventFunction(getCurrentInstance, props, oldFieldValue)
const { initFieldModel } = useInitField(props, oldFieldValue, fieldModel)
initFieldModel?.()
</script>

<style scoped>
.checkbox-container {
  display: flex;
  flex-wrap: wrap;
}

.checkbox-container .el-checkbox {
  margin-bottom: 10px;
}

.row-checkbox-option {
  flex: 0 0 100%;
}
</style>
