import { Request } from '@/request/request.js'

/**
 * @description -封装User类型的接口方法
 */
export class UserService {
  static user = {
    getInfo: () => Request.get('/system/user/getInfo'),

    getInfoById: (userId) => Request.get(`/system/user/${userId}`),

    getList: (query) => Request.get('/system/user/list', query),

    changeUserStatus: (params) => Request.put('/system/user/changeStatus', params),

    del: (userId) => Request.delete(`/system/user/${userId}`),

    resetUserPwd: (userId, password) => Request.put('/system/user/resetPwd', { userId, password }),

    addUser: (data) => Request.post('/system/user', data),

    updateUser: (data) => Request.put('/system/user', data)
  }
}

/**
 * 系统基础请求
 */
export class LoginService {
  // 获取验证码
  static getCodeImg = () => Request.get('/code')

  // 登录方法
  static login = (username, password, code, uuid) => Request.post('/auth/login', { username, password, code, uuid })

  // 退出方法
  static logout = () => Request.delete('/auth/logout')

  // 获取路由
  static getRouters = () => Request.get('/system/menu/getRouters')
}

/**
 * 查询部门
 */
export class DeptService {
  // 获取组织树
  static getDeptTreeSelect = () => Request.get('/system/dept/treeselect')
}

/**
 * 查询字典
 */
export class DictService {
  // 根据字典类型查询字典数据信息
  static getDictByType = (dictType) => Request.get(`/system/dict/data/type/${dictType}`)
}
