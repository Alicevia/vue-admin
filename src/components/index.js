const modules = import.meta.glob('./*/index.(js|jsx|ts|tsx|vue)', { eager: true })
console.log(modules)

export const registerComponent = (app) => {
  for (const key in modules) {
    const component = modules[key]
    app.component(component.default.name, component.default)
  }
}