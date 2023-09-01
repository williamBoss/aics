import { computed, inject, watch } from 'vue'
import { cloneDeep } from 'lodash'

export const commonProps = {
  field: {
    type: Object,
    default: Object
  }
}

export const useCommonComputed = (props) => {
  const formConfig = inject('formConfig')
  const customClass = computed(() => (props.widget && props.widget.options.customClass) || '')
  const widgetSize = computed(() => props.field.options.size || 'default')

  return {
    formConfig,
    customClass,
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

export const useInitField = (props, oldFieldValue, fieldModel) => {
  const { formModel } = inject('formModel')
  const setFormData = inject('setFormData')

  const initFieldModel = () => {
    if (!props.field.formItemFlag) {
      return
    }

    if (formModel.value[props.field.options.name] === undefined && props.field.options.defaultValue) {
      fieldModel.value = props.field.options.defaultValue
    } else if (formModel.value[props.field.options.name] === undefined) {
      formModel.value[props.field.options.name] = null
    } else if (props.field.type === 'checkbox') {
      const formModelValue = formModel.value[props.field.options.name]
      fieldModel.value = (typeof formModelValue === 'string' && JSON.parse(formModelValue)) || []
      fieldModel.value = fieldModel.value.map((value) => value.trim())
    } else {
      fieldModel.value = formModel.value[props.field.options.name]
    }
    oldFieldValue.value = cloneDeep(fieldModel.value)
  }

  watch(fieldModel, (newVal, oldVal) => {
    if (newVal !== oldVal) {
      const formData = {
        [props.field.options.name]: newVal
      }
      setFormData(formData)
    }
  })

  return { initFieldModel, setFormData, watch }
}
