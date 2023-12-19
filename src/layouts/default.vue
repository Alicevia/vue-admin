<template>
	<t-layout class="h-full gap-2 !mr-2 overflow-hidden">
		<t-aside width="fit-content">
			<div style="overflow: auto" class="h-[calc(100vh-0px)]">
				<component :is="renderMenuList(userStore.menuList)"></component>
			</div>
		</t-aside>
		<t-layout class="gap-2 overflow-hidden">
			<t-header class="flex items-center rounded-bl-xl rounded-br-xl
       flex-shrink-0 justify-between px-2">
				<t-space align="center">
					<t-button shape="round" theme="default"
						@click="collapsed=!collapsed">
						<template #icon>
							<ChevronRightIcon v-if="collapsed"></ChevronRightIcon>
							<ChevronLeftIcon v-else></ChevronLeftIcon>
						</template>
					</t-button>
					<t-breadcrumb>
						<t-breadcrumb-item v-for="item of breadcrumbList" :key="item.name" :to="item.name">
							<t-dropdown v-if="item.children" :options="formatData(item.children)">
								<span>{{ item.meta?.title }}</span>
							</t-dropdown>
							<span v-else>{{ item.meta?.title }}</span>
						</t-breadcrumb-item>
					</t-breadcrumb>
				</t-space>
				<t-space align="center">
					<t-button n theme="default" shape="circle"
						@click="toggle">
						<FullscreenExitIcon v-if="isFullscreen"></FullscreenExitIcon>
						<FullscreenIcon v-else></FullscreenIcon>
					</t-button>
					<t-button theme="default" shape="circle"
						@click="themeStore.toggleTheme()">
						<template #icon>
							<SunnyIcon v-if="themeStore.isDark"></SunnyIcon>
							<MoonIcon v-else></MoonIcon>
						</template>
					</t-button>
					<t-popup placement="bottom-right" show-arrow>
						<t-button theme="default" shape="circle">
							<template #icon>
								<ChatErrorIcon></ChatErrorIcon>
							</template>
						</t-button>

						<!-- <div slot="content">触发元素是指触发浮层内容显示的元素</div> -->
						<template #content>
							<t-tabs value="first">
								<t-tab-panel value="first" label="通知">
									<p style="padding: 25px">
										选项卡1
									</p>
								</t-tab-panel>
								<t-tab-panel value="second" label="关注">
									<p style="padding: 25px">
										选项卡2
									</p>
								</t-tab-panel>
								<t-tab-panel value="third" label="待办">
									<p style="padding: 25px">
										选项卡3
									</p>
								</t-tab-panel>
							</t-tabs>
						</template>
					</t-popup>
	
					<t-divider layout="vertical" class="!mx-0"></t-divider>
					<span>ALICEVIA</span>
					<t-dropdown position="bl" trigger="hover">
						<t-avatar>
							W
						</t-avatar>
						<t-dropdown-menu>
							<t-dropdown-item @click="router.push({name:'account'})">
								个人中心
							</t-dropdown-item>
							<t-dropdown-item>
								退出登录
							</t-dropdown-item>
						</t-dropdown-menu>
					</t-dropdown>
				</t-space>
			</t-header>
			<nav-record></nav-record>
			<t-content class="flex-1 overflow-hidden">
				<AppKeepAlive></AppKeepAlive>
			</t-content>
		</t-layout>
	</t-layout>
</template>

<script setup lang="jsx">
import { useUserStore, useThemeStore } from '@/store'
import { Menu, MenuItem, Submenu } from 'tdesign-vue-next'
import { Suspense, computed, defineAsyncComponent, h, reactive  } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFullscreen } from '@vueuse/core'
import NavRecord from './components/nav-record.vue'
import { LogoAppleFilledIcon } from 'tdesign-icons-vue-next'
const { isFullscreen,  toggle } = useFullscreen(document.documentElement)
const userStore = useUserStore()
const themeStore = useThemeStore()
const router = useRouter()
const route = useRoute()
const include=ref([]) 

 
const findMenuByName = (menu, name) => {
  return menu.find(item => {
    if(item.name==name) return true
    if(item.children) return !!findMenuByName(item.children, name)
  })
}

const formatData =(list) => {
  if(!list) return null
  return list.map(item => {
    return { ...item, content: item.meta.title, value: item.name, children: formatData(item.children) }
  })
}
const breadcrumbList = computed(() => {
  const name=menuState.value
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
  const name=menuState.value
  return  findMenuByName(userStore.routes, name)
})

const collapsed = ref(false)
const menuState = reactive({
  theme: 'dark',
  collapsed,
  value: route.matched.filter(route => route.name).map(route => route.name).at(-1),
  'onUpdate:value' (v){
    menuState.value =v
  },
  expanded: route.matched.filter(route => route.name).map(route => route.name).slice(0, -1),
  'onUpdate:expanded' (v){
    menuState.expanded=v
  },
  onChange (name) {
    router.push({  name })
  },
})

watchEffect(() => {
  menuState.value = route.name
  if(route.meta.isKeepAlive){
    include.value=[...new Set([...include.value, route.name, 'test'])]
  }
})
const renderMenuList = (menuList) => {
  return h(Menu, menuState, {
    default: () => menuList.map((item) => renderMenuItem(item)),
    logo: () => <div class="flex  justify-center items-center !ml-6  gap-2
      font-bold text-xl text-title overflow-hidden">
      <LogoAppleFilledIcon></LogoAppleFilledIcon>
      {!collapsed.value?<span> ALICEVIA PRO </span>:null}  
    </div>,
  },
  )
}
 

const renderMenuItem = (menu, renderIcon=true) => {
  if (menu.children) {
    return h(Submenu, { title: menu.meta?.title, value: menu.name }, {
      default: () => menu.children.map((item) => renderMenuItem(item, renderIcon)),
      icon: renderIcon? () => suspense(menu.icon):null,
    })
  }
  return h(MenuItem, { value: menu.name }, {
    default: () => menu.meta?.title,
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
