<template>
	<div ref="root" class="flex  gap-2 overflow-hidden">
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
				<t-button>
					刷新
				</t-button>
				<t-button>
					关闭当前
				</t-button>
				<t-button>
					关闭其他
				</t-button>
				<t-button>
					关闭左侧
				</t-button>
				<t-button>
					关闭右侧
				</t-button>
			</template>
		</t-dropdown>
	</div>
</template>

<script setup>
import { useScroll, useEventListener, useMouseInElement, useElementSize, useMutationObserver } from '@vueuse/core'
import { computed, nextTick, reactive, watch, watchEffect  } from 'vue'
const tagsRef=ref()
const root = ref()
const route = useRoute()

const tagList = ref([])
watchEffect(() => {
  const record= tagList.value.find(item => item.path==route.path)
  if(record){
    currentTag.select = record
    return 
  }
  if(route.meta.title){
    tagList.value.push({ ...route })
  }
})

const currentTag = reactive({
  select: null,
  isSelectLast: computed(() => tagList.value.at(-1)==currentTag.select), 
  isOnlyOne: computed(() => tagList.value.length==1),
})
currentTag.select = tagList.value.at(0)
const {  elementX  } = useMouseInElement(tagsRef)
const { width: elementWidth }=useElementSize(tagsRef)
 
const selectTag=(item ) => {
   
  currentTag.select=item
  if(elementX.value/elementWidth.value>0.85){
    moveRight()
    return 
  }
  if(elementX.value/elementWidth.value<0.15){
    moveLeft()
  }
}
const removeTag = (ite) => {
  if(currentTag.isSelectLast){
    nextTick(() => {
      currentTag.select =tagList.value.at(-1)
    })
  }
  tagList.value= tagList.value.filter(item => item!=ite)
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