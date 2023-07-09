import { kebabCase } from 'lodash'

export const loadComponents = async () => {
  const comps = {}

  const modules = import.meta.glob('./**/*.vue')
  for (const path in modules) {
    if (Object.prototype.hasOwnProperty.call(modules, path)) {
      const module = await modules[path]()
      comps[kebabCase(module.default.__name)] = module.default
    }
  }

  return comps
}
