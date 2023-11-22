<template>
	<a-layout class="h-full">
		<a-layout-header>
			<a-page-header title="ArcoDesign" subtitle="ArcoDesign Vue 2.0">
				<template #extra>
					<a-button>退出</a-button>
					<a-button @click="menuState.collapsed=!menuState.collapsed">
						changemenu
					</a-button>
					<a-button @click="collapsed =!collapsed">
						changeside
					</a-button>
				</template>
			</a-page-header>
		</a-layout-header>
		<a-layout class="overflow-hidden">
			<a-layout-sider v-model:collapsed="collapsed" collapsible>
				<a-scrollbar style="overflow: auto" class="h-[calc(100vh-112px)]">
					<component :is="renderMenuList"></component>
				</a-scrollbar>
			</a-layout-sider>
			<router-view v-slot="{ Component }">
				<transition mode="out-in">
					<keep-alive>
						<component :is="Component"></component>
					</keep-alive>
				</transition>
			</router-view>
		</a-layout>
	</a-layout>
</template>

<script setup>
import { useUserStore } from '@/store'
import { Menu, MenuItem, SubMenu } from '@arco-design/web-vue'
import { Suspense, defineAsyncComponent, h, reactive } from 'vue'
import {IconApps} from '@arco-design/web-vue/es/icon'
const userStore = useUserStore()
const collapsed = ref(false)
const menuState = reactive({
  collapsed:false,
  'default-open-keys': ['0'],
  'default-selected-keys': [],
})

const renderMenuList = () => {
  return h(Menu, menuState, userStore.menuList.map(renderMenuItem))
}
const renderMenuItem = (menu) => {
  if (menu.children) {
    return h(SubMenu, { title: menu.title,key:menu.name},{
      default: menu.children.map(renderMenuItem),
      icon:suspense(menu.icon)
    })
  }
 
  return h(MenuItem, { key: menu.name }, {
    default:menu.title,
     icon:suspense(menu.icon)
  })
}

const suspense = (c)=>{
  if(!c) return ''
  return h(Suspense,null,{
    default:h(defineAsyncComponent(c)),
  })
}
console.log(renderMenuList())
</script>
<style scoped></style>
