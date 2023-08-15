import axios from './axios'

/**
 * 请求方法
 */
export class Request {
  /**
   * get方法
   * @param {string} url 路径
   * @param {object} params 参数
   * @return {Promise<unknown>} 返回
   */
  static get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  /**
   * post方法
   * @param {string} url 路径
   * @param {object} params 参数
   * @param {AxiosRequestConfig} config 请求头配置
   * @return {Promise<unknown>} 返回
   */
  static post = (url, params = {}, config = {}) => {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params, config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  /**
   * put方法
   * @param {string} url 路径
   * @param {object} params 参数
   * @return {Promise<unknown>} 返回
   */
  static put = (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .put(url, params)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  /**
   * delete方法
   * @param {string} url 路径
   * @param {object} params 参数
   * @return {Promise<unknown>} 返回
   */
  static delete = (url, params = {}) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, params)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
