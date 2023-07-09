import { cloneDeep } from 'lodash'

/**
 * 默认表单配置
 * @return {{modelName: string, rulesName: string, size: string, labelPosition: string, labelAlign: string, customClass: *[], labelWidth: number, refName: string}}
 */
export function getDefaultFormConfig() {
  return {
    modelName: 'formData',
    refName: 'formRef',
    rulesName: 'rules',
    labelWidth: 80,
    labelPosition: 'left',
    size: '',
    labelAlign: 'label-left-align',
    customClass: []
  }
}

/**
 * 默认表单配置
 * @return {{formConfig: (*|undefined), widgetList: *[]}}
 */
export function buildDefaultFormJson() {
  return {
    widgetList: [],
    formConfig: cloneDeep(getDefaultFormConfig())
  }
}
