/**
 * @description pinia持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state name
 * @param {Storage} storage 存储位置
 * @return {{paths: Array, storage: Storage, key: String}} persist
 * */
const piniaPersistConfig = (key, paths = [], storage = window.localStorage) => {
  return {
    key,
    storage,
    paths
  }
}

export default piniaPersistConfig
