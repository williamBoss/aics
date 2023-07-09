<template>
  <el-form
    ref="fromRenderRef"
    class="form-render"
    :class="[customClass]"
    :model="formDataModel"
    :rules="rules"
    :label-position="labelPosition"
    :label-width="labelWidth"
    :size="size"
    :disabled="disabled"
    :scroll-to-error="true"
    @submit.prevent
  >
    <template v-for="widget in widgetList">
      <template v-if="widget.category && 'container' === widget.category">
        <component
          :is="getContainerWidgetName(widget)"
          :key="widget.id"
          :widget="widget"
        >
          <!-- 递归传递插槽！！！ -->
          <template
            v-for="slot in Object.keys($slots)"
            #[slot]="scope"
          >
            <slot
              :name="slot"
              v-bind="scope"
            />
          </template>
        </component>
      </template>
      <template v-else>
        <component
          :is="getWidgetName(widget)"
          :key="widget.id"
          :field="widget"
          :form-model="formDataModel"
        >
          <!-- 递归传递插槽！！！ -->
          <template
            v-for="slot in Object.keys($slots)"
            #[slot]="scope"
          >
            <slot
              :name="slot"
              v-bind="scope"
            />
          </template>
        </component>
      </template>
    </template>
  </el-form>
</template>

<script setup>
import { computed, defineComponent, getCurrentInstance, onMounted, provide, ref } from 'vue'
import { buildDefaultFormJson } from '@components/FormRender/formConfig.js'
import { generateId } from '@/utils/util.js'
import { cloneDeep } from 'lodash'
import { loadComponents } from '@components/FormRender/loadComponents.js'

defineComponent({
  name: 'FormRender'
})

const props = defineProps({
  // prop传入的表单JSON配置
  formJson: {
    type: Object,
    default: () => buildDefaultFormJson()
  },
  // prop传入的表单数据
  formData: {
    type: Object,
    default: () => ({})
  }
})
const instance = getCurrentInstance()
const components = ref({})
const formId = ref(null)
const fromRenderRef = ref()
const formJsonObj = ref(props.formJson)
const formDataModel = ref({})
const widgetRefList = ref({})
const formConfig = computed(() => formJsonObj.value.formConfig)
const widgetList = computed(() => formJsonObj.value.widgetList)
const customClass = computed(() => (formConfig.value && formConfig.value.customClass) || '')
const rules = computed(() => (formConfig.value && formConfig.value.rules) || {})
const labelPosition = computed(() => (formConfig.value && formConfig.value.labelPosition) || 'left')
const labelWidth = computed(() => (formConfig.value && formConfig.value.labelWidth + 'px') || '80px')
const size = computed(() => (formConfig.value && formConfig.value.size) || 'default')
const disabled = computed(() => (formConfig.value && formConfig.value.disabled) || false)

provide('refList', widgetRefList)
provide('formConfig', formJsonObj.value.formConfig)
provide('formModel', { formModel: formDataModel })

const getContainerWidgetName = (widget) => {
  return components.value[widget.type + '-container']
}

const getWidgetName = (widget) => {
  return components.value[widget.type + '-widget']
}

const initFormObject = () => {
  formId.value = 'FormRender' + generateId()
  registerFormToRefList()
  handleOnCreated()
}

const registerFormToRefList = () => {
  widgetRefList.value['form_render_ref'] = instance
}

const handleOnCreated = () => {
  if (formConfig.value && formConfig.value.onFormCreated) {
    const customFunc = new Function(formConfig.value.onFormCreated)
    customFunc.call(instance)
  }
}

const buildFormModel = (widgetList) => {
  if (widgetList && widgetList.length > 0) {
    widgetList.forEach((wItem) => {
      buildDataFromWidget(wItem)
    })
  }
}

const buildDataFromWidget = (wItem) => {
  if (wItem.category === 'container') {
    switch (wItem.type) {
      case 'layout-grid':
        processContainers(wItem.cols)
        break
      case 'tab':
        wItem.tabs?.forEach((tabItem) => processContainers(tabItem.widgetList))
        break
      case 'grid-col':
        processContainers(wItem.widgetList)
        break
      default:
        break
    }
  } else if (wItem.category === 'formItem') {
    processFormWidget(wItem)
  }
}

const processContainers = (widgetList) => {
  widgetList?.forEach((childItem) => buildDataFromWidget(childItem))
}

const processFormWidget = (wItem) => {
  if (!props.formData.hasOwnProperty(wItem.options.name)) {
    formDataModel[wItem.options.name] = wItem.options.defaultValue
  } else {
    const initialValue = props.formData[wItem.options.name]
    formDataModel[wItem.options.name] = cloneDeep(initialValue)
  }
}

initFormObject()
buildFormModel((formJsonObj.value && formJsonObj.value.widgetList) || null)

onMounted(async () => {
  components.value = await loadComponents()
})
</script>

<style scoped></style>
