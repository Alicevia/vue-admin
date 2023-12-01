const modules = import.meta.glob('./*/index.(js|jsx|ts|tsx|vue)', { eager: true })
console.log(modules)

export const registerComponent = () => {
  
}