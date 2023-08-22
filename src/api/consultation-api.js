import { Request } from '@/request/request.js'

const apiPrefix = '/cdms/consultation'

/**
 * 医院信息api
 */
export class HospitalService {
  static hospital = {
    /**
     * 查询列表
     * @param {Object} query
     * @return {Promise<*>}
     */
    getList: (query) => Request.get(`${apiPrefix}/hospital/page`, query),

    /**
     * 查询详情
     * @param {string|number} id
     * @return {Promise<*>}
     */
    getInfoById: (id) => Request.get(`${apiPrefix}/hospital/info/${id}`),

    add: (data) => Request.post(`${apiPrefix}/hospital/add`, data),

    update: (data) => Request.put(`${apiPrefix}/hospital/modify`, data),

    /**
     * 删除
     * @param {string|number} id
     * @return {Promise<*>}
     */
    del: (id) => Request.delete(`${apiPrefix}/hospital/remove/${id}`),

    /**
     * 批量删除
     * @param {Array<string>|Array<number>}ids
     * @return {Promise<*>}
     */
    delBatch: (ids) => Request.delete(`${apiPrefix}/hospital/removes/`, ids)
  }

  static hospitalPharmacist = {
    /**
     * 查询详情
     * @param {string|number} id
     * @return {Promise<*>}
     */
    getInfoById: (id) => Request.get(`${apiPrefix}/hospitalPharmacist/info/id/${id}`),

    /**
     * 查询详情
     * @param {string|number} hospitalKey
     * @return {Promise<*>}
     */
    getInfoByHospitalKey: (hospitalKey) =>
      Request.get(`${apiPrefix}/hospitalPharmacist/info/hospitalKey/${hospitalKey}`),

    addOrUpdate: (data) => Request.post(`${apiPrefix}/hospitalPharmacist/addOrModify`, data),

    /**
     * 删除
     * @param {string|number} id
     * @return {Promise<*>}
     */
    del: (id) => Request.delete(`${apiPrefix}/hospitalPharmacist/remove/${id}`),

    /**
     * 批量删除
     * @param {Array<string>|Array<number>}ids
     * @return {Promise<*>}
     */
    delBatch: (ids) => Request.delete(`${apiPrefix}/hospitalPharmacist/removes/`, ids)
  }

  static pharmacist = {
    /**
     * 查询列表分页
     * @param {Object} query
     * @return {Promise<*>}
     */
    getListByPage: (query) => Request.get(`${apiPrefix}/pharmacist/page`, query),

    /**
     * 查询列表
     * @param {string|number} hospitalKey
     * @return {Promise<*>}
     */
    getList: (hospitalKey) => Request.get(`${apiPrefix}/pharmacist/list/${hospitalKey}`),

    /**
     * 查询药师信息详情 - 问卷中使用
     * @param{Object} data
     * @return {Promise<*>}
     */
    getPharmacistInfo: (data) => Request.post(`${apiPrefix}/pharmacist/getPharmacistInfo`, data),

    /**
     * 查询详情
     * @param {string|number} id
     * @return {Promise<*>}
     */
    getInfoById: (id) => Request.get(`${apiPrefix}/pharmacist/info/${id}`),

    addOrUpdate: (data) => Request.post(`${apiPrefix}/pharmacist/saveOrUpdate`, data),

    /**
     * 删除
     * @param {string|number} id
     * @return {Promise<*>}
     */
    del: (id) => Request.delete(`${apiPrefix}/pharmacist/remove/${id}`),

    /**
     * 批量删除
     * @param {Array<string>|Array<number>}ids
     * @return {Promise<*>}
     */
    delBatch: (ids) => Request.delete(`${apiPrefix}/pharmacist/removes/`, ids)
  }
}

/**
 * 问卷
 */
export class QuestionnaireService {
  static questionnaire = {
    /**
     * 获取问卷tab和模板
     * @param {string} code
     * @return {Promise<*>}
     */
    getTabInfo: (code) => Request.get(`${apiPrefix}/questionnaire/getTabInfo/${code}`),

    /**
     * @typedef {object} answer
     * @property {Object} answerMap - 答题信息
     * @property {number} isFinished - 是否是已完成 0:否 1：是
     * @property {number} recordId - 记录id
     * @example {"answerMap": {},"isFinished": 0,"recordId": 0}
     */
    /**
     * 保存用户填写问卷记录信息
     * @param  {answer} data
     * @return {Promise<*>}
     */
    saveAnswer: (data) => Request.post(`${apiPrefix}/questionnaire/saveAnswer`, data),

    /**
     * 获取用户填写问卷记录信息
     * @param {number} recordId
     * @return {Promise<*>}
     */
    getAnswer: (recordId) => Request.post(`${apiPrefix}/questionnaire/getAnswer/${recordId}`)
  }
}

/**
 * 会诊
 */
export class ConsultationService {
  static consultation = {
    list: (query) => Request.get(`${apiPrefix}/userRecord/page`, query)
  }

  static patient = {
    list: (query) => Request.post(`${apiPrefix}/patient/getPatientInfo`, query)
  }
}
