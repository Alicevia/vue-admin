const module = import.meta.glob('../layouts/*.vue')
const layouts={}

const getLayoutFileName = (name)=>{
  const [_,n]= name.match(/([^\/]+)\.vue$/)

  return n
}
for (const name in module) {
  layouts[getLayoutFileName(name)]=module[name]
}



export const setupLayouts = (routes)=>{
  return routes.map(route=>{
    const {layout='default'}=route
    if(!layout){
      return route
    }
    console.log(route)
    return {
      ...route,
      component:layouts[layout],
      children:route.path === '/' ? [route] : [{...route, path: ''}]
    }
  })
}