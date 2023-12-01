const modules = import.meta.glob('./*/index.(js|jsx|ts|tsx|vue)', { eager: true })

export const registerLibComponent = (app) => {
  for (const key in modules) {
    const component = modules[key]
    app.component(component.default.name, component.default)
  }
}