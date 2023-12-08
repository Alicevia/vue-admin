<template>
	<t-layout class="h-full gap-3 bg-fbase">
		<t-aside v-model:collapsed="collapsed" collapsible>
			<div class="flex gap-2 justify-center items-center p-2 font-bold 
       text-xl  text-title overflow-hidden">
				<LogoAppleFilledIcon></LogoAppleFilledIcon><span v-if="!collapsed"> ALICEVIA </span>
			</div>
			<div style="overflow: auto" class="h-[calc(100vh-112px)]">
				<!-- <component :is="renderMenuList(userStore.menuList)"></component> -->
			</div>
		</t-aside>
		<t-layout class="overflow-hidden  gap-2">
			<t-header class=" bg-over1">
				<!-- <div :show-back="false">
					<template #title>
						<t-button shape="round" @click="collapsed=!collapsed">
							<IconCaretRight v-if="collapsed"></IconCaretRight>
							<IconCaretLeft v-else></IconCaretLeft>
						</t-button>
					</template>
					<template #subtitle>
						<t-breadcrumb>
							<template #separator>
						<ChevronRightIcon />
							</template>

							<t-breadcrumb-item v-for="item of breadcrumbList" :key="item.name">
								<t-trigger trigger="hover">
									<span>{{ item.title }}</span>
									<template #content>
										<component :is="renderMenuListInBreadcrumb([item])"></component>
									</template>
								</t-trigger>
							</t-breadcrumb-item>
						</t-breadcrumb>
					</template>
					<template #extra>
						<t-space>
							<template #split>
								<t-divider direction="vertical">
								</t-divider>
							</template>
							<t-button shape="circle" @click="toggle">
								<template #icon>
									<fullscreen-exit-1 v-if="isFullscreen"></fullscreen-exit-1> 
							<Fullscreen1Icon else />
								</template>
							</t-button>
							<t-button shape="circle" @click="themeStore.toggleTheme()">
								<template #icon>
									<sunny v-if="themeStore.isDark"></sunny>
									<moon v-else></moon> 
								</template>
							</t-button>
							<span>ALICEVIA</span>
							<t-dropdown position="bl" trigger="hover">
								<t-avatar :size="30" :style="{ backgroundColor: '#14a9f8' }">
									<IconUser></IconUser>
								</t-avatar>
								<template #content>
									<t-buton>
										个人中心
									</t-buton>
									<t-buton>
										退出
									</t-buton>
								</template>
							</t-dropdown>
						</t-space>
					</template>
				</div> -->
			</t-header>
			<t-content class="flex flex-col gap-2">
				<nav-record></nav-record>

				<router-view v-slot="{ Component }">
					<keep-alive>
						<component :is="Component"></component>
					</keep-alive>
				</router-view>  
			</t-content>
		</t-layout>
	</t-layout>
</template>

<script setup>
import { useUserStore, useThemeStore } from '@/store'
import { Menu, MenuItem, Submenu } from 'tdesign-vue-next'
import { Suspense, computed, defineAsyncComponent, h, onActivated, reactive, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFullscreen } from '@vueuse/core'
import NavRecord from './components/nav-record.vue'

const { isFullscreen,  toggle } = useFullscreen(document.documentElement)
const userStore = useUserStore()
const themeStore = useThemeStore()
const router = useRouter()
const route = useRoute()

const findMenuByName = (menu, name) => {
  return menu.find(item => {
    if(item.name==name) return true
    if(item.children) return !!findMenuByName(item.children, name)
  })
}
 
const breadcrumbList = computed(() => {
  const [name]=menuState.selectedKeys
  if(!currentMenu.value) return []
 
  return flatMenu([currentMenu.value], name)??[]
})
 
const flatMenu = (menu, name, data=[]) => {
  for (let index = 0; index < menu.length; index++) {
    const item = menu[index]
    data.push(item)
    if(item.name==name) return data
    if(item.children){
      
      let res =  flatMenu(item.children, name, data)
      if(res){
        return res
      }
    }
    data.pop()
  }
}


const currentMenu = computed(() => {
  const [name]=menuState.selectedKeys
  return  findMenuByName(userStore.routes, name)
})

const collapsed = ref(false)
const menuState = reactive({
  collapsed: false,
  selectedKeys: [],
  openKeys: [],
  'onUpdate:openKeys' (x){
    menuState.openKeys=x
  },
  'onUpdate:selectedKeys' (x){
    menuState.selectedKeys=x
  },
  onMenuItemClick (path) {
    router.push({  path })
  },
})
watchEffect(() => {
  const matchedPath = route.matched.filter(route => route.name).map(route => route.name)
  menuState.selectedKeys= matchedPath.slice(-1)
  menuState.openKeys= matchedPath.slice(0, -1)
})

const renderMenuList = (menuList) => {
  return h(Menu, menuState,
    () => menuList.map((item) => renderMenuItem(item)))
}
const renderMenuListInBreadcrumb = (menuList) => {
  return h(Menu, { mode: 'pop',  onMenuItemClick: menuState.onMenuItemClick },
    () => menuList.map((item) => renderMenuItem(item, false)))
}

const renderMenuItem = (menu, renderIcon=true) => {
  if (menu.children) {
    return h(Submenu, { title: menu.title, key: menu.name }, {
      default: () => menu.children.map((item) => renderMenuItem(item, renderIcon)),
      icon: renderIcon? () => suspense(menu.icon):null,
    })
  }
  return h(MenuItem, { key: menu.name }, {
    default: () => menu.title,
    icon: renderIcon?() => suspense(menu.icon):null,
  })
}

const suspense = (c) => {
  if(!c) return null
  return h(Suspense, null, {
    default: () => h(defineAsyncComponent(c)),
  })
}
</script>
<style scoped></style>
