import { computed, inject } from 'vue'
import { cloneDeep } from 'lodash'

export const commonProps = {
  field: {
    type: Object,
    default: Object
  }
}

export const useCommonComputed = (props) => {
  const formConfig = inject('formConfig')
  const widgetSize = computed(() => props.field.options.size || 'default')

  return {
    formConfig,
    widgetSize
  }
}

export const useEventFunction = (instance, props, oldFieldValue) => {
  const handleBlurCustomEvent = (event) => {
    if (props.field.options.onBlur) {
      const customFn = new Function('event', props.field.options.onBlur)
      customFn.call(instance, event)
    }
  }

  const handleFocusCustomEvent = (event) => {
    // 保存修改change之前的值
    oldFieldValue.value = cloneDeep(props.fieldModel)
    if (props.field.options.onFocus) {
      const customFn = new Function('event', props.field.options.onFocus)
      customFn.call(instance, event)
    }
  }

  const handleChangeEvent = (value) => {
    if (props.field.options.onChange) {
      const customFn = new Function('value', props.field.options.onChange)
      customFn.call(instance, value)
    }
  }

  const handleInputCustomEvent = (value) => {
    if (props.field.options.onInput) {
      const customFn = new Function('value', props.field.options.onInput)
      customFn.call(instance, value)
    }
  }

  return {
    handleBlurCustomEvent,
    handleFocusCustomEvent,
    handleChangeEvent,
    handleInputCustomEvent
  }
}
