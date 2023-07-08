const comps = {}

const modules = import.meta.glob('./**/*.vue')
for (const path in modules) {
  if (modules.hasOwnProperty(path)) {
    const module = await modules[path]()
    comps[module.default.name] = module.default
  }
}

export default comps
