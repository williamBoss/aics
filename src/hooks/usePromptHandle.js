import { ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/index.css'

/**
 * @description 操作单条数据信息(二次确认【删除、禁用、启用】)
 * @param {String} message 提示信息(必传)
 * @param {String} confirmType icon类型(不必传,默认为 warning)
 * @return {Promise}
 */
export const usePromptHandle = (message, confirmType = 'warning') => {
  return ElMessageBox.prompt(`${message}?`, '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: confirmType,
    draggable: true
  })
}
