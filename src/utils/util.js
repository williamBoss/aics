/**
 * @description 获取当前时间
 * @return {string}
 */
export function getTimeState() {
  // 获取当前时间
  const timeNow=new Date()
  // 获取当前小时
  const hours=timeNow.getHours()
  // 判断当前时间段
  if (hours >= 6&&hours <= 10) return '早上好 ⛅'
  if (hours >= 10&&hours <= 14) return '中午好 🌞'
  if (hours >= 14&&hours <= 18) return '下午好 🌞'
  if (hours >= 18&&hours <= 24) return '晚上好 🌛'
  if (hours >= 0&&hours <= 6) return '凌晨好 🌛'
}

/**
 * 获取本地图片
 * @param {string} pathName assert下图片路径及名称
 * @return {string}
 */
export function getImageUrl(pathName) {
  return new URL(`../assets/${ pathName }.jpg`, import.meta.url).href
}

/**
 * @description 表单重置
 * @param {formInstance} formEl
 */
export const resetForm=(formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

/**
 * @description 添加日期范围
 * @param {Object} params
 * @param {string} propName
 * @return {*}
 */
export function addDateRange(params, propName) {
  const search=params
  search.params={}
  const { dateRange }=search
  if (dateRange&&'' !== dateRange) {
    if (!propName) {
      search.params[ 'beginTime' ]=dateRange[ 0 ]
      search.params[ 'endTime' ]=dateRange[ 1 ]
    } else {
      search.params[ 'begin' + propName ]=dateRange[ 0 ]
      search.params[ 'end' + propName ]=dateRange[ 1 ]
    }
    delete search.dateRange
  }
  return search
}

/**
 * 使用递归，过滤需要缓存的路由
 * @param {Array} menuList 所有菜单列表
 * @param {Array} cacheArr 缓存的路由菜单 name ['**','**']
 * @return {Array}
 */
export function getKeepAliveRouterName(menuList, cacheArr) {
  menuList.forEach((item) => {
    item.meta.noCache&&item.name&&cacheArr.push(item.name)
    item.children?.length&&getKeepAliveRouterName(item.children, cacheArr)
  })
  return cacheArr
}

/**
 * @description 使用递归，过滤出需要渲染在左侧菜单的列表（剔除 isHide == true 的菜单）
 * @param {Array} menuList 所有菜单列表
 * @return {Array}
 * */
export function getShowMenuList(menuList) {
  const newMenuList=JSON.parse(JSON.stringify(menuList))
  return newMenuList.filter((item) => {
    item.children?.length&&(item.children=getShowMenuList(item.children))
    return !item?.hidden
  })
}

/**
 * @description 使用递归处理路由菜单 path，生成一维数组(第一版本地路由鉴权会用到)
 * @param {Array} menuList 所有菜单列表
 * @param {Array} menuPathArr 菜单地址的一维数组 ['**','**']
 * @return {Array}
 */
export function getMenuListPath(menuList, menuPathArr) {
  menuList.forEach((item) => {
    typeof item === 'object'&&item.path&&menuPathArr.push(item.path)
    item.children?.length&&getMenuListPath(item.children, menuPathArr)
  })
  return menuPathArr
}

/**
 * @description 使用递归，过滤出当前路径匹配的面包屑地址
 * @param {String} path 当前访问地址
 * @param {Array} menuList 所有菜单列表
 * @return {Array}
 */
export function getCurrentBreadcrumb(path, menuList) {
  const tempPath=[]
  try {
    const getNodePath=(node) => {
      tempPath.push(node)
      if (node.path === path) throw new Error('Find IT!')
      if (node.children?.length) node.children.forEach((item) => getNodePath(item))
      tempPath.pop()
    }
    menuList.forEach((item) => getNodePath(item))
  } catch (e) {
    return tempPath
  }
}

/**
 * @description 双重递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 所有菜单列表
 * @return {Object}
 */
export function getAllBreadcrumbList(menuList) {
  const handleBreadcrumbList={}
  const loop=(menuItem) => {
    if (menuItem?.children?.length) menuItem.children.forEach((item) => loop(item))
    else handleBreadcrumbList[ menuItem.path ]=getCurrentBreadcrumb(menuItem.path, menuList)
  }
  menuList.forEach((item) => loop(item))
  return handleBreadcrumbList
}

/**
 * @description 扁平化数组对象(主要用来处理路由菜单)
 * @param {Array} menuList 所有菜单列表
 * @return {Array}
 */
export function getFlatArr(menuList) {
  menuList.filter((route) => {
    if (route.children) {
      route.children=filterChildren(route.children)
    }
    return true
  })
  return menuList.reduce((pre, current) => {
    let flatArr=[ ...pre, current ]
    if (current.children) {
      flatArr=[ ...flatArr, ...getFlatArr(current.children) ]
    }
    return flatArr
  }, [])
}

/**
 * 过滤展平子节点
 * @param {Array} childrenMap
 * @return {*[]}
 */
function filterChildren(childrenMap) {
  let children=[]
  childrenMap.forEach((el) => {
    if (!new RegExp('^/').test(el.path)) el.path='/'.concat(el.path)
    if (el.children&&el.children.length) {
      if (el.component === 'ParentView') {
        el.children.forEach((c) => {
          c.path=el.path + '/' + c.path
          if (c.children&&c.children.length) {
            children=children.concat(filterChildren(c.children))
            return
          }
          children.push(c)
        })
        return
      }
    }
    children=children.concat(el)
  })
  return children
}

/**
 * tree扁平化
 *
 * @param {Array} tree
 * @param {string} children
 * @return {*}
 */
export function treeToArray(tree, children) {
  return tree.reduce((pre, current) => {
    let flatArr=[ ...pre, current ]
    if (current[ children ]) {
      flatArr=[ ...flatArr, ...treeToArray(current[ children ], children) ]
    }
    return flatArr
  }, [])
}
