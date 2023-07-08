import { computed } from 'vue'

export const commonProps = {
  widget: { type: Object, default: Object }
}

export const useCommonComputed = (props) => {
  const customClass = computed(() => (props.widget && props.widget.options.customClass) || '')

  const getComponentByContainer = (comp) => {
    return comp.type + '-container'
  }

  return {
    customClass,
    getComponentByContainer
  }
}
