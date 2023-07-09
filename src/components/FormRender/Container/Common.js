import { computed, onMounted, ref } from 'vue'
import { loadComponents } from '@components/FormRender/LoadComponents.js'

export const commonProps = {
  widget: { type: Object, default: Object }
}

export const useCommonComputed = (props) => {
  const components = ref({})
  const customClass = computed(() => (props.widget && props.widget.options.customClass) || '')

  onMounted(async () => {
    components.value = await loadComponents()
  })

  const getComponentByContainer = (comp) => {
    return components.value[comp.type + '-container']
  }

  return {
    customClass,
    components,
    getComponentByContainer
  }
}
