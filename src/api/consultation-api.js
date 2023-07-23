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
