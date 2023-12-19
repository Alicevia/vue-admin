<template>
	<div ref="root" class="flex  gap-2 overflow-hidden flex-shrink-0">
		<t-button v-show="isShowLeftArrow" theme="default"
			variant="base"
			shape="square" class="shrink-0"
			@click="moveLeft">
			<template #icon>
				<ChevronLeftIcon></ChevronLeftIcon>
			</template>
		</t-button>
		<div ref="tagsRef" class="flex gap-2 flex-1 flex-shrink-0 overflow-hidden">
			<t-check-tag v-for="(item) in tagList" :key="item.title" 
				:unchecked-props="{
					class:'!bg-container'
				}"
				:checked="item.path==currentTag.select?.path"
				class="flex-shrink-0 "
				:closable="!currentTag.isOnlyOne" size="large" @close="removeTag(item)"
				@click="selectTag(item)">
				{{ item.meta.title }}
			</t-check-tag>
		</div>
		<t-button v-show="isShowRightArrow" theme="default" variant="base"
			shape="square" class=" shrink-0"
			@click="moveRight">
			<template #icon>
				<ChevronRightIcon></ChevronRightIcon>
			</template>
		</t-button>
		<t-dropdown trigger="hover" position="bl">
			<t-button theme="default" shape="square" variant="base"
				class="ml-auto shrink-0">
				<template #icon>
					<ChevronDownIcon></ChevronDownIcon>
				</template>
			</t-button>
			<template #dropdown>
				<t-button @click="refresh">
					刷新
				</t-button>
				<t-button @click="removeTag(currentTag.select)">
					关闭当前
				</t-button>
				<t-button @click="removeOtherTag">
					关闭其他
				</t-button>
				<t-button @click="removeLeftTag">
					关闭左侧
				</t-button>
				<t-button @click="removeRightTag">
					关闭右侧
				</t-button>
			</template>
		</t-dropdown>
	</div>
</template>

<script setup>
import { useRefreshCurrentRouter } from '@/views/refresh'
import { useScroll, useEventListener, useMouseInElement, useElementSize } from '@vueuse/core'
import { computed, nextTick, reactive, watch   } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
const { refresh }=useRefreshCurrentRouter()
const tagsRef=ref()
const root = ref()
const route = useRoute()
const router = useRouter()

const tagList = ref([])


const currentTag = reactive({
  select: null,
  isSelectLast: computed(() => tagList.value.at(-1)==currentTag.select), 
  isOnlyOne: computed(() => tagList.value.length==1),
  index: computed(() => {
    if(currentTag.select){
      return tagList.value.findIndex(item => item==currentTag.select)
    }
    return -1
  }),
  
})
 
 
watch(() => route.fullPath, () => {
  if(route.meta.isMenu==false) return
  const record = tagList.value.find(item => item.path==route.path)
  if(record){
    currentTag.select = record
    return 
  }
  
  if(route.meta.title){
    const temp = { ...route }
    tagList.value.push(temp)
    currentTag.select=temp
  }
}, { immediate: true })
const {  elementX  } = useMouseInElement(tagsRef)
const { width: elementWidth }=useElementSize(tagsRef)
 
const selectTag=(item ) => {
   
  router.push(item)
  if(elementX.value/elementWidth.value>0.85){
    moveRight()
    return 
  }
  if(elementX.value/elementWidth.value<0.15){
    moveLeft()
  }
}
const removeTag = (delItem) => {
  if(currentTag.isOnlyOne) return MessagePlugin.warning('须保留一个模块')
  if(delItem==currentTag.select){
    if(currentTag.isSelectLast){
      router.push(tagList.value[currentTag.index-1])
    }else{
      const index = currentTag.index
      nextTick(() => {
        router.push(tagList.value[index])
      })
    }
  }
 
  tagList.value = tagList.value.filter(item => item!=delItem)
 
}
const removeOtherTag = () => {
  tagList.value = tagList.value.filter(item => item==currentTag.select)
}
const removeLeftTag = () => {
  tagList.value = tagList.value.slice(currentTag.index)

}
const removeRightTag = () => {
  tagList.value = tagList.value.slice(0, currentTag.index+1)

}
const isShowLeftArrow = ref(false)
const isShowRightArrow = ref(false)


const { x  } = useScroll(tagsRef, {
  behavior: 'smooth',
})
 
watchPostEffect(() => {
  if(!tagsRef.value||tagList.value.length==0) return
  if(tagsRef.value.scrollWidth!=elementWidth.value){
    isShowLeftArrow.value=!!x.value
    isShowRightArrow.value = x.value!=(tagsRef.value.scrollWidth-elementWidth.value)
  }else{
    isShowLeftArrow.value=false
    isShowRightArrow.value=false
  }
})
 

const DIRECTION = {  LEFT: 'left', RIGHT: 'right' }
const move = (direction) => {
  const len = 200
  const step = direction==DIRECTION.RIGHT?len:-len
  x.value+=step
}
const moveLeft = () => move(DIRECTION.LEFT)
const moveRight = () => move(DIRECTION.RIGHT)
useEventListener(tagsRef, 'wheel', (e) => {
  e.deltaY<0?moveRight():moveLeft()
})
</script>
<style scoped>
</style>