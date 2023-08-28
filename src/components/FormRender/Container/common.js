import { computed, onMounted, shallowRef } from 'vue'
import { loadComponents } from '@components/loadComponents.js'

export const commonProps = {
  widget: { type: Object, default: Object }
}

export const useCommonComputed = (props) => {
  const components = shallowRef({})
  const customClass = computed(() => (props.widget && props.widget.options.customClass) || '')

  onMounted(async () => {
    components.value = await loadComponents()
  })

  const getComponentByContainer = (comp) => {
    return components.value[comp.type + '-container']
  }

  const getSelfComponent = (widget) => {
    return components.value[widget.type]
  }

  return {
    customClass,
    components,
    getComponentByContainer,
    getSelfComponent
  }
}
